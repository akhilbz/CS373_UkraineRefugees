import React from "react";
import Link from 'next/link';

export default function AsylumCountriesCard({ country_data }) {
    const countryDetailsEndpoint = `/asylum-countries/${country_data.id}`;

    return (
        <div className="flex flex-col  h-full shadow-lg" style={{ overflow: 'hidden'}}>
            <img src={country_data.flag} alt={`Flag of ${country_data.name}`} className="h-[200px] w-full object-cover" />
            <div className="p-2 text-center">
                <h1 className="font-semibold text-lg">{country_data.name}</h1>
                <p className="text-sm">{`Capital: ${country_data.capital}`}</p>
                <p className="text-xs"><span className="font-semibold">Region: </span>{country_data.region}</p>
                <p className="text-xs"><span className="font-semibold">Population: </span>{country_data.population}</p>
                <p className="text-xs"><span className="font-semibold">Languages: </span>{country_data.languages}</p>
            </div>
            <div style={{ marginTop: 55, padding: 0 }} className="flex h-[60px] justify-center "> {/* This div pushes the button to the bottom and removes any top margin */}
                <Link href={countryDetailsEndpoint} passHref>
                    <button className="h-[35px] w-[100px] bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md ">View More</button>
                </Link>
            </div>
        </div>
    );
}
