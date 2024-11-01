import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';

function capitalize(val : any) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export default function StarshipDetails() {
    const { id } = useParams();
    const [starship, setStarship] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStarships = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
                const data = await response.json();
                setStarship(data);
            } catch (error) {
                console.error("Failed to fetch starship details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStarships();
    }, [id]);

    const formatData = (data : any) => data === "unknown" ? "N/A" : data;

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
                        <p>Rotation Period: {formatData(starship['rotation_period']) + ' standard hours'}</p>
                        <p>Orbital Period: {formatData(starship['orbital_period']) + ' standard days'}</p>
                        <p>Diameter: {formatData(starship['diameter']) + ' km'}</p>
                        <p>Climate: {capitalize(formatData(starship['climate']))}</p>
                        <p>Gravity: {formatData(starship['gravity'])}</p>
                        <p>Terrain: {capitalize(formatData(starship['terrain']))}</p>
                        <p>Surface Water: {formatData(starship['surface_water']) + '%'}</p>
                        <p>Population: {formatData(starship['population'])}</p>
                    </div>
                </div>
            ) : (
                <p>starship not found</p>
            )}
            </div>
        </div>
    );
}