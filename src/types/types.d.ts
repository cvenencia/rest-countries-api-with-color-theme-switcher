export type Country = {
    cca3: string;
    name: string;
    nativeNames?: string[];
    population?: string;
    region: string;
    subregion?: string;
    flagSVG: string;
    capitals?: string[];
    tld?: string[];
    currencies?: string[];
    languages?: string[];
    borderCountries?: string[];
};

export type CountryAPI = {
    cca3: string;
    name: {
        common: string;
        nativeName?: {
            [key: string]: {
                common: string;
            };
        };
    };
    population: number;
    region: string;
    subregion?: string;
    flags: { svg: string };
    capital?: string[];
    tld?: string[];
    currencies?: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages?: {
        [key: string]: string;
    };
    borders?: string[];
};
