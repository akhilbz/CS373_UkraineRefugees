import React from "react";
import Link from 'next/link';

export default function AsylumCountriesCard({ country_data }) {
    // Assuming we have an endpoint to fetch country details
    const countryDetailsEndpoint = `/asylum-countries/${country_data.id}`;

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden shadow-lg"> {/* Added shadow for depth */}
            <div className="flex-grow"> {/* Content grows to take available space */}
                <div className="flex justify-center bg-black">
                    {/* Assuming the flag is an image URL */}
                    <img src={country_data.flag} alt={`Flag of ${country_data.name}`} className="h-[200px] w-full object-cover" />
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold text-lg text-center">{country_data.name}</h1> {/* Name of the country as title */}
                        <p className="text-sm text-center">{`Capital: ${country_data.capital}`}</p> {/* Capital */}
                    </div>
                </div>
                <div className="m-2"> {/* Content for additional info */}
                    <p className="text-xs"><span className="font-semibold">Region: </span>{country_data.region}</p>
                    <p className="text-xs"><span className="font-semibold">Population: </span>{country_data.population ? country_data.population.toLocaleString() : 'N/A'}</p>
                    <p className="text-xs"><span className="font-semibold">Languages: </span>{country_data.languages}</p>
                </div>
            </div>
            <div className="flex justify-center p-2"> {/* Button at the bottom */}
                <Link href={countryDetailsEndpoint} passHref>
                    <button className="h-[25px] w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View More</button>
                </Link>
            </div>
        </div>
    );
}
