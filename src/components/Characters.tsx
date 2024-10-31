import '../../static/css/characters.css';
import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Characters() {
    const [characters, setCharacters] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    const fetchCharacters = async (pageNumber: any) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api/people/?page=${pageNumber}`);
            const data = await response.json();
            setCharacters(data.results || []);
        } catch (error) {
            console.error("Failed to fetch characters", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCharacterClick = (character: any) => {
        const characterId = character.url.split("/").filter(Boolean).pop();
        navigate(`/character/${characterId}`, { state: { character } });
    };

    return (
        <div>
            <div className="character-main">
                <Navbar />
                <div className="character-table">
                    <h2>Characters</h2>
                    {loading ? <p style={{fontSize: '5vw'}}>Loading...</p> : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Height, cm</th>
                                    <th>Mass, kg</th>
                                    <th>Birth Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {characters.map((character) => (
                                    <tr key={character.name} onClick={() => handleCharacterClick(character)}>
                                        <td>{character.name}</td>
                                        <td>{character.height}</td>
                                        <td>{character.mass}</td>
                                        <td>{character.birth_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="pagination-buttons">
                        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>Back</button>
                        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}