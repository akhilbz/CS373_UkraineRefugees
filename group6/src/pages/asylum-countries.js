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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';

export default function AsylumCountries() {
    const [asylumCountries, setAsylumCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(6); // Adjust this value as per your design needs
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [anchorElRegions, setAnchorElRegions] = useState(null);
    const [anchorElLanguages, setAnchorElLanguages] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Open state for Authors Popover
    const openRegion = Boolean(anchorElRegions);
    const regionId = openRegion ? 'region-popover' : undefined;

    // Open state for Sources Popover
    const openLanguages = Boolean(anchorElLanguages);
    const languagesId = openLanguages ? 'languages-popover' : undefined;

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
                        order: orderBy,
                        languages: selectedLanguages.join(','),
                        regions: selectedRegions.join(',')
                    }
                });
                

                setAsylumCountries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching asylum countries data:', error);
                setLoading(false);
            }
        };

        const searchAsylumCountries = async () => {
            try {
                
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:5000/api/search/countries/${searchQuery}`, {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        languages: selectedLanguages.join(','),
                        regions: selectedRegions.join(',')
                    }
                });
                console.log(response);
                console.log("Here")
                setAsylumCountries(response.data.countries);
                setLoading(false);
            } catch (error) {
                console.error('Error search countries data:', error);
                // console.log("error");
                setAsylumCountries([]);
            }
        };

        if (searchQuery === '') {
            fetchAsylumCountries();
        } else {
            searchAsylumCountries();
        }
        console.log(searchQuery);

    }, [searchQuery, sortOption, orderBy, selectedLanguages, selectedRegions]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    
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

    const handleLanguagesChange = (event) => {
        if (event.target.checked) {
            setSelectedLanguages([...selectedLanguages, event.target.name]);
        } else {
            setSelectedLanguages(selectedLanguages.filter(source => source !== event.target.name));
        }
    };

    const handleRegionsChange = (event) => {
        if (event.target.checked) {
            setSelectedRegions([...selectedRegions, event.target.name]);
        } else {
            setSelectedRegions(selectedRegions.filter(author => author !== event.target.name));
        }
    };

    const handleRegionsClick = (event) => {
        setAnchorElRegions(event.currentTarget);
    };

    const handleRegionsClose = () => {
        setAnchorElRegions(null);
    };

    // Event handlers for Sources
    const handleLanguagesClick = (event) => {
        setAnchorElLanguages(event.currentTarget);
    };

    const handleLanguagesClose = () => {
        setAnchorElLanguages(null);
    };

    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Asylum Countries</h1>
                    <div className='flex items-center w-full px-4'>
                        {/* Filters section For Authors */}
                        <div className='flex justify-left  px-1 mb-1'>
                            <Button
                                aria-describedby={regionId}
                                variant="outlined"
                                onClick={handleRegionsClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white'
                                }}
                            >
                                Regions
                            </Button>
                            <Button
                                aria-describedby={languagesId}
                                variant="outlined"
                                onClick={handleLanguagesClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white',
                                    marginLeft: '20px'
                                }}
                            >
                                Languages
                            </Button>
                        </div>
                        <Popover
                            id={regionId}
                            open={openRegion}
                            anchorEl={anchorElRegions}
                            onClose={handleRegionsClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Select Region
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRegions.includes('Africa')}
                                                onChange={handleRegionsChange}
                                                name="Africa"
                                            />
                                        }
                                        label="Africa"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRegions.includes('Americas')}
                                                onChange={handleRegionsChange}
                                                name="Americas"
                                            />
                                        }
                                        label="Americas"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRegions.includes('Asia')}
                                                onChange={handleRegionsChange}
                                                name="Asia"
                                            />
                                        }
                                        label="Asia"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRegions.includes('Europe')}
                                                onChange={handleRegionsChange}
                                                name="Europe"
                                            />
                                        }
                                        label="Europe"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRegions.includes('Oceania')}
                                                onChange={handleRegionsChange}
                                                name="Oceania"
                                            />
                                        }
                                        label="Oceania"
                                    />
                                </FormGroup>
                            </List>
                        </Popover>
                        <Popover
                            id={languagesId}
                            open={openLanguages}
                            anchorEl={anchorElLanguages}
                            onClose={handleLanguagesClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Select Languages
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('English')}
                                                onChange={handleLanguagesChange}
                                                name="English"
                                            />
                                        }
                                        label="English"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('German')}
                                                onChange={handleLanguagesChange}
                                                name="German"
                                            />
                                        }
                                        label="German"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('French')}
                                                onChange={handleLanguagesChange}
                                                name="French"
                                            />
                                        }
                                        label="French"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('Dutch')}
                                                onChange={handleLanguagesChange}
                                                name="Dutch"
                                            />
                                        }
                                        label="Dutch"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('Spanish')}
                                                onChange={handleLanguagesChange}
                                                name="Spanish"
                                            />
                                        }
                                        label="Spanish"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('Arabic')}
                                                onChange={handleLanguagesChange}
                                                name="Arabic"
                                            />
                                        }
                                        label="Arabic"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLanguages.includes('Other')}
                                                onChange={handleLanguagesChange}
                                                name="Other"
                                            />
                                        }
                                        label="Other"
                                    />
                                </FormGroup>

                            </List>
                        </Popover>

                        {/* Center - Search bar */}
                        <div className='flex justify-center rounded mx-5' style={{ width: '65%',  borderRadius: '8px'}}>
                            <TextField
                                variant="outlined"
                                id="search-bar"
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="end" >
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    
                                }}
                                style={{ width: '95%', borderRadius: '10px', backgroundColor: 'white'
                                 }}  // Adjust width as needed to fit design
                                
                            />
                        </div>

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
                                <Card className={` min-h-[400px]  ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-full max-w-[400px]'} rounded-2xl mx-auto`}>
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
