import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SupportCard from '@/components/SupportCard';
import NavBar from './NavBar';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';

export default function SupportGroups() {
    const [supportGroups, setSupportGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [groupsPerPage] = useState(6);

    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = supportGroups.slice(indexOfFirstGroup, indexOfLastGroup);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [anchorElRating, setAnchorElRating] = useState(null);
    const [anchorElLocation, setAnchorElLocation] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Open state for Authors Popover
    const openRating = Boolean(anchorElRating);
    const ratingId = openRating ? 'rating-popover' : undefined;

    // Open state for Sources Popover
    const openLocation = Boolean(anchorElLocation);
    const locationId = openLocation ? 'location-popover' : undefined;

    useEffect(() => {
        const fetchSupportGroups = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/api/support-groups', {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        location: selectedLocation.join(';'),
                        ratings: selectedRating.join(',')
                    }
                });
                setSupportGroups(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching support group data:', error);
                setLoading(false);
            }
        };

        const searchSupportGroups = async () => {
            try {
                
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:5000/api/search/support-groups/${searchQuery}`, {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        location: selectedLocation.join(';'),
                        ratings: selectedRating.join(',')
                    }
                });
                console.log(response);
                console.log("Here")
                setSupportGroups(response.data.support_groups);
                setLoading(false);
            } catch (error) {
                console.error('Error search countries data:', error);
                // console.log("error");
                setSupportGroups([]);
            }
        };

        if (searchQuery === '') {
            fetchSupportGroups();
        } else {
            searchSupportGroups();
        }
        console.log(searchQuery);

        // fetchSupportGroups();
    }, [searchQuery, sortOption, orderBy, selectedLocation,selectedRating ]); // Include sortOption in the dependency array if sorting logic is to be applied here

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

    const handleLocationChange = (event) => {
        if (event.target.checked) {
            setSelectedLocation([...selectedLocation, event.target.name]);
        } else {
            setSelectedLocation(selectedLocation.filter(source => source !== event.target.name));
        }
    };

    const handleRatingChange = (event) => {
        if (event.target.checked) {
            setSelectedRating([...selectedRating, event.target.name]);
        } else {
            setSelectedRating(selectedRating.filter(author => author !== event.target.name));
        }
    };

    const handleRatingClick = (event) => {
        setAnchorElRating(event.currentTarget);
    };

    const handleRatingClose = () => {
        setAnchorElRating(null);
    };

    // Event handlers for Sources
    const handleLocationClick = (event) => {
        setAnchorElLocation(event.currentTarget);
    };

    const handleLocationClose = () => {
        setAnchorElLocation(null);
    };

    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Support Groups</h1>
                    <div className='flex items-center w-full px-4'>
                        {/* Filters section For Authors */}
                        <div className='flex justify-left  px-1 mb-1'>
                            <Button
                                aria-describedby={ratingId}
                                variant="outlined"
                                onClick={handleRatingClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white'
                                }}
                            >
                                Rating
                            </Button>
                            <Button
                                aria-describedby={locationId}
                                variant="outlined"
                                onClick={handleLocationClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white',
                                    marginLeft: '20px'
                                }}
                            >
                                Location
                            </Button>
                        </div>
                        <Popover
                            id={ratingId}
                            open={openRating}
                            anchorEl={anchorElRating}
                            onClose={handleRatingClose}
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
                                        Select Rating
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRating.includes('100')}
                                                onChange={handleRatingChange}
                                                name="100"
                                            />
                                        }
                                        label="100"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRating.includes('95-99')}
                                                onChange={handleRatingChange}
                                                name="95-99"
                                            />
                                        }
                                        label="95-99"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRating.includes('90-94')}
                                                onChange={handleRatingChange}
                                                name="90-94"
                                            />
                                        }
                                        label="90-94"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedRating.includes('90<')}
                                                onChange={handleRatingChange}
                                                name="90<"
                                            />
                                        }
                                        label="Below 90"
                                    />
                                </FormGroup>
                            </List>
                        </Popover>
                        <Popover
                            id={locationId}
                            open={openLocation}
                            anchorEl={anchorElLocation}
                            onClose={handleLocationClose}
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
                                        Select Locations
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Alexandria , VA')}
                                                onChange={handleLocationChange}
                                                name="Alexandria , VA"
                                            />
                                        }
                                        label="Alexandria , VA"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Cincinnati , OH')}
                                                onChange={handleLocationChange}
                                                name="Cincinnati , OH"
                                            />
                                        }
                                        label="Cincinnati , OH"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('FairFax, VA')}
                                                onChange={handleLocationChange}
                                                name="FairFax, VA"
                                            />
                                        }
                                        label="Fairfax , VA"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Minneapolis, MN') || selectedLocation.includes('Minneapolis, MN; Minneapolis , MN')}
                                                onChange={handleLocationChange}
                                                name="Minneapolis, MN; Minneapolis , MN"
                                            />
                                        }
                                        label="Minneapolis, MN"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('New York , NY') || selectedLocation.includes('New York , NY; New York, , NY')}
                                                onChange={handleLocationChange}
                                                name="New York , NY; New York, , NY"
                                            />
                                        }
                                        label="New York , NY"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Santa Barbara , CA')}
                                                onChange={handleLocationChange}
                                                name="Santa Barbara , CA"
                                            />
                                        }
                                        label="Santa Barbara , CA"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Washington , DC')}
                                                onChange={handleLocationChange}
                                                name="Washington , DC"
                                            />
                                        }
                                        label="Washington , DC"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedLocation.includes('Others')}
                                                onChange={handleLocationChange}
                                                name="Others"
                                            />
                                        }
                                        label="Others"
                                    />
                                </FormGroup>
                            </List>
                        </Popover>

                        {/* Center - Search bar
                        <div className='flex justify-center flex-grow pl-'>
                            <TextField
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
                                style={{ width: '80%' }}  // Adjust width as needed to fit design
                            />
                        </div> */}
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
                                <MenuItem value="location">Location</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                                <MenuItem value="phn_no">Phone Number</MenuItem>
                                <MenuItem value="website">Website</MenuItem>
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
                        <h2 className='font-light text-xl'>Total Groups: {supportGroups.length}</h2>
                        <h2 className='font-light text-xl'>Page: {currentPage}</h2>
                    </div>
                </header>
                <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-2' : 'px-8'} flex justify-center w-full`}>
                    <Grid container spacing={isSmallScreen ? 2 : 4} className='flex justify-center'>
                        {currentGroups.map((group, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} className='flex justify-center'>
                                <Card className={`rounded-2xl min-h-[325px] ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-[275px]'} mx-auto`}>
                                    <SupportCard support_groups_data={group} />
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
                        disabled={currentPage === Math.ceil(supportGroups.length / groupsPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    );
};
