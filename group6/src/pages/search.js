import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AsylumCountriesCard from '@/components/AsylumCountriesCard';
import SupportCard from '@/components/SupportCard';
import MediaCard from '@/components/MediaCard';
import { useRouter } from 'next/router';
import { Tabs, Tab, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from "axios"; 


const SearchPage = () => {
    const router = useRouter();
    const { term } = router.query;
    const [selectedTab, setSelectedTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');

    const [asylumCountries, setAsylumCountries] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [newsMedia, setNewsMedia] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const [supportGroups, setSupportGroups] = useState([]);
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [newsPerPage] = useState(6); // 6 items per page, adjust as needed

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    console.log(selectedTab);
    // Pagination logic
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        console.log(term);
        const searchAsylumCountries = async () => {
            try {
                
                // setLoading(true);
                const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/search/countries/${term}`, {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        languages: selectedLanguages.join(','),
                        regions: selectedRegions.join(',')
                    }
                });
                console.log(response);
                console.log("Here Countries")
                setAsylumCountries(response.data.countries);
                // setLoading(false);
            } catch (error) {
                // console.error('Error search countries data:', error);
                // console.log("error");
                setAsylumCountries([]);
            }
        };

        const searchNews = async () => {
            try {
                
                // setLoading(true);
                const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/search/news/${term}`, {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        sources: selectedSources.join(','), 
                        authors: selectedAuthors.join(',')
                    }
                });
                console.log(response.data.news);
                console.log("Here News")
                setNewsMedia(response.data.news);
                // setLoading(false);
            } catch (error) {
                // console.error('Error search news data:', error);
                setNewsMedia([]);
            }
        };

        const searchSupportGroups = async () => {
            try {
                
                // setLoading(true);
                const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/search/support-groups/${term}`, {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        location: selectedLocation.join(';'),
                        ratings: selectedRating.join(',')
                    }
                });
                // console.log(response.data.support_groups);
                console.log("Here Groups")
                setSupportGroups(response.data.support_groups);
                // setLoading(false);
            } catch (error) {
                // console.error('Error search countries data:', error);
                // console.log("error");
                setSupportGroups([]);
            }
        };

        searchAsylumCountries();
        searchNews();
        searchSupportGroups();
    }, [term, sortOption, orderBy, selectedLanguages, selectedRegions, selectedSources, selectedAuthors, selectedLocation, selectedRating]);
    
    // Tab Content:
    const tabContent = [newsMedia, supportGroups, asylumCountries];
    console.log(tabContent);

    const indexOfLastItem = currentPage * newsPerPage;
    const indexOfFirstItem = indexOfLastItem - newsPerPage;
    const currentItems = tabContent[selectedTab].slice(indexOfFirstItem, indexOfLastItem);
    
    const tabLabels = ["News", "Groups", "Countries"];
    const selectedContentLabel = tabLabels[selectedTab];

    return (
        <div>
            <NavBar />
            <p className='ml-2 mt-2' style={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' }}>
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
            {/* Displaying total instances and current page */}
            <div className="flex justify-between items-center px-4 my-4">
                <h2 className='text-xl' style={{ color: 'white', textShadow: '1px 1px black' }}>
                    Total {selectedContentLabel}: {tabContent[selectedTab].length}
                </h2>
                <h2 className='text-xl' style={{ color: 'white', textShadow: '1px 1px black' }}>
                    Page: {currentPage} of {Math.ceil(tabContent[selectedTab].length / newsPerPage)}
                </h2>
            </div>

            <h2 className='ml-2' style={{ fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' }}>
                {selectedContentLabel} content for "{term}"
            </h2>
            <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-2' : 'px-8'} flex justify-center w-full`}>
                <Grid container spacing={isSmallScreen ? 2 : 4} className='flex justify-center'>
                    {currentItems.map((data, index) => {
                        if (selectedTab == 0) {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Card className={`h-[400px] mx-auto ${isSmallScreen ? 'min-w-[300px]' : 'min-w-[340px]'} max-w-[400px] rounded-2xl`}>
                                        <MediaCard media_data={data} />
                                    </Card>
                                </Grid>
                            )} else if (selectedTab == 1) {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index} className='flex justify-center'>
                                    <Card className={`rounded-2xl min-h-[325px] ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-[275px]'} mx-auto`}>
                                        <SupportCard support_groups_data={data} />
                                    </Card>
                                </Grid>
                            )} else if (selectedTab === 2) {
                            return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className={` min-h-[400px]  ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-full max-w-[400px]'} rounded-2xl mx-auto`}>
                                    <AsylumCountriesCard country_data={data} />
                                </Card>
                            </Grid>
                            )}
                        }
                    )}
                </Grid>
            </div>
            
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
