import { Link } from 'react-router-dom';
import { useCountries } from '../../contexts/CountriesContext';
import { useTheme } from '../../contexts/ThemeContext';

export function Home() {
    const { loading, countries } = useCountries();
    const { toggleTheme } = useTheme();

    return (
        <div>
            <button onClick={toggleTheme}>Switch theme</button>
            {loading && 'loading'}
            {!loading &&
                countries.map((e, i) => {
                    return (
                        <div key={i} style={{ marginBlock: '1em' }}>
                            <Link to={`country/${e.cca3}`}>{e.name}</Link>
                        </div>
                    );
                })}
        </div>
    );
}
