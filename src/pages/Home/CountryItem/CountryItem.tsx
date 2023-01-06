import { Link } from 'react-router-dom';
import { ListItem } from '../../../components/ListItem';
import { Country } from '../../../types/types';
import st from './CountryItem.module.scss';

type CountryItemProps = {
    country: Country;
};

export function CountryItem({ country }: CountryItemProps) {
    return (
        <Link
            className={`${st.container} hover-scale box-shadow`}
            to={`country/${country.cca3}`}
        >
            <div className={st.imageWrapper}>
                <img
                    src={country.flagSVG}
                    alt={`Flag image of ${country.name}`}
                />
            </div>
            <div className={st.infoContainer}>
                <h2>{country.name}</h2>
                <ul>
                    {country.population && (
                        <ListItem title='Population'>
                            {country.population}
                        </ListItem>
                    )}
                    {<ListItem title='Region'>{country.region}</ListItem>}
                    {country.capitals && (
                        <ListItem title='Capital'>
                            {country.capitals[0]}
                        </ListItem>
                    )}
                </ul>
            </div>
        </Link>
    );
}
