import { CountryAPI, Country } from '../types/types';

const { format } = new Intl.NumberFormat(undefined);

type KeyValue = {
    [key: string]: string;
};

type KeyValueNested = {
    [key: string]: {
        [key: string]: string;
    };
};

function objectToArray(
    object: KeyValue | KeyValueNested,
    customKey: string | undefined = undefined
): string[] {
    if (customKey === undefined) {
        const o = object as KeyValue;
        return Object.keys(o).map(key => o[key]);
    }
    const o = object as KeyValueNested;
    return Object.keys(o).map(key => o[key][customKey]);
}

export function parseCountryAPI(data: CountryAPI[]): Country[] {
    return data.map(c => {
        const cca3 = c.cca3;
        const name = c.name.common;
        const nativeNames = c.name.nativeName
            ? objectToArray(c.name.nativeName, 'common')
            : undefined;
        const population = format(c.population);
        const region = c.region;
        const subregion = c.subregion;
        const flagSVG = c.flags.svg;
        const capitals = c.capital;
        const tld = c.tld;
        const currencies = c.currencies
            ? objectToArray(c.currencies, 'name')
            : undefined;
        const languages = c.languages ? objectToArray(c.languages) : undefined;
        const borderCountries = c.borders;

        return {
            cca3,
            name,
            nativeNames,
            population,
            region,
            subregion,
            flagSVG,
            capitals,
            tld,
            currencies,
            languages,
            borderCountries,
        };
    });
}
