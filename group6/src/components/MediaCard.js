import React from "react";
import Link from 'next/link';

export default function MediaCard({ media_data }) {
    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };
    
    const highlightSearchWord = (text, searchWord) => {
        if (!searchWord) {
            return { __html: text };
        }
        const regex = new RegExp(`(${searchWord})`, 'gi');
        const highlightedText = text.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`);
        return { __html: highlightedText };
    };

    const mediaDetailsEndpoint = `/news/${media_data.id}`;
    console.log("MEDIA ID: ", media_data.id)

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden"> {/* Card container */}
            <div className="flex-grow"> {/* Content container */}
                <div className="flex justify-center bg-black"> {/* Image container */}
                    <img src={media_data.urlToImage || 'path_to_some_default_image.jpg'} alt={media_data.title} className="h-[200px] w-full object-cover" />
                </div>
                <div className="border-b-[1px]"> {/* Title section */}
                    <div className="m-2">
                        <h1 className="font-semibold" dangerouslySetInnerHTML={highlightSearchWord(truncateText(media_data.title, 30), media_data.searchWord)}></h1>
                        <div className="flex justify-between">
                            {/* <p className="text-xs font-semibold">{`Source: ${media_data.name}`}</p> */}
                            <p className="text-xs font-semibold" dangerouslySetInnerHTML={highlightSearchWord(`Source: ${media_data.name}`, media_data.searchWord)}></p>
                            <p className="text-xs">{new Date(media_data.publishedAt).toLocaleDateString()}</p>
                        </div>
                        {/* <p className="text-xs font-semibold">{`Author: ${media_data.author}`}</p> */}
                        <p className="text-xs font-semibold" dangerouslySetInnerHTML={highlightSearchWord(`Author: ${media_data.author}`, media_data.searchWord)}></p>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content section */}
                    <p className="line-clamp-2 text-sm" dangerouslySetInnerHTML={highlightSearchWord(truncateText(media_data.description, 150), media_data.searchWord)}></p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {/* Button at the bottom */}
                <Link href={mediaDetailsEndpoint}>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Read More</button>
                </Link>
            </div>
        </div>
    );
}
