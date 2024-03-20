import React from "react";
import Link from 'next/link';

export default function MediaCard({ media_data }) {
    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };
    const mediaDetailsEndpoint = `/news/${media_data.id}`;
    console.log("MEDIA ID: ", media_data.id)

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden"> {/* Card container */}
            <div className="flex-grow"> {/* Content container */}
                <div className="flex justify-center bg-black"> {/* Image container */}
                    {/* Display image with a fallback in case image URL is missing */}
                    <img src={media_data.urlToImage || 'path_to_some_default_image.jpg'} alt={media_data.title} className="h-[200px] w-full object-cover" />
                </div>
                <div className="border-b-[1px]"> {/* Title section */}
                    <div className="m-2">
                        {/* Display title and truncate if necessary */}
                        <h1 className="font-semibold">{truncateText(media_data.title, 30)}</h1>
                        <div className="flex justify-between">
                            {/* Display source name */}
                            <p className="text-xs font-semibold">{`Source: ${media_data.name}`}</p>
                            {/* Display formatted publication date */}
                            <p className="text-xs">{new Date(media_data.publishedAt).toLocaleDateString()}</p>
                        </div>
                        {/* Display author */}
                        <p className="text-xs font-semibold">{`Author: ${media_data.author}`}</p>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content section */}
                    {/* Display description and truncate if necessary */}
                    <p className="line-clamp-2 text-sm">{truncateText(media_data.description, 150)}</p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {/* Button at the bottom */}
                <Link href={mediaDetailsEndpoint} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Read More</button>
                </Link>
            </div>
        </div>
    );
}
