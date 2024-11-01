import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../static/css/characters.css';
import Navbar from './Navbar';

function capitalize(val : any) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export default function PlanetDetails() {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                const data = await response.json();
                setPlanet(data);
            } catch (error) {
                console.error("Failed to fetch planet details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanets();
    }, [id]);

    const formatData = (data : any) => data === "unknown" ? "N/A" : data;

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
                        <p>Rotation Period: {formatData(planet['rotation_period']) + ' standard hours'}</p>
                        <p>Orbital Period: {formatData(planet['orbital_period']) + ' standard days'}</p>
                        <p>Diameter: {formatData(planet['diameter']) + ' km'}</p>
                        <p>Climate: {capitalize(formatData(planet['climate']))}</p>
                        <p>Gravity: {formatData(planet['gravity'])}</p>
                        <p>Terrain: {capitalize(formatData(planet['terrain']))}</p>
                        <p>Surface Water: {formatData(planet['surface_water']) + '%'}</p>
                        <p>Population: {formatData(planet['population'])}</p>
                    </div>
                </div>
            ) : (
                <p>Planet not found</p>
            )}
            </div>
        </div>
    );
}