import '../../static/css/navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return(
        <div className="nav-main">
            <ul>
                <li><Link to="/characters" style={{color: "white", fontWeight: 800}}>Characters</Link></li>
                <li><Link to="/starships" style={{color: "white", fontWeight: 800}}>Starships</Link></li>
                <li><Link to="/planets" style={{color: "white", fontWeight: 800}}>Planets</Link></li>
            </ul>
            <ul>
                <li>Logout</li>
            </ul>
        </div>
    );
}