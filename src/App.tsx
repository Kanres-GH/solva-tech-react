import Auth from './components/Auth'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css'
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import Characters from './components/Characters';
import AuthChecker from './components/AuthChecker';

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
                        </AuthChecker>}
                    />
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


