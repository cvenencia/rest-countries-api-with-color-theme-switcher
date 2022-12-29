import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Country } from './pages/Country';
import { CountriesProvider } from './contexts/CountriesContext';
import { Error } from './pages/Error';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {
    return (
        <ThemeProvider>
            <CountriesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path='/country/:cca3' element={<Country />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </BrowserRouter>
            </CountriesProvider>
        </ThemeProvider>
    );
}
