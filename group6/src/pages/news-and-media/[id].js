import NavBar from '../NavBar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useJsApiLoader, GoogleMap, Marker, } from '@react-google-maps/api';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import SupportCard from '@/components/SupportCard';
import MediaCard from '@/components/MediaCard';

export default function TestimonialPage() {
  const router = useRouter();
  const { id } = router.query; // Accessing the dynamic part of the URL

  // Pin location
  const center = { lat: 48.3794, lng: 31.1656 }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  // Use useSelector without await, as it is synchronous
  const newsMedia = useSelector(state =>
    state.newsMedia.find((item, index) => index === parseInt(id, 10) - 1)
  );

  if (!isLoaded) {
    return <div>Loading Map...</div>; // or any other loading state
  }

  // Optionally, handle loading or undefined state
  if (!newsMedia) {
    return <div className='flex justify-center align-middle'>Loading...</div>;
  }


  return (
    <div>
      <NavBar />
      <main className='flex flex-col items-center pt-7'>
        <h1 className=' pt-5 pb-5 flex justify-center text-3xl font-sans'>{newsMedia?.title ?? "_topic_"}</h1>
        <div className="flex pb-5 justify-center">
          <div className='rounded-2xl w-[1000px] h-auto pb-8 bg-white bg-opacity-40'>
            <div className="flex justify-between">
              <div className="flex justify-start p-3 w-full">
                <img src={newsMedia?.image ?? "_img_url_"} className=" max-h-[250px] rounded-2xl " />
              </div>
              <div className='w-full'>
                <div className=" rounded-tr-2xl pb-2 flex items-end flex-col justify-end w-auto h-auto bg-yellow-600">
                  <h1 className=' py-1 pr-3 flex justify-end text-xl font-light'>{`Publisher: ${newsMedia?.publisher ?? "_publisher_"}`}</h1>
                  <h2 className=' flex w-full justify-end pr-3 text-xl font-light'>{`Date Published: ${newsMedia?.date ?? "_date_"}`}</h2>
                  <h2 className=' flex w-full justify-end pr-3 text-xl font-light'>{`Source Type: ${newsMedia?.source ?? "_source_"}`}</h2>
                  <h2 className=' flex w-full justify-end pr-3 text-xl font-light'>{`Location: ${newsMedia?.location ?? "_location_"}`}</h2>
                </div>
                <div className="bg-white rounded-bl-2xl">
                  <p className='p-2  text-lg text-yellow-600 flex justify-end w-full font-light'>{`"${newsMedia?.caption ?? "_caption_"}"`}</p>
                </div>
              </div>
            </div>
            <div className='pt-2 pb-4 w-full flex justify-center h-[350px] rounded-[50px]'>
              <GoogleMap
                center={center}
                zoom={5}
                mapContainerStyle={{ width: '500px', height: '350px', borderRadius: '50px' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}>
                <Marker position={center} />
              </GoogleMap>
            </div>
            <div className="w-[1000px] flex flex-col  items-center justify-between">
              <div className="w-[750px] flex justify-start pb-2">
                <h1 className='text-2xl font-light'>Read More at:</h1>
              </div>
              <div className='rounded-2xl flex justify-center items-center w-[800px] h-[50px]  bg-white'>
                <h1 className='text-center text-md text-yellow-600'><span className=' hover:underline'>
                  <a href={newsMedia?.link ?? 'www.google.com'} target="_blank" rel="noopener noreferrer">{newsMedia?.link ?? 'www.google.com'}</a></span></h1>
              </div>
            </div>
            {/* Connections */}
          <div className="w-full pt-5 pb-5">
            <div className="w-full flex justify-center text-3xl pb-5 font-light">
              <h1>Recent News and Resources:</h1>
            </div>
            <Grid container spacing={3} className='flex justify-center '>
              <Grid item xs={6} md={2.5} className='flex justify-center '>
              </Grid>
              <Grid item xs={6} md={2.5} className='flex justify-center '>
                <Card className='rounded-2xl h-[400px] w-[275px]'>
                  <MediaCard media_data={newsMedia} />
                </Card>
              </Grid>
            </Grid>
          </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};