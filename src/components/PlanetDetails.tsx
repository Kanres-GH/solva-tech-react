import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function capitalize(val: any) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

const getIdFromUrl = (url: string) => url.split('/').filter(Boolean).pop();

export default function PlanetDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [planet, setPlanet] = useState<any>(null);
    const [films, setFilms] = useState<any[]>([]);
    const [residents, setResidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: planet,
    });

    useEffect(() => {
        const fetchPlanet = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                const data = await response.json();
                setPlanet(data);
                reset(data);
                
                if (data.films.length > 0) fetchFilms(data.films);
                if (data.residents.length > 0) fetchResidents(data.residents);
            } catch (error) {
                console.error("Failed to fetch planet details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanet();
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

    const fetchResidents = async (urls: string[]) => {
        try {
            const residentPromises = urls.map(url => fetch(url).then(res => res.json()));
            const residentsData = await Promise.all(residentPromises);
            setResidents(residentsData);
        } catch (error) {
            console.error("Failed to fetch residents", error);
        }
    };

    const formatData = (data: any) => data === "unknown" || data === "n/a" ? "N/A" : data;

    const onSubmit = (data: any) => {
        setPlanet(data);
        setIsEditing(false);
    };

    return (
        <div>
            <div className='character-main'>
                <Navbar />
                {loading ? (
                    <p>Loading...</p>
                ) : planet ? (
                    <div className='character-details'>
                        <h2>{planet['name']}</h2>
                        <div className='character-details-m'>
                            <div className='character-details-col ch-col-2'>
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', margin: 0, paddingBottom: '10px', paddingTop: '10px'}}>Terrain: {formatData(planet.terrain)}</h3>
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
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', paddingBottom: '10px'}}>Population: {formatData(planet.population)}</h3>

                                <h3>Residents:</h3>
                                <ul className='ch-ul'>
                                    {residents.length > 0 ? residents.map(resident => (
                                        <li style={{cursor: 'pointer'}} key={resident.url} onClick={() => navigate(`/characters/${getIdFromUrl(resident.url)}`)}>
                                            <span>
                                                {resident.name}
                                            </span>
                                        </li>
                                    )) : "N/A"}
                                </ul>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='ch-info'>
                                    <p>Diameter: <input {...register('diameter')} /></p>
                                    <p>Rotation Period: <input {...register('rotation_period')} /></p>
                                    <p>Orbital Period: <input {...register('orbital_period')} /></p>
                                    <p>Climate: <input {...register('climate')} /></p>
                                    <p>Gravity: <input {...register('gravity')} /></p>
                                </div>
                                <div className='edit-btns'>
                                    <button type="submit" style={{background: '#008c02'}}>Save</button>
                                    <button type="button" style={{background: '#ad0000'}} onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className='ch-info'>
                                    <p>Diameter:<br /><span>{formatData(planet['diameter']) + ' km'}</span></p>
                                    <p>Rotation Period:<br /><span>{formatData(planet['rotation_period']) + ' hours'}</span></p>
                                    <p>Orbital Period:<br /><span>{formatData(planet['orbital_period']) + ' days'}</span></p>
                                    <p>Climate:<br /><span>{capitalize(formatData(planet['climate']))}</span></p>
                                    <p>Gravity:<br /><span>{capitalize(formatData(planet['gravity']))}</span></p>
                                </div>
                                <button style={{background: '#007069', marginTop: '20px', marginBottom: '20px'}} onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                        <button><Link to="/planets" style={{color: 'white'}}>Back</Link></button>
                    </div>
                ) : (
                    <p>Planet not found</p>
                )}
            </div>
        </div>
    );
}
