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
      <main className='flex flex-col items-center pt-7'>
        <h1 className='pb-5 text-3xl font-sans'>
          {refTestimonial?.topic ?? "_topic_"}
        </h1>
        <div className='rounded-2xl w-[1000px] h-auto bg-white bg-opacity-40 p-3 mb-8'>
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between items-center">
            <img src={refTestimonial?.image ?? "_img_url_"} alt="Testimonial" className="h-[300px] rounded-2xl mr-5"/>
            <div className='w-[400px] flex justify-center h-[300px]  rounded-[16px]'>
            <GoogleMap 
              center={{ lat: refTestimonial?.location[0] ?? 48.3794, lng: refTestimonial?.location[1] ?? 31.1656 }}
              zoom={5}
              mapContainerStyle={{ width: '400px', height: '300px', borderRadius: '16px'  }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}>
              <Marker position={{ lat: refTestimonial?.location[0] ?? 48.3794, lng: refTestimonial?.location[1] ?? 31.1656 }} />
            </GoogleMap>
            </div>
            </div>
            
            <div className='text-center'>
              <div className="bg-blue-700 my-2 rounded-2xl">
                <h1 className='text-2xl font-light pt-3'>{`Name: ${refTestimonial?.name ?? "_name_"}`}</h1>
                <h2 className='text-xl font-light'>{`${refTestimonial?.date ?? "_date_"}`}</h2>
                <h3 className='text-xl font-light'>{`${refTestimonial?.timeDisplaced ?? "_timeDisplaced_"}`}</h3>
                <p className='text-lg p-2'>{`"${refTestimonial?.caption ?? "_caption_"}"`}</p>
              </div>
              <div className='bg-white text-yellow-600 rounded-2xl p-2'>
                <h1 className='text-2xl font-light underline'>Testimonial</h1>
                <p className='text-lg'>{refTestimonial?.testimonial ?? "_testimonial_"}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};