import React from "react";
export default function RefugeeCard({ refugee_data }) {
    
    return (
        <div className="rounded-2xl bg-white">
            <div className="flex justify-center bg-black">
                <img src={refugee_data.image} className="h-[200px] "/>
            </div>
            <div className="border-b-[1px]">
                <div className="m-2">
                    <h1 className="font-semibold">{refugee_data.topic}</h1>
                    <div className="flex justify-between">
                        <p className="text-sm">{refugee_data.name}</p>
                        <p className="text-sm">{refugee_data.date}</p>
                    </div>
                </div>
            </div>
            <div className="m-2 overflow-ellipsis"> {/* Adjust the height as needed */}
                <p className="line-clamp-2 text-sm">{refugee_data.caption}</p> {/* This will apply ellipsis after 3 lines */}
            </div>
            
            <div className=" flex justify-center p-2">
                <button className="h-[25px] w-[85px] bg-slate-300 rounded-lg ">
                Read More
                </button>
            </div>
        </div>
    );
}