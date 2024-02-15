import React from "react";
import Link from 'next/link';

export default function RefugeeCard({ refugee_data }) {
    // Function to truncate text if it exceeds a certain length
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden"> {}
            <div className="flex-grow"> {/* Content grows to take available space */}
                <div className="flex justify-center bg-black">
                    {/* Resize image to fit */}
                    <img src={refugee_data.image} className="h-[200px] w-full object-cover" />
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        {}
                        <h1 className="font-semibold">{truncateText(refugee_data.topic, 30)}</h1>
                        <div className="flex justify-between">
                            <p className="text-xs font-semibold">{`Name: ${refugee_data.name}`}</p>
                            <p className="text-xs">{refugee_data.date}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis flex-grow"> {}
                    {}
                    <p className="line-clamp-2 text-xs">{truncateText(refugee_data.caption, 150)}</p> {}
                </div>
                {/* New line for "Location" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Location: </span>{refugee_data.location}</p>
                </div>
                {/* New line for "Time Displaced" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Time Displaced: </span>{refugee_data.timeDisplaced}</p>
                </div>
            </div>
            <div className="flex justify-center p-2"> {/* Button at the bottom */}
                <Link href={`/refugee-testimonials/${refugee_data.id}`} key={refugee_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Read More</button>
                </Link>
            </div>
        </div>
    );
}
