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

export default function mediaModel() {
    // const newsMedia = useSelector(state => state.newsMedia);
    const [newsMedia, setNewsMedia] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(6);
    const [post, setPost] = useState(null);
    let tempURL = "http://localhost:5000/api/sample-get";
    tempURL = "https://cs373-backend.ukrainecrisis.me/api/news";

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://cs373-backend.ukrainecrisis.me/api/news');
                setNewsMedia(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching asylum countries data:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);
    console.log(newsMedia)
    
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsMedia.slice(indexOfFirstNews, indexOfLastNews);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Media and Articles</h1>
                    <div className='flex justify-between w-full px-4'>
                        <h2 className='font-light text-xl'>Total Articles: {newsMedia.length}</h2>
                        <h2 className='font-light text-xl'>Page Number: {currentPage}</h2>
                    </div>
                </header>
                <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-4' : 'px-8'} flex justify-center w-full`}>
                    <Grid container spacing={4} className='flex justify-center'>
                        {currentNews.map((newsObject, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className={`h-[400px] mx-auto ${isSmallScreen ? 'min-w-[300px]' : 'min-w-[340px]'} max-w-[400px] rounded-2xl`}>
                                    <MediaCard media_data={newsObject}/>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='flex justify-center mt-4 mb-8 w-full gap-2'>
                    <Button 
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                        disabled={currentPage === 1} 
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button 
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
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
