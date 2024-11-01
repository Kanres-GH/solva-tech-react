import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';

function capitalize(val : any) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export default function CharacterDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [homeworld, setHomeworld] = useState<string | null>(null);
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
            } catch (error) {
                console.error("Failed to fetch character details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    const formatData = (data : any) => data === "unknown" || data === "n/a" ? "N/A" : data;

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
                        <div className='character-details-col'>
                            <p>Height: {formatData(character['height'])}</p>
                            <p>Mass: {formatData(character['mass'])}</p>
                            <p>Hair Color: {capitalize(formatData(character['hair_color']))}</p>
                            <p>Skin Color: {capitalize(formatData(character['skin_color']))}</p>
                            <p>Eye Color: {capitalize(formatData(character['eye_color']))}</p>
                            <p>Birth Year: {formatData(character['birth_year'])}</p>
                            <p>Gender: {capitalize(formatData(character['gender']))}</p>
                        </div>
                        <div className='character-details-col'>
                            <p>Homeworld: </p>
                            <p>Films: </p>
                            <p>Species: </p>
                            <p>Starships: </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Character not found</p>
            )}
            </div>
        </div>
    );
}