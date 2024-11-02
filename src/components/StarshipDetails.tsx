import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';

export default function StarshipDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [starship, setStarship] = useState<any>(null);
    const [films, setFilms] = useState<any[]>([]);
    const [pilots, setPilots] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStarship = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
                const data = await response.json();
                setStarship(data);

                if (data.films.length > 0) fetchFilms(data.films);
                if (data.pilots.length > 0) fetchPilots(data.pilots);

            } catch (error) {
                console.error("Failed to fetch starship details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStarship();
    }, [id]);

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
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', margin: 0, paddingBottom: '10px', paddingTop: '10px'}}>Model: {starship.model || "N/A"}</h3>
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
                    </div>
                ) : (
                    <p>Starship not found</p>
                )}
            </div>
        </div>
    );
}
