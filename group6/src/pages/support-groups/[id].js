import React from 'react';
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

  const stateCoords = {
    'VA': { lat: 37.4316, lng: -78.6569 }, // Virginia
    'WA': { lat: 47.7511, lng: -120.7401 }, // Washington
    'CA': { lat: 36.7783, lng: -119.4179 }, // California
    'KS': { lat: 39.0119, lng: -98.4842 }, // Kansas
    'DC': { lat: 38.9072, lng: -77.0369 }, // Washington, D.C.
    'NY': { lat: 40.7128, lng: -74.0060 }, // New York
    'OH': { lat: 39.9612, lng: -82.9988 }, // Ohio
    'MN': { lat: 45.0731, lng: -93.5824 }, // Minnesota
    'CT': { lat: 41.6032, lng: -73.0877 }, // Connecticut
    'MA': { lat: 42.4072, lng: -71.3824 }, // Massachusetts
    'NC': { lat: 35.7596, lng: -79.0193 }, // North Carolina
    'GA': { lat: 32.1656, lng: -82.9001 }, // Georgia
    'IL': { lat: 40.6331, lng: -89.3985 }, // Illinois
    'OR': { lat: 43.8041, lng: -120.5542 }, // Oregon
    'NJ': { lat: 40.0583, lng: -74.4057 }, // New Jersey
    'CO': { lat: 39.5501, lng: -105.7821 }, // Colorado
    'IA': { lat: 41.8780, lng: -93.0977 }, // Iowa
    'MD': { lat: 39.0458, lng: -76.6413 }, // Maryland
    'TN': { lat: 35.5175, lng: -86.5804 }, // Tennessee
    'FL': { lat: 27.9944, lng: -81.7603 }, // Florida
    'MO': { lat: 37.9643, lng: -91.8318 }, // Missouri
    'PA': { lat: 41.2033, lng: -77.1945 }  // Pennsylvania
  };
  

  const [center, setCenter] = useState({
    lat: Math.random() * (52 - 44) + 44,  // Latitude between 44 and 52
    lng: Math.random() * (40 - 22) + 22   // Longitude between 22 and 40
  });

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

            const stateAbbr = response.data.location.split(', ')[1].trim();
            const coords = stateCoords[stateAbbr];
            if (coords) {
              setCenter(coords);
            }
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

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img 
                  src={supportGroup.picture_url} 
                  alt={`Cover of ${supportGroup.name}`} 
                  style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} 
                />
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
            <Card className='rounded-2xl' style={{ width: '100%'}}>
              <AsylumCountriesCard country_data={singleCountryInstance} />
            </Card>
          </Grid>
          {/* Grid item for MediaCard */}
          <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='rounded-2xl' style={{ width: '100%'}}>
              <MediaCard media_data={singleNewsInstance} />
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
