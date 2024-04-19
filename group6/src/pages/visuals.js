import React, { useState } from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from '@mui/material';
import AsylumPieChart from '@/components/AsylumPieChart';

const VisualsPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // const random_data = [
    //     { region: 'Americas', percentage: 5 },
    //     { region: 'Europe', percentage: 20 },
    //     { region: 'Asia', percentage: 35 },
    //     { region: 'Australia', percentage: 15 },
    //   ];

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Content for Our Visuals</p>
                        <div className='flex justify-center mt-2 w-full space-x-4'>
                            <div className=' bg-white p-2 rounded-xl'>   
                                <AsylumPieChart />
                            </div>
                            <div className=' bg-white p-2 rounded-xl'>   
                                <AsylumPieChart />
                            </div>
                            <div className=' bg-white p-2 rounded-xl'>   
                                <AsylumPieChart />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content for Developer Visuals</p>
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
