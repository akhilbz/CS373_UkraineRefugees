import NavBar from './NavBar'; // Adjust the path as necessary
import Grid from '@mui/material/Grid'; // Grid version 2
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function RefugeeTestimonials() {
    const items = [1, 2, 3, 4, 5, 6];

    return (
        <div>
            <NavBar />
            <main>
                <h1 className=' pt-7 pb-20 flex justify-center text-3xl font-bold'>Refugee Testimonials</h1>
                <div className="flex justify-center items-center w-full">
                    <Grid container spacing={2} className='flex justify-center w-[1000px]'>
                        <Grid item xs={6} md={4}>
                            <Card className=' text-center'>
                                <div>

                                </div>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    );
};

