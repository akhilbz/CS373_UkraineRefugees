import React from "react";
import Link from 'next/link';

export default function MediaCard({ media_data }) {
    // Function to truncate text if it exceeds a certain length
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden"> {/* Ensure full height and column layout with overflow hidden */}
            <div className="flex-grow"> {/* Flex-grow to fill space */}
                <div className="flex justify-center bg-black">
                    {/* Resize image to fit */}
                    <img src={media_data.image} className="h-[200px] w-full object-cover" />
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        {/* Truncate title if it exceeds a certain length */}
                        <h1 className="font-semibold">{truncateText(media_data.title, 30)}</h1>
                        <div className="flex justify-between">
                            <p className="text-xs">{media_data.source}</p>
                            <p className="text-xs">{media_data.date}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content area */}
                    {/* Truncate caption if it exceeds a certain length */}
                    <p className="line-clamp-2 text-sm">{truncateText(media_data.caption, 150)}</p>
                </div>
                {/* New line for "Location" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Location: </span>{media_data.location}</p>
                </div>
                {/* New line for "Publisher" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Publisher: </span>{media_data.publisher}</p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {/* Button at the bottom */}
                <Link href={`/news-and-media/${media_data.id}`} key={media_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Read More</button>
                </Link>
            </div>
        </div>
    );
}
