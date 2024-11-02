import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function StarshipDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [starship, setStarship] = useState<any>(null);
    const [films, setFilms] = useState<any[]>([]);
    const [pilots, setPilots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: starship,
    });

    useEffect(() => {
        const fetchStarship = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
                const data = await response.json();
                setStarship(data);
                reset(data);

                if (data.films.length > 0) fetchFilms(data.films);
                if (data.pilots.length > 0) fetchPilots(data.pilots);

            } catch (error) {
                console.error("Failed to fetch starship details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStarship();
    }, [id, reset]);

    const fetchFilms = async (urls: string[]) => {
        try {
            const filmPromises = urls.map(url => fetch(url).then(res => res.json()));
            const filmsData = await Promise.all(filmPromises);
            setFilms(filmsData);
        } catch (error) {
            console.error("Failed to fetch films", error);
        }
    };

    const fetchPilots = async (urls: string[]) => {
        try {
            const pilotPromises = urls.map(url => fetch(url).then(res => res.json()));
            const pilotsData = await Promise.all(pilotPromises);
            setPilots(pilotsData);
        } catch (error) {
            console.error("Failed to fetch pilots", error);
        }
    };

    const getIdFromUrl = (url: string) => url.split('/').filter(Boolean).pop();

    const onSubmit = (data: any) => {
        setStarship(data);
        setIsEditing(false);
    };

    const formatData = (data: any) => data === "unknown" || data === "n/a" ? "N/A" : data;

    return (
        <div>
            <div className='character-main'>
                <Navbar />
                {loading ? (
                    <p>Loading...</p>
                ) : starship ? (
                    <div className='character-details'>
                        <h2>{starship['name']}</h2>
                        <div className='character-details-m'>
                            <div className='character-details-col ch-col-2'>
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', margin: 0, paddingBottom: '10px', paddingTop: '10px'}}>Manufacturer: {starship.manufacturer || "N/A"}</h3>
                                <div className='ch-dt-films'>
                                    <h3>Films:</h3>
                                    <ul className='ch-ul'>
                                        {films.map(film => (
                                            <li key={film.url}>
                                                Episode {film.episode_id}: <br />{film.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', margin: 0, paddingBottom: '10px', paddingTop: '10px'}}>Cost: {starship.cost_in_credits || "N/A"} credits</h3>

                                <h3>Pilots:</h3>
                                <ul className='ch-ul'>
                                    {pilots.length > 0 ? pilots.map(pilot => (
                                        <li key={pilot.url} onClick={() => navigate(`/characters/${getIdFromUrl(pilot.url)}`)}>
                                            <span style={{ cursor: 'pointer', color: '#66ffd1' }}>{pilot.name}</span>
                                        </li>
                                    )) : "N/A"}
                                </ul>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='ch-info'>
                                    <p>Length: <input {...register('length')} /></p>
                                    <p>Max Speed: <input {...register('max_atmosphering_speed')} /></p>
                                    <p>Crew: <input {...register('crew')} /></p>
                                    <p>Passengers: <input {...register('passengers')} /></p>
                                    <p>Cargo Capacity: <input {...register('cargo_capacity')} /></p>
                                </div>
                                <div className='edit-btns'>
                                    <button type="submit" style={{background: '#008c02'}}>Save</button>
                                    <button type="button" style={{background: '#ad0000'}} onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className='ch-info'>
                                    <p>Length:<br /><span>{formatData(starship['length']) + ' m'}</span></p>
                                    <p>Max Speed:<br /><span>{formatData(starship['max_atmosphering_speed']) + ' km/h'}</span></p>
                                    <p>Crew:<br /><span>{formatData(starship['crew']) + ' members'}</span></p>
                                    <p>Passengers:<br /><span>{formatData(starship['passengers']) + ' people'}</span></p>
                                    <p>Cargo Capacity:<br /><span>{formatData(starship['cargo_capacity']) + ' kg'}</span></p>
                                </div>
                                <button style={{background: '#007069', marginTop: '20px', marginBottom: '20px'}} onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                        <button><Link to="/planets" style={{color: 'white'}}>Back</Link></button>
                    </div>
                ) : (
                    <p>Starship not found</p>
                )}
            </div>
        </div>
    );
}
