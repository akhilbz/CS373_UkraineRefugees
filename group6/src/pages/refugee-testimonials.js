import NavBar from './NavBar'; // Adjust the path as necessary
import Grid from '@mui/material/Grid'; // Grid version 2
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';

export default function RefugeeTestimonials() {
    const testimonials = [{
        id: 1,
        name: "Tanja",
        date: "March 16, 2022",
        topic: "Long Journey After Leaving Husband Behind",
        caption: "Tanja and her children spent more than 30 hours fleeing Ukraine before arriving to Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg'
        
    },
    {   
        id: 2,
        name: "Pendura",
        date: "March 16, 2022",
        topic: "Headed to Spain",
        caption: "Pendura, her daughter and grandson are headed to Spain after leaving everything behind in Ukraine.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/pendura.jpg.transform/768/q70/feature/image.jpeg'
    },
    {
        id: 3,
        name: "Alina",
        date: "March 16, 2022",
        topic: "Trauma of War",
        caption: "Alina and her daughter fled from their neighborhood after heavy bombing in the area.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg'
    },
    {
        id: 4,
        name: "Francis",
        date: "March 16, 2022",
        topic: "Foreign Students Flee Ukraine",
        caption: "Francis and Frank, both students, left Ukraine when the conflict started.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/erica.jpeg.jpg.transform/768/q70/feature/image.jpeg'
        
    },
    {
        id: 5,
        name: "Viktoria",
        date: "March 16, 2022",
        topic: "Victoria from Kyiv",
        caption: "Viktoria and her mother are headed to relatives in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/victoria.jpg.transform/768/q70/feature/image.jpeg'
    },
    {
        id: 6,
        name: "Magdalena",
        date: "March 16, 2022",
        topic: "Welcoming Refugees",
        caption: "Megdalena is handing out toys to children arriving at a train station in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/toys.jpg.transform/768/q70/feature/image.jpeg'
    }]

    return (
        <div>
            <NavBar />
            <main>
                <h1 className=' pt-7 pb-12 flex justify-center text-3xl font-bold'>Refugee Testimonials</h1>
                <div className=' pb-12 flex justify-center w-full'>
                    <div className="flex justify-center items-center">
                        <Grid container spacing={3} className='flex justify-center '>
                            {testimonials.map(testimonial => (
                                <Grid item xs={6} md={2.5} className='flex justify-center'>
                                    <Card className='h-[400px] w-[250px] rounded-2xl'>
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