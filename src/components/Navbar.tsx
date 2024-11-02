import '../../static/css/navbar.css';
import { Link } from 'react-router-dom';
import { logout } from '../state/counter/loginSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };
    return(
        <div className="nav-main">
            <ul>
                <li><Link to="/characters" style={{color: "white", fontWeight: 800}}>Characters</Link></li>
                <li><Link to="/starships" style={{color: "white", fontWeight: 800}}>Starships</Link></li>
                <li><Link to="/planets" style={{color: "white", fontWeight: 800}}>Planets</Link></li>
            </ul>
            <ul>
            <li onClick={handleLogout} style={{ cursor: 'pointer', color: 'white', fontWeight: 800 }}>Logout</li>
            </ul>
        </div>
    );
}