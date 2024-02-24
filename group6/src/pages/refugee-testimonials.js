import NavBar from './NavBar'; 
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRefTestimonials } from '@/actions';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';
import axios from 'axios';


export default function RefugeeTestimonials() {
    const refTestimonials = useSelector(state => state.refTestimonials);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get('http://localhost:8000/') // Adjust URL as needed
            .then(response => {
                // setRefTestimonials(response.data);
                // print(response.data)
                console.log("RESPONSE FROM SCRAPE")
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
            });
    }, []);
    
    return (
        <div>
            <NavBar />
            <main>
                <div className="top-7 flex relative items-center w-full"> 
                    <h1 className='text-3xl pt-7 font-medium w-full text-center absolute'>Refugee Testimonials</h1> 
                    <h2 className='absolute pt-7 right-3 font-light text-xl'>Total Testimonials: {refTestimonials.length}</h2> 
                </div>
                <div className=' pt-28 pb-8 flex justify-center w-full'>
                    <div className="flex justify-center items-center">
                        <Grid container spacing={3} className='flex justify-center '>
                            {refTestimonials.map(testimonial => (
                                <Grid item xs={6} md={2.5} className='flex justify-center '>
                                    <Card className='rounded-2xl h-[400px] w-[275px]'>
                                        <RefugeeCard refugee_data={testimonial}/>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
                
            </main>
        </div>
    );
};