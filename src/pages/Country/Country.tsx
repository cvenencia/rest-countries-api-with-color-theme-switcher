import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountries } from '../../contexts/CountriesContext';

export function Country() {
    const { getCountryByCode } = useCountries();
    const { cca3 } = useParams();
    const country = cca3 && getCountryByCode(cca3);
    return (
        <div>
            <Link to='..'>Back</Link>
            {country && (
                <ol>
                    <li>
                        <img
                            style={{ width: '200px' }}
                            src={country.flagSVG}
                            alt=''
                        />
                    </li>
                    <li>{country.name}</li>
                    <li>{country.nativeNames?.join(', ')}</li>
                    <li>{country.population}</li>
                    <li>{country.region}</li>
                    <li>{country.subregion}</li>
                    <li>{country.capitals?.join(', ')}</li>
                    <li>{country.tld?.join(', ')}</li>
                    <li>{country.currencies?.join(', ')}</li>
                    <li>{country.languages?.join(', ')}</li>
                    <li>
                        {country.borderCountries?.map((c, i) => (
                            <React.Fragment key={i}>
                                <Link to={`/country/${c}`}>
                                    {getCountryByCode(c)?.name}
                                </Link>{' '}
                            </React.Fragment>
                        ))}
                    </li>
                </ol>
            )}
        </div>
    );
}
