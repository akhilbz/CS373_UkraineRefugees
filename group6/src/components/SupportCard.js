import React from "react";
import Link from 'next/link';

export default function SupportCard({ support_groups_data }) {

    const groupDetailsEndpoint = `/support-groups/${support_groups_data.id}`;

    const highlightSearchWord = (text, searchWord) => {
        if (!searchWord) {
            return { __html: text };
        }
        const regex = new RegExp(`(${searchWord})`, 'gi');
        const highlightedText = text.replace(regex, (match) => `<span style="background-color: yellow">${match}</span>`);
        return { __html: highlightedText };
    };

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden">
            <div className="flex-grow">
                <div className="rounded-t-2xl flex items-center justify-center bg-yellow-600 h-[50px]">
                    <h1 className="text-white text-2xl font-light text-center" dangerouslySetInnerHTML={highlightSearchWord(support_groups_data.name, support_groups_data.searchWord)}></h1>
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold text-sm" dangerouslySetInnerHTML={highlightSearchWord(support_groups_data.name, support_groups_data.searchWord)}></h1>
                        <div className="flex justify-between">
                            <p className="text-xs">Phone: {support_groups_data.phn_no}</p>
                            <p className="text-xs">Rating: {support_groups_data.rating}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis">
                    <p className="text-xs"><span className="font-semibold">Location: </span><span dangerouslySetInnerHTML={highlightSearchWord(support_groups_data.location, support_groups_data.searchWord)}></span></p>
                </div>
                <div className="m-2">
                    <a href={support_groups_data.website_url} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline">
                        <span className="font-semibold">Website: </span>{support_groups_data.website_url}
                    </a>
                    <img src={support_groups_data.picture_url} alt="Support Group" className="mt-2" />
                </div>
            </div>
            <div className="flex justify-center pb-1">
                <Link href={groupDetailsEndpoint}>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Explore</button>
                </Link>
            </div>
        </div>
    );
}
