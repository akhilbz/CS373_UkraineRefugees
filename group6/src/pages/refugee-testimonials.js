import React from 'react'; // Add this line at the top of your file
import NavBar from './NavBar'; 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRefTestimonials } from '@/actions';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';
import axios from 'axios';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function RefugeeTestimonials() {
    const refTestimonials = useSelector(state => state.refTestimonials);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [testimonialsPerPage] = useState(2);

    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    const currentTestimonials = refTestimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <div>
            <NavBar />
            <main>
                <div className="top-7 flex relative items-center w-full"> 
                    <h1 className='text-3xl pt-7 font-medium w-full text-center absolute'>Refugee Testimonials</h1> 
                    <h2 className='absolute pt-7 right-3 font-light text-xl'>Total Testimonials: {refTestimonials.length}</h2> 
                </div>
                <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-2' : 'px-8'} flex justify-center w-full`}>
                    <Grid container spacing={isSmallScreen ? 2 : 4} className='flex justify-center'>
                        {currentTestimonials.map((testimonial, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card className={`rounded-2xl min-h-[400px] ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-full max-w-[400px]'} mx-auto`}>
                                    <RefugeeCard refugee_data={testimonial}/>
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
                        disabled={currentPage === Math.ceil(refTestimonials.length / testimonialsPerPage)} 
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    );
};
    