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

    useEffect(() => {
        const fetchSupportGroups = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://cs373-backend.ukrainecrisis.me/api/support-groups');
                setSupportGroups(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching support group data:', error);
                setLoading(false);
            }
        };

        fetchSupportGroups();
    }, [sortOption]); // Include sortOption in the dependency array if sorting logic is to be applied here

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
                    <h1 className='text-3xl font-medium mb-4'>Ukraine Refugee Support Groups</h1>
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
                                <MenuItem value="Location">Location</MenuItem>
                                <MenuItem value="Rating">Rating</MenuItem>
                                <MenuItem value="PhoneNumber">Phone Number</MenuItem>
                                <MenuItem value="name">Website</MenuItem>
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
