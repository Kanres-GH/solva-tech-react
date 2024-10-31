import Auth from './components/Auth'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'

export default function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/characters" element/>
                    <Route path="/characters/:id" element/>
                    <Route path="/planets" element/>
                    <Route path="/planets/:id" element/>
                    <Route path="/starships" element/>
                    <Route path="/starships/:id" element/>
                </Routes>
            </Router>
        </div>
    )
}


