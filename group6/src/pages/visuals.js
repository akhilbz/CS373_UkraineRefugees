import React, { useState } from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from '@mui/material';
import AsylumPieChart from '@/components/AsylumPieChart';
import MediaBarChart from '@/components/MediaBarChart';
import SupportHistogram from '@/components/SupportHistogram';
const VisualsPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px', marginBottom: '20px', fontSize: '25px', fontWeight: 'bold', textDecorationLine: 'underline' }}>Content for Our Visuals</p>
                        <div className='flex justify-center mt-2 w-full space-x-4 mb-8'>
                            <div className="space-y-4">
                                <div className=' bg-white p-2 rounded-xl flex justify-center items-center'>   
                                    <AsylumPieChart />
                                </div>
                                <div className=' flex-col rounded-xl bg-white h-20 flex justify-center text-center'>
                                    <h2 className='text-black font-semibold text-xl '>Regions Pie Chart</h2>
                                    <p className=' text-gray-500 font-light text-xs '>Description: Details the percentage of countries in each region.</p>
                                </div>
                                
                                <div className=' bg-yellow-600 p-2 rounded-xl flex justify-center items-center'>   
                                    <SupportHistogram />
                                </div>
                                <div className=' flex-col rounded-xl bg-yellow-600 h-20 flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>Support Groups Histogram</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the number of support groups at a range of ratings.</p>
                                </div>
                            </div>
                            <div className=' bg-[#202c34] p-2 rounded-xl flex-col flex justify-evenly '>   
                                <MediaBarChart />
                                <div className=' flex-col rounded-xl flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>News & Media Bar Graph</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the percentage of articles available from each source.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            case 1:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px', fontSize: '25px', fontWeight: 'bold', textDecorationLine: 'underline'  }}>Content for Developer Visuals</p>
                    </div>
                );
            default:
                return (
                    <div>
                    <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content not found</p>
                    </div>
                );
        }
    };



    return (
        <div>
            <NavBar />
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                sx={{
                    '.MuiTab-root': { fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' },
                }}
            >
                <Tab label="Our Visuals" />
                <Tab label="Developer Visuals" />
            </Tabs>
            {renderTabContent()}
        </div>
    );
};

export default VisualsPage;
