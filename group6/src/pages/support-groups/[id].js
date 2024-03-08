import NavBar from '../NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import MediaCard from '@/components/MediaCard';
import AsylumCountriesCard from '@/components/AsylumCountriesCard';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';

export default function SupportGroupDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [supportGroup, setSupportGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [singleNewsInstance, setSingleNewsInstance] = useState(null);
  const [singleCountryInstance, setSingleCountryInstance] = useState(null);
  const center = { lat: -34.397, lng: 150.644 };

  const mapContainerStyle = {
    width: '80vw',
    height: '50vh',
    margin: '0 auto',
    borderRadius: '20px',
  };

  const mainContainerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto', 
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '20px', 
    overflow: 'hidden', 
    color: 'black',
  };


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
  })  

  useEffect(() => {
    if (id && isLoaded) {
    const fetchCountryDetails = async () => {
        setLoading(true);
        try {
            let randomNumber1 = Math.floor(Math.random() * 100) + 1;
            let randomNumber2 = Math.floor(Math.random() * 150) + 1;

            const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/support-groups/${id}`);
            const response2 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/asylum-countries/${randomNumber1}`);
            const response3 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/news/${randomNumber2}`);

            setSupportGroup(response.data)
            setSingleCountryInstance(response2.data)
            setSingleNewsInstance(response3.data)
        } catch (error) {
            console.error('Error fetching country details', error);
        }
        setLoading(false);
    };

    fetchCountryDetails();
    }
}, [id, isLoaded]);

  if (loading) {
    return <div className='flex justify-center align-middle'>Loading...</div>;
  }

  if (!supportGroup) {
    return <div className='flex justify-center align-middle'>Support Group not found.</div>;
  }

  return (
    <div>
      <NavBar />
      <main style={mainContainerStyle}>
        {/* Removed the duplicate title h1 element here */}
        <div className="flex justify-center">
          <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
            <div className="flex flex-col items-center">
              <div className="rounded-tl-2xl bg-blue-800 p-3 w-full text-center">
                <h1 className="text-white text-3xl font-sans">{supportGroup.name}</h1>
              </div>
              <div className="bg-yellow-600 p-3 w-full text-white text-xl font-light">
                <p>Location: {supportGroup.location}</p>
                <p>Phone Number: {supportGroup.phn_no}</p>
                <p>Rating: {supportGroup.rating}</p>
              </div>
              <div className="p-3 w-full text-2xl">
                <h2>Visit their website:</h2>
                <a href={supportGroup.website_url} target="_blank" rel="noopener noreferrer" className='text-blue-600 hover:underline'>{supportGroup.website_url}</a>
              </div>
              <div className='w-full flex justify-center'>
                {isLoaded && (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={8}
                    options={{
                      zoomControl: false,
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                )}
              </div>
            </div>
          </div>
        </div>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          {/* Grid item for AsylumCountriesCard */}
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='rounded-2xl' style={{ width: '100%', maxHeight: '400px' }}>
              <AsylumCountriesCard country_data={singleCountryInstance} />
            </Card>
          </Grid>
          {/* Grid item for MediaCard */}
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='rounded-2xl' style={{ width: '100%', maxHeight: '400px' }}>
              <MediaCard media_data={singleNewsInstance} />
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
