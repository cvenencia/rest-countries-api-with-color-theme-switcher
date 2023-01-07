import { useCountries } from '../../contexts/CountriesContext';
import { TailSpin } from 'react-loader-spinner';
import st from './Home.module.scss';
import { CountryItem } from './CountryItem';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { useTheme } from '../../contexts/ThemeContext';

export function Home() {
    const {
        loading,
        countries,
        currentPage,
        updatePage,
        lastPage,
        filter,
        updateFilter,
    } = useCountries();
    const { theme } = useTheme();

    const regionOptions = [
        { value: 'None', label: 'All regions', className: st.option },
        { value: 'Africa', label: 'Africa', className: st.option },
        { value: 'Americas', label: 'Americas', className: st.option },
        { value: 'Antarctic', label: 'Antarctic', className: st.option },
        { value: 'Asia', label: 'Asia', className: st.option },
        { value: 'Europe', label: 'Europe', className: st.option },
        { value: 'Oceania', label: 'Oceania', className: st.option },
    ];

    function handleChangeRegionFilter({ value }: Option) {
        if (value === 'None') return updateFilter('region', undefined);
        return updateFilter('region', value);
    }

    function handleChangeCountryFilter(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value === '') return updateFilter('name', undefined);
        updateFilter('name', e.target.value);
    }

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
            {!loading && (
                <>
                    <div className={st.filtersContainer}>
                        <div className={`${st.searchContainer} box-shadow`}>
                            <label htmlFor='search-input'>
                                <img
                                    src={`${window.location.origin}/icon/magnifying-glass-${theme}.svg`}
                                    alt=''
                                />
                            </label>
                            <input
                                id='search-input'
                                value={filter.name}
                                type='search'
                                placeholder='Search for a country...'
                                onChange={handleChangeCountryFilter}
                            />
                        </div>
                        <Dropdown
                            className={st.regionDropdown}
                            arrowClassName={st.arrow}
                            menuClassName={`${st.menu} box-shadow`}
                            placeholderClassName={st.placeholder}
                            controlClassName={`${st.control}`}
                            placeholder='Filter by Region'
                            onChange={handleChangeRegionFilter}
                            value={filter.region}
                            options={regionOptions}
                        />
                    </div>
                    <div className={st.countriesContainer}>
                        {countries.map((country, i) => (
                            <CountryItem key={i} country={country} />
                        ))}
                    </div>
                    {countries.length > 0 && (
                        <div className={st.pageSelectorContainer}>
                            <button
                                className='hover-scale'
                                onClick={() => updatePage(currentPage - 1)}
                            >
                                Go back
                            </button>
                            <select
                                onChange={e =>
                                    updatePage(Number.parseInt(e.target.value))
                                }
                                name='page'
                                id='pageSelector'
                                value={currentPage}
                            >
                                {[...Array(lastPage).keys()].map(
                                    (page, index) => (
                                        <option key={index} value={page}>
                                            {page + 1}
                                        </option>
                                    )
                                )}
                            </select>
                            <button
                                className='hover-scale'
                                onClick={() => updatePage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {countries.length === 0 && (
                        <h2>No countries were found.</h2>
                    )}
                </>
            )}
        </main>
    );
}
