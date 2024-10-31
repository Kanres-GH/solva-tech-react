import '../../static/css/characters.css';
import Navbar from "./Navbar";
import { Table } from 'react-bootstrap';

export default function Characters() {
    return (
        <div>
            <div className="character-main">
                <Navbar />
                <div className="character-table">
                    <h2 style={{fontSize: '2em'}}>Characters</h2>
                    <Table>
                        
                    </Table>
                </div>
            </div>
        </div>
    );
}