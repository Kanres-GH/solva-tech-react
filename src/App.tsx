import Auth from './components/Auth'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import Characters from './components/Characters';
import AuthChecker from './components/AuthChecker';
import CharacterDetails from './components/CharacterDetails';
import Starships from './components/Starships';
import Planets from './components/Planets';

export default function App() {

    const isLoggedOn = useSelector((state: RootState) => state.login.isLoggedOn)

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={isLoggedOn ? <Navigate to="/characters" /> : <Auth />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/characters" element={
                        <AuthChecker>
                            <Characters />
                        </AuthChecker>
                    }
                    />
                    <Route path="/characters/:id" element={<AuthChecker><CharacterDetails /></AuthChecker>} />
                    <Route path="/planets" element={<AuthChecker><Planets /></AuthChecker>}/>
                    <Route path="/planets/:id" element={<AuthChecker></AuthChecker>}/>
                    <Route path="/starships" element={<AuthChecker><Starships /></AuthChecker>}/>
                    <Route path="/starships/:id" element={<AuthChecker></AuthChecker>}/>
                </Routes>
            </Router>
        </div>
    )
}


