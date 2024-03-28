import React, { useState } from 'react';
import NavBar from './NavBar';
import { useRouter } from 'next/router';
import { Tabs, Tab, Button } from '@mui/material';

const SearchPage = () => {
    const router = useRouter();
    const { term } = router.query;
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6); // 6 items per page, adjust as needed

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Pagination logic
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Dummy data for tab content
    const tabContent = {
        0: ['News item 1', 'News item 2', 'News item 3'],
        1: ['Group 1', 'Group 2', 'Group 3'],
        2: ['Country 1', 'Country 2', 'Country 3']
    };

    const indexOfLastItem = currentPage * newsPerPage;
    const indexOfFirstItem = indexOfLastItem - newsPerPage;
    const currentItems = tabContent[selectedTab].slice(indexOfFirstItem, indexOfLastItem);

    const tabLabels = ["News", "Groups", "Countries"];
    const selectedContentLabel = tabLabels[selectedTab];

    return (
        <div>
            <NavBar />
            <p style={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' }}>
                Showing results for: {term}
            </p>
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
                {tabLabels.map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>
            <h2 style={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' }}>
                {selectedContentLabel} content for "{term}"
            </h2>
            <div className='flex justify-center mt-4 mb-8'>
                <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </Button>
                <Button
                    variant="contained"
                    disabled={currentItems.length < newsPerPage}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default SearchPage;
