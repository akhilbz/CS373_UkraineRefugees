import React from 'react'; // Add this line at the top of your file
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import AsylumCountriesCard from '@/components/AsylumCountriesCard';
import axios from 'axios';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useJsApiLoader, GoogleMap, Marker, } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SupportCard from '@/components/SupportCard';

export default function AsylumCountries() {
    const [asylumCountries, setAsylumCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(6); // Adjust this value as per your design needs
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');

    // Determine the current countries to display based on the current page
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = asylumCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchAsylumCountries = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/api/asylum-countries', {
                    params: {
                        sort_by: sortOption,
                        order: orderBy
                    }
                });
                

                setAsylumCountries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching asylum countries data:', error);
                setLoading(false);
            }
        };

        fetchAsylumCountries();
    }, [sortOption, orderBy]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        // Need To handle searching Not sure if we do it here or in our API?
    };

    const handleOrderChange = (event) => {
        setOrderBy(event.target.value);
        // Need To handle searching Not sure if we do it here or in our API?
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        // Need To handle searching Not sure if we do it here or in our API?
    };

    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Asylum Countries</h1>
                    <div className='flex flex-wrap justify-center gap-4 mb-4'>
                        <TextField
                            fullWidth
                            variant="filled"
                            id="search-bar"
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ backgroundColor: 'white' }}
                        />
                        <FormControl variant="filled" style={{ backgroundColor: 'white', minWidth: 120 }}>
                            <InputLabel id="sort-label">Sort by</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort-select"
                                value={sortOption}
                                onChange={handleSortChange}
                            >
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="capital">Capital</MenuItem>
                                <MenuItem value="region">Region</MenuItem>
                                <MenuItem value="population">Population</MenuItem>
                                <MenuItem value="languages">Languages</MenuItem>
                                {/* Add other sorting options here */}
                            </Select>
                        </FormControl>
                        <FormControl variant="filled" style={{ backgroundColor: 'white', minWidth: 120 }}>
                            <InputLabel id="order-label">Order by</InputLabel>
                            <Select
                                labelId="order-label"
                                id="order-select"
                                value={orderBy}
                                onChange={handleOrderChange}
                            >
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                                {/* Add other ordering options here */}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='flex justify-between w-full px-4'>
                        <h2 className='font-light text-xl'>Total Countries: {asylumCountries.length}</h2>
                        <h2 className='font-light text-xl'>Page Number: {currentPage}</h2>
                    </div>
                </header>
                <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-2' : 'px-8'} flex justify-center w-full`}>
                    <Grid container spacing={isSmallScreen ? 2 : 4} className='flex justify-center'>
                        {currentCountries.map((country, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className={`rounded-2xl min-h-[400px] ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-full max-w-[400px]'} mx-auto`}>
                                    <AsylumCountriesCard country_data={country} />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='flex justify-center mt-4 mb-8 w-full gap-2'>
                    <Button
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                        disabled={currentPage === Math.ceil(asylumCountries.length / countriesPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    );
};
