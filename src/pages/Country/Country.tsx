import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCountries } from '../../contexts/CountriesContext';
import { TailSpin } from 'react-loader-spinner';
import st from './Country.module.scss';
import { ListItem } from '../../components/ListItem';

export function Country() {
    const { getCountryByCode, loading } = useCountries();
    const { cca3 } = useParams();
    const navigate = useNavigate();
    const country = cca3 && getCountryByCode(cca3);
    return (
        <main>
            <Link
                to='..'
                onClick={e => {
                    e.preventDefault();
                    navigate(-1);
                }}
                className={`${st.backBtn} box-shadow hover-scale`}
            >
                Back
            </Link>
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
            {!loading && !country && <h2>Country does not exist.</h2>}
            {country && (
                <div className={st.container}>
                    <div className={st.imageWrapper}>
                        <img
                            src={country.flagSVG}
                            alt={`Flag image of ${country.name}`}
                        />
                    </div>
                    <div className={st.infoContainer}>
                        <div>
                            <h2>{country.name}</h2>
                            <ul className={st.list}>
                                {country.nativeNames && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Native Name'
                                    >
                                        {country.nativeNames.join(', ')}
                                    </ListItem>
                                )}
                                {country.population && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Population'
                                    >
                                        {country.population}
                                    </ListItem>
                                )}
                                <ListItem
                                    className={st.listItem}
                                    title='Region'
                                >
                                    {country.region}
                                </ListItem>
                                {country.subregion && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Sub Region'
                                    >
                                        {country.subregion}
                                    </ListItem>
                                )}
                                {country.capitals && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Capital'
                                    >
                                        {country.capitals.join(', ')}
                                    </ListItem>
                                )}
                                {country.tld && (
                                    <ListItem
                                        className={st.listItem}
                                        title='tld'
                                    >
                                        {country.tld.join(', ')}
                                    </ListItem>
                                )}
                                {country.currencies && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Currency'
                                    >
                                        {country.currencies.join(', ')}
                                    </ListItem>
                                )}
                                {country.languages && (
                                    <ListItem
                                        className={st.listItem}
                                        title='Languages'
                                    >
                                        {country.languages.join(', ')}
                                    </ListItem>
                                )}
                            </ul>
                        </div>
                        {country.borderCountries && (
                            <div className={st.borderCountries}>
                                <span className='bold'>Border countries: </span>
                                <span className={st.linksContainer}>
                                    {country.borderCountries.map(
                                        (cca3, index) => {
                                            const country =
                                                getCountryByCode(cca3);

                                            return (
                                                <Link
                                                    className={`${st.linkCountry} hover-scale box-shadow`}
                                                    to={`/country/${cca3}`}
                                                    key={index}
                                                >
                                                    {country?.name}
                                                </Link>
                                            );
                                        }
                                    )}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
