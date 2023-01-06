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

const MAX_COUNTRIES_PER_PAGE = 20;

type CountriesProviderProps = {
    children: ReactNode;
};

type CountriesContext = {
    loading: boolean;
    countries: Country[];
    error: boolean;
    getCountryByCode: (cca3: string) => Country | undefined;
    updateFilter: UpdateFilter;
    currentPage: number;
    updatePage: (page: number) => void;
    lastPage: number;
};

type FilterValue = string | undefined;

type Filter = {
    name?: FilterValue;
    region?: FilterValue;
};

type UpdateFilter = (key: 'name' | 'region', value: FilterValue) => void;

const CountriesContext = createContext({} as CountriesContext);

export function useCountries() {
    return useContext(CountriesContext);
}

export function CountriesProvider({ children }: CountriesProviderProps) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filter, setFilter] = useState<Filter>({});
    const startingIndex = MAX_COUNTRIES_PER_PAGE * currentPage;
    const lastPage = Math.ceil(
        filteredCountries.length / MAX_COUNTRIES_PER_PAGE
    );

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
                    country.name
                        .toUpperCase()
                        .includes(filter.name?.toUpperCase() || '') &&
                    !(filter.region && country.region !== filter.region)
                );
            })
        );
    };

    const updatePage = (page: number) => {
        const length = filteredCountries.length;
        const lastPage = Math.floor(length / MAX_COUNTRIES_PER_PAGE);

        if (page < 0 || page > lastPage) return;

        setCurrentPage(page);
    };

    useEffect(refreshFilteredCountries, [
        countries,
        filter.name,
        filter.region,
        currentPage,
    ]);

    useEffect(() => {
        setCurrentPage(0);
    }, [filter]);

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
                countries: filteredCountries.slice(
                    startingIndex,
                    startingIndex + MAX_COUNTRIES_PER_PAGE
                ),
                loading,
                error,
                getCountryByCode,
                updateFilter,
                currentPage,
                updatePage,
                lastPage,
            }}
        >
            {children}
        </CountriesContext.Provider>
    );
}
