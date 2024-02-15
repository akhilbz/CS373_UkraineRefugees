import React from "react";
import Link from 'next/link';

export default function SupportCard({ support_groups_data }) {

    return (
        <div className="flex flex-col rounded-2xl h-full overflow-hidden"> {}
            <div className="flex-grow"> {/* Flex-grow to fill space */}
                <div className="rounded-t-2xl flex items-center justify-center bg-yellow-600 h-[50px]">
                    <h1 className="text-white text-2xl font-light text-center">{support_groups_data.organization}</h1>
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold text-sm">{support_groups_data.organization}</h1>
                        <div className="flex justify-between">
                            <p className="text-xs">Status: <span className="text-green-600">{support_groups_data.status}</span></p>
                            <p className="text-xs">Year: {support_groups_data.year}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content area */}
                    <p className="text-xs"><span className="font-semibold">Services provided: </span>{support_groups_data.caption}</p>
                </div>
                {/* New line for "Based In" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Based In: </span>{support_groups_data.location}</p>
                </div>
                {/* New line for "Contact" */}
                <div className="m-2">
                    <p className="text-xs"><span className="font-semibold">Contact: </span>{support_groups_data.contact}</p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {}
                <Link href={`/support-groups/${support_groups_data.id}`} key={support_groups_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg text-xs">Explore</button>
                </Link>
            </div>
        </div>
    );
}
