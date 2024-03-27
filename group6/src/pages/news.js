import React from 'react'; // Add this line at the top of your file
import NavBar from './NavBar';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNewsMedia } from '@/actions';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MediaCard from '@/components/MediaCard';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import axios from "axios"; 
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

export default function mediaModel() {
    // const newsMedia = useSelector(state => state.newsMedia);
    const [newsMedia, setNewsMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [orderBy, setOrderBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6);
    const [post, setPost] = useState(null);

    const [anchorElAuthors, setAnchorElAuthors] = useState(null);
    const [anchorElSources, setAnchorElSources] = useState(null);




    let tempURL = "http://localhost:5000/api/sample-get";
    tempURL = "https://cs373-backend.ukrainecrisis.me/api/news";

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/api/news', {
                    params: {
                        sort_by: sortOption,
                        order: orderBy,
                        sources: selectedSources.join(','), 
                        authors: selectedAuthors.join(',')
                    }
                });
                setNewsMedia(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching asylum countries data:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, [sortOption, orderBy, selectedSources, selectedAuthors]);
    console.log(newsMedia)
    
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsMedia.slice(indexOfFirstNews, indexOfLastNews);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Open state for Authors Popover
    const openAuthors = Boolean(anchorElAuthors);
    const authorsId = openAuthors ? 'authors-popover' : undefined;

    // Open state for Sources Popover
    const openSources = Boolean(anchorElSources);
    const sourcesId = openSources ? 'sources-popover' : undefined;


    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        // Need To handle searching Not sure if we do it here or in our API?
    };

    const handleOrderChange = (event) => {
        setOrderBy(event.target.value);
        //Need To handle searching Not sure if we do it here or in our API?
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        //Need To handle searching Not sure if we do it here or in our API?
    };

    const handleSourceChange = (event) => {
        if (event.target.checked) {
            setSelectedSources([...selectedSources, event.target.name]);
        } else {
            setSelectedSources(selectedSources.filter(source => source !== event.target.name));
        }
    };

    const handleAuthorChange = (event) => {
        if (event.target.checked) {
            setSelectedAuthors([...selectedAuthors, event.target.name]);
        } else {
            setSelectedAuthors(selectedAuthors.filter(author => author !== event.target.name));
        }
    };

    const handleAuthorsClick = (event) => {
        setAnchorElAuthors(event.currentTarget);
    };

    const handleAuthorsClose = () => {
        setAnchorElAuthors(null);
    };

    // Event handlers for Sources
    const handleSourcesClick = (event) => {
        setAnchorElSources(event.currentTarget);
    };

    const handleSourcesClose = () => {
        setAnchorElSources(null);
    };
    
    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Media and Articles</h1>
                    <div className='flex items-center w-full px-4'>
                        {/* Filters section For Authors */}
                        <div className='flex justify-left  px-1 mb-1'>
                            <Button
                                aria-describedby={authorsId}
                                variant="outlined"
                                onClick={handleAuthorsClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white'
                                }}
                            >
                                Authors
                            </Button>
                            <Button
                                aria-describedby={sourcesId}
                                variant="outlined"
                                onClick={handleSourcesClick}
                                style={{
                                    fontWeight: 'bold',
                                    borderColor: 'white',
                                    borderWidth: '2px',
                                    color: 'white',
                                    marginLeft: '20px'
                                }}
                            >
                                Sources
                            </Button>
                        </div>
                        <Popover
                            id={authorsId}
                            open={openAuthors}
                            anchorEl={anchorElAuthors}
                            onClose={handleAuthorsClose}
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
                                        Select Authors
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('zerohedge.com')}
                                                onChange={handleAuthorChange}
                                                name="zerohedge.com"
                                            />
                                        }
                                        label="zerohedge.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('newsweek.com')}
                                                onChange={handleAuthorChange}
                                                name="newsweek.com"
                                            />
                                        }
                                        label="newsweek.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('businessinsider.com')}
                                                onChange={handleAuthorChange}
                                                name="businessinsider.com"
                                            />
                                        }
                                        label="businessinsider.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('ZEIT ONLINE: News -')}
                                                onChange={handleAuthorChange}
                                                name="ZEIT ONLINE: News -"
                                            />
                                        }
                                        label="ZEIT ONLINE: News -"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('feedfeeder')}
                                                onChange={handleAuthorChange}
                                                name="feedfeeder"
                                            />
                                        }
                                        label="feedfeeder"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('aol.com')}
                                                onChange={handleAuthorChange}
                                                name="aol.com"
                                            />
                                        }
                                        label="aol.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedAuthors.includes('Others')}
                                                onChange={handleAuthorChange}
                                                name="Others"
                                            />
                                        }
                                        label="Others"
                                    />
                                </FormGroup>
                            </List>
                        </Popover>
                        <Popover
                            id={sourcesId}
                            open={openSources}
                            anchorEl={anchorElSources}
                            onClose={handleSourcesClose}
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
                                        Select Sources
                                    </ListSubheader>
                                }
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('taz.de')}
                                                onChange={handleSourceChange}
                                                name="taz.de"
                                            />
                                        }
                                        label="taz.de"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('STERN.de')}
                                                onChange={handleSourceChange}
                                                name="STERN.de"
                                            />
                                        }
                                        label="STERN.de"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Portfolio.hu')}
                                                onChange={handleSourceChange}
                                                name="Portfolio.hu"
                                            />
                                        }
                                        label="Portfolio.hu"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Marketscreener.com')}
                                                onChange={handleSourceChange}
                                                name="Marketscreener.com"
                                            />
                                        }
                                        label="Marketscreener.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Freerepublic.com')}
                                                onChange={handleSourceChange}
                                                name="Freerepublic.com"
                                            />
                                        }
                                        label="Freerepublic.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('DW (English)')}
                                                onChange={handleSourceChange}
                                                name="DW (English)"
                                            />
                                        }
                                        label="DW (English)"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Diepresse.com')}
                                                onChange={handleSourceChange}
                                                name="Diepresse.com"
                                            />
                                        }
                                        label="Diepresse.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Die Zeit')}
                                                onChange={handleSourceChange}
                                                name="Die Zeit"
                                            />
                                        }
                                        label="Die Zeit"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Biztoc.com')}
                                                onChange={handleSourceChange}
                                                name="Biztoc.com"
                                            />
                                        }
                                        label="Biztoc.com"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedSources.includes('Others')}
                                                onChange={handleSourceChange}
                                                name="Others"
                                            />
                                        }
                                        label="Others"
                                    />
                                </FormGroup>

                            </List>
                        </Popover>

                        {/* Center - Search bar */}
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
                        </div>

                        {/* Right side - Sort and Order section with page number above */}
                        <div className='flex'>
                            <div>
                                <div className='flex justify-end gap-4'>
                                    <FormControl variant="filled" style={{ backgroundColor: 'white', minWidth: 120 }}>
                                        <InputLabel id="sort-label">Sort by</InputLabel>
                                        <Select
                                            labelId="sort-label"
                                            id="sort-select"
                                            value={sortOption}
                                            onChange={handleSortChange}
                                        >
                                            <MenuItem value="default">Default</MenuItem>
                                            <MenuItem value="title">Title</MenuItem>
                                            <MenuItem value="date">Date</MenuItem>
                                            <MenuItem value="source">Source</MenuItem>
                                            <MenuItem value="author">Author</MenuItem>
                                            <MenuItem value="story">Story</MenuItem>
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
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between w-full px-4'>
                        <h2 className='font-light text-xl'>Total News and Media: {newsMedia.length}</h2>
                        <h2 className='font-light text-xl'>Page Number: {currentPage}</h2>
                    </div>
                </header>
                <Grid container spacing={4} className={`pt-28 pb-8 ${isSmallScreen ? 'px-4' : 'px-8'} flex justify-center w-full`}>
                    {currentNews.map((newsObject, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card className={`h-[400px] mx-auto ${isSmallScreen ? 'min-w-[300px]' : 'min-w-[340px]'} max-w-[400px] rounded-2xl`}>
                                <MediaCard media_data={newsObject} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <div className='flex justify-center mt-4 mb-8 w-full gap-2'>
                    <Button
                        variant="contained"
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        disabled={currentPage === Math.ceil(newsMedia.length / newsPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    );
};
