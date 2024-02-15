import React from "react";
import Link from 'next/link';

export default function MediaCard({ media_data }) {

    return (
        <div className="flex flex-col rounded-2xl h-full"> {/* Ensure full height and column layout */}
            <div className="flex-grow"> {/* Flex-grow to fill space */}
                <div className="flex justify-center bg-black">
                    <img src={media_data.image} className="h-[200px] object-cover w-full"/>
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold">{media_data.title}</h1>
                        <div className="flex justify-between">
                            <p className="text-sm">{media_data.source}</p>
                            <p className="text-sm">{media_data.date}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content area */}
                    <p className="line-clamp-2 text-sm">{media_data.caption}</p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {/* Button at the bottom */}
                <Link href={`/news-and-media/${media_data.id}`} key={media_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg">Read More</button>
                </Link>
            </div>
        </div>
    );
}
