import NavBar from './NavBar'; 
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRefTestimonials } from '@/actions';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';

export default function RefugeeTestimonials() {
    const dispatch = useDispatch();
    const testimonials = [{
        id: 1,
        name: "Tanja",
        date: "March 16, 2022",
        topic: "Long Journey After Leaving Husband Behind",
        caption: "Tanja and her children spent more than 30 hours fleeing Ukraine before arriving to Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `It took Tanja and her children more than 30 hours of grueling travel before they arrived at the Przemysl train station in Poland. 
        The family has another 10-hour journey before they reach Warsaw, Poland. I come from a town called Krivoy Rog in central Ukraine and near my house there is a military base. 
        The other night they were bombing constantly from 4 in the morning to 7. We were afraid so I took the kids and I fled,” she said. 
        “My husband is still there, and I start crying every time I think of that. I am so afraid for the children and the men left behind fighting in Ukraine. 
        I just want to go home; I want to go home as soon as possible. I do not want to travel to other European countries, because I want to stay close, as soon as I can go home, 
        I will,” she said.`
    },
    {   
        id: 2,
        name: "Pendura",
        date: "March 16, 2022",
        topic: "Headed to Spain",
        caption: "Pendura, her daughter and grandson are headed to Spain after leaving everything behind in Ukraine.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/pendura.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Pendura, her daughter Larysa and her grandson Alexander, one year and seven months old, left their village just outside of Kyiv a few days ago. 
        While they wait in the mother and child friendly space at the train station in Lviv, Ukraine, she says that she’s left behind two sons in Kyiv who are fighting.
        During a time in her childhood, Larysa lived in Spain with a host family. When the fighting broke out, the family reached out via social media, inviting her to come stay with them in Spain. 
        While the family waits for a bus to take them there, they worry about their loved ones at home.`
    },
    {
        id: 3,
        name: "Alina",
        date: "March 16, 2022",
        topic: "Trauma of War",
        caption: "Alina and her daughter fled from their neighborhood after heavy bombing in the area.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `You can see the terror in Erika’s eyes when she talks about her traumatic experience in Ukraine. She says that when the bombing started, she was home with friends. 
        Since that time, it has been a nightmare. “We spent five days in the bombing shelter. I thought that it would never end. I don’t want to go back. In a few hours, I will take the bus to the Netherlands. 
        The Netherlands is a safe haven,” she said while struggling to manage her emotions and feelings. Alina, Erika’s mother, is optimistic that very soon Ukrainians will be able to return home to Ukraine.
        “We are a strong nation. We will win this war and peace is very close. I will visit Netherlands and very soon I will return to my beloved Ukraine,” Erika said.`
    },
    {
        id: 4,
        name: "Francis",
        date: "March 16, 2022",
        topic: "Foreign Students Flee Ukraine",
        caption: "Francis and Frank, both students, left Ukraine when the conflict started.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/erica.jpeg.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Francis from Nigeria and Frank from Cameroon recently talked to a Red Cross worker in Hungary. Both were students in Ukraine when violence erupted. 
        They were among the more than three million people who fled the country. “The Red Cross has been very generous, they offered us food and tea, and helped make food for my baby,” Francis said.`
    },
    {
        id: 5,
        name: "Viktoria",
        date: "March 16, 2022",
        topic: "Victoria from Kyiv",
        caption: "Viktoria and her mother are headed to relatives in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/victoria.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Viktoria and her mother came from Kyiv, Ukraine to Záhony at the Hungary-Ukraine border — a distance of more than 500 miles — with two small puppies in her backpack. 
        She said she could not bear to leave them behind. She and the puppies are now headed to Warsaw, Poland, where they will stay with a cousin.`
    },
    {
        id: 6,
        name: "Magdalena",
        date: "March 16, 2022",
        topic: "Welcoming Refugees",
        caption: "Megdalena is handing out toys to children arriving at a train station in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/toys.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Magdalena Michutka Kuras is a paramedic volunteering at the health station at the Przemysl train station in Poland. 
        She’s just received notice that another train from Ukraine has arrived at the station and she’s ready to distribute toys to children who arriving from Ukraine. 
        “It is nice to see how happy they are when they are given a toy,” she says.`
    }];

    useEffect(() => {
        dispatch(setRefTestimonials(testimonials));
    }, []);
    const refTestimonials = useSelector(state => state.refTestimonials);

    return (
        <div>
            <NavBar />
            <main>
                <div className="top-7 flex relative items-center w-full"> 
                    <h1 className='text-3xl pt-7 font-medium w-full text-center absolute'>Refugee Testimonials</h1> 
                    <h2 className='absolute pt-7 right-3 font-light text-xl'>Total Testimonials: {testimonials.length}</h2> 
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