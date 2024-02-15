import NavBar from '../NavBar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import RefugeeCard from '@/components/RefugeeCard';
import MediaCard from '@/components/MediaCard';

export default function TestimonialPage() {
  const router = useRouter();
  const { id } = router.query; // Accessing the dynamic part of the URL

  // Use useSelector without await, as it is synchronous
  const supportGroup = useSelector(state =>
    state.supportGroups.find((item, index) => index === parseInt(id, 10) - 1)
  );

  // Optionally, handle loading or undefined state
  if (!supportGroup) {
    return <div className='flex justify-center align-middle'>Loading...</div>; // or any other loading state
  }
  const newsMedia = useSelector(state => 
    state.newsMedia.find((item, index) => index === parseInt(id, 10) - 1)
  );
  const refTestimonial = useSelector(state => 
    state.refTestimonials.find((item, index) => index === parseInt(id, 10) - 1)
  );

  return (
    <div>
      <NavBar />
      <main>
        <h1 className='pt-7 pb-8 flex justify-center text-3xl font-sans'>Support Group: {supportGroup?.id ?? "_topic_"}</h1>
        <div className="flex justify-center">
          <div className='rounded-2xl w-[1000px] h-auto pb-8 bg-white bg-opacity-40'>
            <div className="flex justify-between">
              <div className="rounded-tl-2xl rounded-br-2xl flex max-h-[200px] justify-start items-center p-3 w-fit bg-blue-800">
                <h1 className="text-white text-3xl font-sans text-center">{supportGroup.organization}</h1>
              </div>
              <div className='w-full'>
                <div className="rounded-tr-2xl pb-2 flex items-end flex-col justify-end w-auto h-auto bg-yellow-600">
                  <h1 className='py-1 pr-3 flex justify-end text-xl font-light'>{`Support Group Status: ${supportGroup?.status ?? "_status_"}`}</h1>
                  <h2 className='flex w-full justify-end pr-3 text-xl font-light'>{`Year: ${supportGroup?.year ?? "_date_"}`}</h2>
                </div>
                <div className="w-full bg-white rounded-bl-2xl">
                  <p className='p-3 text-md flex justify-end w-full font-light text-yellow-600'>{`"${supportGroup?.about ?? "_caption_"}"`}</p>
                </div>
              </div>
            </div>
            <div className="w-[1000px] flex flex-col items-center justify-between">
              <div className="w-[750px] flex justify-start pt-4">
                <h1 className='text-2xl font-light'>Visit their website:</h1>
              </div>
              <div className='rounded-2xl flex justify-center items-center w-[800px] h-[50px] bg-white'>
                <h1 className='text-center text-md text-yellow-600'><span className='hover:underline'>
                  <a href={supportGroup?.link ?? 'www.google.com'} target="_blank" rel="noopener noreferrer">{supportGroup?.link ?? 'www.google.com'}</a></span></h1>
              </div>
              <div className="w-[750px] flex justify-start pt-4">
                <h1 className='text-xl font-light'>Resources:</h1>
              </div>
              <div className='rounded-2xl flex justify-center items-center w-[800px] h-[50px] bg-white'>
                <h1 className='px-2 text-center text-md text-yellow-600 truncate'><span className='hover:underline'>
                  <a href={supportGroup?.link ?? 'www.google.com'} target="_blank" rel="noopener noreferrer">{supportGroup?.resources[0] ?? 'www.google.com'}</a></span></h1>
              </div>
              {/* Embed YouTube Video */}
              {supportGroup.youtube && (
                <div className="w-[750px] flex justify-start pt-4">
                  <h1 className='text-2xl font-light'>Watch their video:</h1>
                </div>
              )}
              {supportGroup.youtube && (
                <div className='rounded-2xl flex justify-center items-center w-[800px] h-[400px] bg-white'>
                  <iframe
                    width="560"
                    height="315"
                    src={supportGroup?.youtube ?? 'www.google.com'}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;webshare"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
              {/* Embed Picture */}
              {supportGroup.picture && (
                <div className="w-[750px] flex justify-start pt-4">
                </div>
              )}
              {supportGroup.picture && (
                <div className='rounded-2xl flex justify-center items-center w-[800px] h-[400px] bg-white'>
                  <img src={supportGroup.picture} alt="Support Group Picture" className="w-full h-full object-cover object-center" style={{ objectFit: 'contain' }} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Connections */}
        <div className="w-full pt-5 pb-5">
          <div className="w-full flex justify-center text-3xl pb-5 font-light">
            <h1>Recent News and Resources:</h1>
          </div>
          <Grid container spacing={3} className='flex justify-center '>
            <Grid item xs={6} md={2.5} className='flex justify-center '>
              <Card className='rounded-2xl h-[400px] w-[275px]'>
                <MediaCard media_data={newsMedia} />
              </Card>
            </Grid>
            <Grid item xs={6} md={2.5} className='flex justify-center '>
              <Card className='rounded-2xl h-[400px] w-[275px]'>
                <RefugeeCard refugee_data={refTestimonial} />
              </Card>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}
