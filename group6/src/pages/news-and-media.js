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
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        source: "AP",
        caption: "Russian forces launched 45 drones over Ukraine in a five-and-a-half-hour barrage Sunday, officials said, as Ukrainian President Volodymyr Zelenskyy continued the reshuffle of his war cabinet as the war enters its third year.",
        image: 'https://dims.apnews.com/dims4/default/957dad5/2147483647/strip/true/crop/8640x5760+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Faa%2F5f%2F2c54e0fa639581dadd6b94b1ee84%2F90b6475c05814c08a48c25dde0384dd6',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 3,
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        source: "AP",
        caption: "Russian forces launched 45 drones over Ukraine in a five-and-a-half-hour barrage Sunday, officials said, as Ukrainian President Volodymyr Zelenskyy continued the reshuffle of his war cabinet as the war enters its third year.",
        image: 'https://dims.apnews.com/dims4/default/957dad5/2147483647/strip/true/crop/8640x5760+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Faa%2F5f%2F2c54e0fa639581dadd6b94b1ee84%2F90b6475c05814c08a48c25dde0384dd6',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 4,
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        source: "AP",
        caption: "Russian forces launched 45 drones over Ukraine in a five-and-a-half-hour barrage Sunday, officials said, as Ukrainian President Volodymyr Zelenskyy continued the reshuffle of his war cabinet as the war enters its third year.",
        image: 'https://dims.apnews.com/dims4/default/957dad5/2147483647/strip/true/crop/8640x5760+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Faa%2F5f%2F2c54e0fa639581dadd6b94b1ee84%2F90b6475c05814c08a48c25dde0384dd6',
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