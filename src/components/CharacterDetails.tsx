import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: character,
    });

    useEffect(() => {
        const fetchCharacter = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/people/${id}/`);
                const data = await response.json();
                setCharacter(data);
                reset(data);

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
    }, [id, reset]);

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

    const onSubmit = (data: any) => {
        setCharacter(data);
        setIsEditing(false);
    };

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
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', paddingBottom: '10px'}}>Homeworld: {homeworld ? (
                                    <span onClick={() => navigate(`/planets/${getIdFromUrl(homeworld.url)}`)} style={{ cursor: 'pointer', color: '#66ffd1' }}>
                                        {homeworld.name}
                                    </span>
                                ) : "N/A"}</h3>
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
                                <h3 style={{borderBottom: '3px solid rgb(138, 109, 109)', paddingBottom: '10px'}}>Species: {species || "Human"}</h3>

                                <h3>Starships:</h3>
                                <ul className='ch-ul'>
                                    {starships.length > 0 ? starships.map(starship => (
                                        <li style={{ cursor: 'pointer' }} key={starship.url} onClick={() => navigate(`/starships/${getIdFromUrl(starship.url)}`)}>
                                            <span>{starship.name}</span>
                                        </li>
                                    )) : "N/A"}
                                </ul>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='ch-info'>
                                    <p>Height: <input {...register('height')} /></p>
                                    <p>Mass: <input {...register('mass')} /></p>
                                    <p>Hair Color: <input {...register('hair_color')} /></p>
                                    <p>Skin Color: <input {...register('skin_color')} /></p>
                                    <p>Eye Color: <input {...register('eye_color')} /></p>
                                    <p>Birth Year: <input {...register('birth_year')} /></p>
                                    <p>Gender: <input {...register('gender')} /></p>
                                </div>
                                <div className='edit-btns'>
                                    <button type="submit" style={{background: '#008c02'}}>Save</button>
                                    <button type="button" style={{background: '#ad0000'}} onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                                
                            </form>
                        ) : (
                            <>
                                <div className='ch-info'>
                                    <p>Height:<br /><span>{formatData(character['height']) + ' cm'}</span></p>
                                    <p>Mass:<br /><span>{formatData(character['mass']) + ' kg'}</span></p>
                                    <p>Hair Color:<br /><span>{capitalize(formatData(character['hair_color']))}</span></p>
                                    <p>Skin Color:<br /><span>{capitalize(formatData(character['skin_color']))}</span></p>
                                    <p>Eye Color:<br /><span>{capitalize(formatData(character['eye_color']))}</span></p>
                                    <p>Birth Year:<br /><span>{formatData(character['birth_year'])}</span></p>
                                    <p>Gender:<br /><span>{capitalize(formatData(character['gender']))}</span></p>
                                </div>
                                <button style={{background: '#007069', marginTop: '20px', marginBottom: '20px'}} onClick={() => setIsEditing(true)}>Edit</button>
                            </>
                        )}
                        <button><Link to="/characters" style={{ color: 'white' }}>Back</Link></button>
                    </div>
                ) : (
                    <p>Character not found</p>
                )}
            </div>
        </div>
    );
}
