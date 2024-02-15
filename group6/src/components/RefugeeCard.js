import React from "react";
import Link from 'next/link';

export default function RefugeeCard({ refugee_data }) {
    
    return (
        <div className="flex flex-col rounded-2xl h-full"> {/* Use flex column layout and ensure full height */}
            <div className="flex-grow"> {/* Content grows to take available space */}
                <div className="flex justify-center bg-black">
                    <img src={refugee_data.image} className="h-[200px] object-cover w-full"/> {/* Ensure image covers the width */}
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold">{refugee_data.topic}</h1>
                        <div className="flex justify-between">
                            <p className="text-sm font-semibold">{`Name: ${refugee_data.name}`}</p>
                            <p className="text-sm">{refugee_data.date}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis flex-grow"> {/* Add flex-grow to push the button down */}
                    <p className="line-clamp-2 text-sm">{refugee_data.caption}</p> {/* This will apply ellipsis after 2 lines */}
                </div>
            </div>
            <div className="flex justify-center p-2"> {/* Button at the bottom */}
                <Link href={`/refugee-testimonials/${refugee_data.id}`} key={refugee_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg">Read More</button>
                </Link>
            </div>
        </div>
    );
}
