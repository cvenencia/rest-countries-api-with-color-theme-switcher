import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Country } from './pages/Country';
import { CountriesProvider } from './contexts/CountriesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';

export function App() {
    return (
        <ThemeProvider>
            <CountriesProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='/country/:cca3' element={<Country />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </BrowserRouter>
            </CountriesProvider>
        </ThemeProvider>
    );
}
