import NavBar from '../NavBar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useJsApiLoader, GoogleMap, Marker, } from '@react-google-maps/api';

export default function TestimonialPage() {
  const router = useRouter();
  const { id } = router.query; // Accessing the dynamic part of the URL

  const center = { lat: 48.3794, lng: 31.1656 }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
  })


  // Use useSelector without await, as it is synchronous
  const refTestimonial = useSelector(state => 
    state.refTestimonials.find((item, index) => index === parseInt(id, 10) - 1)
  );

  if (!isLoaded) {
    return <div>Loading Map...</div>; // or any other loading state
  }
  // Optionally, handle loading or undefined state
  if (!refTestimonial) {
    return <div>Loading...</div>; // or any other loading state
  }


  return (
    <div>
      <NavBar />
      <main>
        <h1 className=' pt-7 pb-5 flex justify-center text-3xl  font-sans'>{refTestimonial?.topic ?? "_topic_" }</h1>
        <div className="flex justify-center">
          <div className='rounded-2xl w-[1000px] h-[600px] bg-white bg-opacity-40'>
            <div className="flex justify-between">
              <div className="flex justify-start p-3 w-[650px]">
                <img src={refTestimonial?.image  ?? "_img_url_"} className="h-[300px]  rounded-2xl "/>
              </div>
              <div>
                <h1 className=' p-3 flex justify-center text-2xl font-light'>{`Name: ${refTestimonial?.name ?? "_name_"}`}</h1>
                <h2 className=' flex w-full justify-end pr-3 text-xl font-light'>{`${refTestimonial?.date ?? "_date_"}`}</h2>
                <h3 className=' flex w-full justify-end pr-3 text-xl font-light'>{`${refTestimonial?.timeDisplaced ?? "Time Displaced"}`}</h3>
                <p className='p-2 text-lg flex justify-end w-full'>{`"${refTestimonial?.caption ?? "_caption_"}"`}</p>
              </div>
            </div>
            <div>
              <h1 className=' pl-3 flex justify-start text-2xl font-light'>Testimonial:</h1>
              <p className='px-3 pt-2 text-lg flex justify-end w-full'>{refTestimonial?.testimonial ?? "_testimonial_"}</p>
            </div>
          </div>
        </div>
        <div className='w-[500px] h-[500px] bg-white '>
          <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '500px', height: '500px'}}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}>
            <Marker position={center} />
          </GoogleMap>
        </div>
    </main>
    </div>
  );
};
