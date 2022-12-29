import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import axios from 'axios';
import { CountryAPI, Country } from '../types/types';
import { parseCountryAPI } from '../utils/parseCountryAPI';

type CountriesProviderProps = {
    children: ReactNode;
};

type UpdateFilter = (key: 'name' | 'region', value: string) => void;

type CountriesContext = {
    loading: boolean;
    countries: Country[];
    error: boolean;
    getCountryByCode: (cca3: string) => Country | undefined;
    updateFilter: UpdateFilter;
};

type Filter = {
    name?: string;
    region?: string;
};

const CountriesContext = createContext({} as CountriesContext);

export function useCountries() {
    return useContext(CountriesContext);
}

export function CountriesProvider({ children }: CountriesProviderProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState<Filter>({});

    const getCountryByCode = (cca3: string) => {
        return countries.find(country => country.cca3 === cca3);
    };

    const updateFilter: UpdateFilter = (key, value) => {
        setFilter(prev => {
            return { ...prev, [key]: value };
        });
    };

    const refreshFilteredCountries = () => {
        setFilteredCountries(
            countries.filter(country => {
                return (
                    country.name.includes(filter.name || '') &&
                    !(filter.region && country.region !== filter.region)
                );
            })
        );
    };

    useEffect(refreshFilteredCountries, [
        countries,
        filter.name,
        filter.region,
    ]);

    useEffect(() => {
        axios
            .get<CountryAPI[]>('https://restcountries.com/v3.1/all')
            .then(({ data }) => setCountries(parseCountryAPI(data)))
            .catch(e => {
                console.error(e);
                setError(true);
            });
    }, []);

    useEffect(() => {
        if (error || countries.length > 0) setLoading(false);
    }, [error, countries]);

    return (
        <CountriesContext.Provider
            value={{
                countries: filteredCountries,
                loading,
                error,
                getCountryByCode,
                updateFilter,
            }}
        >
            {children}
        </CountriesContext.Provider>
    );
}
