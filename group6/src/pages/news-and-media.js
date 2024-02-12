import NavBar from './NavBar'; // Adjust the path as necessary
import Grid from '@mui/material/Grid'; // Grid version 2
import Card from '@mui/material/Card';
import MediaCard from '@/components/MediaCard';

export default function mediaModel() {
    const newsReels = [{
        id: 0,
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        source: "AP",
        caption: "Russian forces launched 45 drones over Ukraine in a five-and-a-half-hour barrage Sunday, officials said, as Ukrainian President Volodymyr Zelenskyy continued the reshuffle of his war cabinet as the war enters its third year.",
        image: 'https://dims.apnews.com/dims4/default/957dad5/2147483647/strip/true/crop/8640x5760+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Faa%2F5f%2F2c54e0fa639581dadd6b94b1ee84%2F90b6475c05814c08a48c25dde0384dd6',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 1,
        title: "Russian drone strike on Kharkiv, Ukraine’s 2nd largest city, kills 7",
        date: "February 10, 2024",
        source: "AP",
        caption: "A Russian drone strike on Kharkiv, Ukraine’s second largest city, killed seven people overnight, including three children, Kharkiv region governor Oleh Syniehubov reported Saturday. Three others sustained injuries, according to the officials.",
        image: 'https://dims.apnews.com/dims4/default/2641dc1/2147483647/strip/true/crop/6500x3656+0+0/resize/1440x810!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F36%2F7a%2F0319da6a2fd54a0b58378d43c2be%2F790cba8ce40b4a869ee6825bd44f40c9',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strikes-b5181631189a7a0d069f8ae26848cdcf'
    },
    {
        id: 2,
        title: "Russian Drone Strike Ignites a Fuel Depot, Setting a Neighborhood Ablaze in Ukraine",
        date: "February 10, 2024",
        source: "The New York Times",
        caption: "Seven people from two families died in the inferno in Kharkiv on Friday night, as burning oil flowed like lava. “People were doomed,” an official said.",
        image: 'https://static01.nyt.com/images/2024/02/10/multimedia/10ukraine-strike-interior-tmfk/10ukraine-strike-interior-tmfk-superJumbo.jpg?quality=75&auto=webp',
        link: 'https://www.nytimes.com/2024/02/10/world/russia-drone-strike-kharkiv-ukraine.html'
    },
    {
        id: 3,
        title: "Two years of war: Ukrainian refugees face lasting exile",
        date: "February 12, 2024",
        source: "yahoo!news",
        caption: "Iryna, Maryna, Katya -- three generations from one family -- fled their home in southern Ukraine just after the war started, hoping to return quickly.",
        image: 'https://s.yimg.com/ny/api/res/1.2/Co4p1BpA3TXMc857X_HIOw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/afp.co.uk/0bd404b3aa3a0a4d4eca67c9242bd099',
        link: 'https://uk.news.yahoo.com/two-years-war-ukrainian-refugees-061851366.html?guccounter=1'
    },
    {
        id: 4,
        title: "What do Ukrainian refugees make of Israel’s war on Gaza?",
        date: "February 2, 2024",
        source: "Aljazeera",
        caption: "Civilians have been bombed, killed and injured in their thousands. Infrastructure has been shelled – and millions displaced. Today, these images of conflict evoke Gaza, but 120 days ago were more associated with Ukraine following the Russian invasion of the former Soviet republic in February 2022.",
        image: 'https://www.aljazeera.com/wp-content/uploads/2024/02/Olena-1706867436.jpg?resize=770%2C513&quality=80',
        link: 'https://www.aljazeera.com/news/2024/2/2/ukrainian-refugees-divided-on-israels-war-on-gaza-but-feel-for-civilians'
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
                                    <Card className='h-[400px] min-w-64 max-w-96 rounded-2xl'>
                                        <MediaCard media_data={newsObject}/>
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