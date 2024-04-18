import React from "react";
import Link from 'next/link';

export default function AsylumCountriesCard({ country_data }) {
    const countryDetailsEndpoint = `/asylum-countries/${country_data.id}`;

    const highlightSearchWord = (text, searchWord) => {
        if (!searchWord) {
            return { __html: text };
        }
        const regex = new RegExp(`(${searchWord})`, 'gi');
        const highlightedText = text.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`);
        return { __html: highlightedText };
    };

    return (
        <div className="flex flex-col rounded-b-2xl h-full shadow-lg" style={{ overflow: 'hidden'}}>
            {/* Image tag, assuming country_data.flag is a URL to the image */}
            <img src={country_data.flag} alt={`Flag of ${country_data.name}`} className="h-[200px] w-full object-cover" />
            <div className="p-2 text-center">
                {/* Name of the country */}
                <h1 className="font-semibold text-lg" dangerouslySetInnerHTML={highlightSearchWord(country_data.name, country_data.searchWord)} />
                {/* Capital of the country */}
                <p className="text-sm" dangerouslySetInnerHTML={highlightSearchWord(`Capital: ${country_data.capital}`, country_data.searchWord)} />
                {/* Other details */}
                {/* <p className="text-xs"><span className="font-semibold">Region: </span>{country_data.region}</p> */}
                <p className="text-xs" dangerouslySetInnerHTML={highlightSearchWord(`Region: ${country_data.region}`, country_data.searchWord)}></p>
                {/* <p className="text-xs"><span className="font-semibold">Population: </span>{country_data.population}</p> */}
                <p className="text-xs" dangerouslySetInnerHTML={highlightSearchWord(`Population: ${country_data.population}`, country_data.searchWord)}></p>
                {/* <p className="text-xs"><span className="font-semibold">Languages: </span>{country_data.languages}</p> */}
                <p className="text-xs" dangerouslySetInnerHTML={highlightSearchWord(`Languages: ${country_data.languages}`, country_data.searchWord)}></p>
            </div>
            {/* Button at the bottom */}
            <div className="mt-auto p-4">
                {/* Use the Link component without <a> */}
                <Link href={countryDetailsEndpoint}>
                    <button className="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                        View More
                    </button>
                </Link>
            </div>
        </div>
    );
}
