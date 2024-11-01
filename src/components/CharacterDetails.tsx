import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function capitalize(val: any) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function CharacterDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState<any>(null);
    const [homeworld, setHomeworld] = useState<{ url: string; name: string } | null>(null);
    const [films, setFilms] = useState<any[]>([]);
    const [species, setSpecies] = useState<string | null>(null);
    const [starships, setStarships] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                const data = await response.json();
                setCharacter(data);

                if (data.homeworld) fetchHomeworld(data.homeworld);
                if (data.films.length > 0) fetchFilms(data.films);
                if (data.species.length > 0) fetchSpecies(data.species[0]);
                if (data.starships.length > 0) fetchStarships(data.starships);

            } catch (error) {
                console.error("Failed to fetch character details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [id]);

    const fetchHomeworld = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setHomeworld(data);
        } catch (error) {
            console.error("Failed to fetch homeworld", error);
        }
    };

    const fetchFilms = async (urls: string[]) => {
        try {
            const filmPromises = urls.map(url => fetch(url).then(res => res.json()));
            const filmsData = await Promise.all(filmPromises);
            setFilms(filmsData);
        } catch (error) {
            console.error("Failed to fetch films", error);
        }
    };

    const fetchSpecies = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setSpecies(data.name);
        } catch (error) {
            console.error("Failed to fetch species", error);
        }
    };

    const fetchStarships = async (urls: string[]) => {
        try {
            const starshipPromises = urls.map(url => fetch(url).then(res => res.json()));
            const starshipsData = await Promise.all(starshipPromises);
            setStarships(starshipsData);
        } catch (error) {
            console.error("Failed to fetch starships", error);
        }
    };

    const formatData = (data: any) => data === "unknown" || data === "n/a" ? "N/A" : data;

    const getIdFromUrl = (url: string) => url.split('/').filter(Boolean).pop();

    return (
        <div>
            <div className='character-main'>
                <Navbar />
                {loading ? (
                    <p>Loading...</p>
                ) : character ? (
                    <div className='character-details'>
                        <h2>{character['name']}</h2>
                        <div className='character-details-m'>
                            <div className='character-details-col ch-col-2'>
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', margin: 0, paddingBottom: '10px', paddingTop: '10px'}}>Homeworld: {homeworld ? (
                                    <span onClick={() => navigate(`/planets/${getIdFromUrl(homeworld.url)}`)} style={{ cursor: 'pointer', color: '#66ffd1' }}>
                                        {homeworld.name}
                                    </span>
                                ) : "N/A"}</h3>
                                <div className='ch-dt-films'>
                                    <h3 style={{marginBottom: 0}}>Films:</h3>
                                    <ul className='ch-ul'>
                                        {films.map(film => (
                                            <li key={film.url}>
                                                Episode {film.episode_id}: <br />{film.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', paddingBottom: '10px'}}>Species: {species || "Human"}</h3>

                                <h3 style={{margin: 0}}>Starships:</h3>
                                <ul className='ch-ul'>
                                    {starships.length > 0 ? starships.map(starship => (
                                        <li key={starship.url}>
                                            <span onClick={() => navigate(`/starships/${getIdFromUrl(starship.url)}`)} style={{cursor: 'pointer'}}>
                                               {starship.name}
                                            </span>
                                        </li>
                                    )) : "N/A"}
                                </ul>
                            </div>
                        </div>
                        <div className='ch-info'>
                            <p>Height:<br /><span>{formatData(character['height']) + ' cm'}</span></p>
                            <p>Mass:<br /><span>{formatData(character['mass']) + ' kg'}</span></p>
                            <p>Hair Color:<br /><span>{capitalize(formatData(character['hair_color']))}</span></p>
                            <p>Skin Color:<br /><span>{capitalize(formatData(character['skin_color']))}</span></p>
                            <p>Eye Color:<br /><span>{capitalize(formatData(character['eye_color']))}</span></p>
                            <p>Birth Year:<br /><span>{formatData(character['birth_year'])}</span></p>
                            <p>Gender:<br /><span>{capitalize(formatData(character['gender']))}</span></p>
                        </div>
                        <button><Link to="/characters" style={{color: 'white'}}>Back</Link></button>
                    </div>
                ) : (
                    <p>Character not found</p>
                )}
            </div>
        </div>
    );
}
