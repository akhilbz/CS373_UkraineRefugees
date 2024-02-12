import NavBar from './NavBar'; // Adjust the path as necessary
import Grid from '@mui/material/Grid'; // Grid version 2
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';

export default function mediaModel() {
    const newsReels = [{
        id: 1,
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        source: "Long Journey After Leaving Husband Behind",
        caption: "Tanja and her children spent more than 30 hours fleeing Ukraine before arriving to Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {   
        id: 2,
        title: "Pendura",
        date: "March 16, 2022",
        source: "Headed to Spain",
        caption: "Pendura, her daughter and grandson are headed to Spain after leaving everything behind in Ukraine.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/pendura.jpg.transform/768/q70/feature/image.jpeg',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 3,
        title: "Alina",
        date: "March 16, 2022",
        source: "Trauma of War",
        caption: "Alina and her daughter fled from their neighborhood after heavy bombing in the area.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 4,
        title: "Francis",
        date: "March 16, 2022",
        source: "Foreign Students Flee Ukraine",
        caption: "Francis and Frank, both students, left Ukraine when the conflict started.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/erica.jpeg.jpg.transform/768/q70/feature/image.jpeg',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 5,
        title: "Viktoria",
        date: "March 16, 2022",
        source: "Victoria from Kyiv",
        caption: "Viktoria and her mother are headed to relatives in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/victoria.jpg.transform/768/q70/feature/image.jpeg',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    }]

    return (
        <div>
            <NavBar />
            <main>
                <h1 className=' pt-7 pb-12 flex justify-center text-3xl font-bold'>Media and Articles</h1>
                <div className=' pb-12 flex justify-center w-full'>
                    <div className="flex justify-center items-center">
                        <Grid container spacing={3} className='flex justify-center '>
                            {newsReels.map(newsObject => (
                                <Grid item xs={6} md={2.5} className='flex justify-center'>
                                    <Card className='h-[400px] w-[250px] rounded-2xl'>
                                        <RefugeeCard refugee_data={newsObject}/>
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