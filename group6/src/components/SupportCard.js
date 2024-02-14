import React from "react";
import Link from 'next/link';

export default function SupportCard({ support_groups_data }) {

    return (
        <div className="flex flex-col rounded-2xl bg-white h-full"> {/* Ensure full height and column layout */}
            <div className="flex-grow"> {/* Flex-grow to fill space */}
                <div className="rounded-t-2xl  flex min-h-[50px] max-h-[170px] justify-center items-center bg-yellow-600">
                    <h1 className="text-white text-2xl font-light text-center">{support_groups_data.organization}</h1>
                </div>
                <div className="border-b-[1px]">
                    <div className="m-2">
                        <h1 className="font-semibold">{support_groups_data.organization}</h1>
                        <div className="flex justify-between">
                            <p className="text-sm">Status: <span className="text-green-600">{support_groups_data.status}</span></p>
                            <p className="text-sm">Year: {support_groups_data.year}</p>
                        </div>
                    </div>
                </div>
                <div className="m-2 overflow-ellipsis"> {/* Content area */}
                    <p className=" text-sm">{support_groups_data.caption}</p>
                </div>
            </div>
            <div className="flex justify-center pb-1"> {/* Button at the bottom */}
                <Link href={`/support-groups/${support_groups_data.id}`} key={support_groups_data.id} passHref>
                    <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg">Explore</button>
                </Link>
            </div>
        </div>
    );
}
