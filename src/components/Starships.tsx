import '../../static/css/characters.css';
import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Starships() {
    const [starships, setStarships] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStarships(page);
    }, [page]);

    const fetchStarships = async (pageNumber: any) => {
        setLoading(true);
        try {
            const response = await fetch(`https://swapi.dev/api/starships/?page=${pageNumber}`);
            const data = await response.json();
            setStarships(data.results || []);
        } catch (error) {
            console.error("Failed to fetch starships", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStarshipClick = (starship: any) => {
        const starshipId = starship.url.split("/").filter(Boolean).pop();
        navigate(`/starships/${starshipId}`, { state: { starship } });
    };

    const formatData = (data : any) => data === "unknown" ? "N/A" : data;

    return (
        <div>
            <div className="character-main">
                <Navbar />
                <div className="character-table">
                    <h2>Starships</h2>
                    {loading ? <p className='loading'>Loading...</p> : (
                        <>
                            <h3>Current page: {page}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Manufacturer</th>
                                        <th>Length, m</th>
                                        <th>Cost in credits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {starships.map((starship) => (
                                        <tr key={starship.name} onClick={() => handleStarshipClick(starship)}>
                                            <td>{formatData(starship.name)}</td>
                                            <td>{formatData(starship.manufacturer)}</td>
                                            <td>{formatData(starship.length)}</td>
                                            <td>{formatData(starship.cost_in_credits)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
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