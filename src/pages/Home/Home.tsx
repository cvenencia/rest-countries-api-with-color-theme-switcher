import { Link } from 'react-router-dom';
import { useCountries } from '../../contexts/CountriesContext';
import { TailSpin } from 'react-loader-spinner';

export function Home() {
    const { loading, countries } = useCountries();

    return (
        <main>
            {loading && (
                <TailSpin
                    height='150'
                    width='150'
                    color='hsl(213, 96%, 18%)'
                    ariaLabel='tail-spin-loading'
                    radius='1'
                    wrapperStyle={{}}
                    wrapperClass='spinner'
                    visible={true}
                />
            )}
            {!loading &&
                countries.map((e, i) => {
                    return (
                        <div key={i} style={{ marginBlock: '1em' }}>
                            <Link to={`country/${e.cca3}`}>{e.name}</Link>
                        </div>
                    );
                })}
        </main>
    );
}
