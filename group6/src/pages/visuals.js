import React, { useState } from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from '@mui/material';

const VisualsPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content for Our Visuals</p>;
            case 1:
                return <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content for Developer Visuals</p>;
            default:
                return <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content not found</p>;
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
