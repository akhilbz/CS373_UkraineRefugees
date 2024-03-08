import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import MediaCard from '@/components/MediaCard';
import SupportCard from '@/components/SupportCard';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';


const CountryDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [country, setCountry] = useState(null);
    const [singleNewsInstance, setSingleNewsInstance] = useState(null);
    const [singleGroupsInstance, setSingleGroupsInstance] = useState(null);

    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState(null);

    // Example center location for the map
    const center = { lat: -34.397, lng: 150.644 };

    // Load the Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    useEffect(() => {
        if (id && isLoaded) {
        const fetchCountryDetails = async () => {
            setLoading(true);
            try {
                let randomNumber1 = Math.floor(Math.random() * 50) + 1;
                let randomNumber2 = Math.floor(Math.random() * 150) + 1;

                const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/asylum-countries/${id}`);
                const response2 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/support-groups/${randomNumber1}`);
                const response3 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/news/${randomNumber2}`);

                setCountry(response.data);
                setSingleGroupsInstance(response2.data)
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
        return <div>Loading...</div>;
    }

    if (!country) {
        return <div>No country data available.</div>;
    }

    const handleLoad = map => {
        setMap(map);
    };
    
    const mapContainerStyle = {
        width: '80vw', // This will make the map width responsive to the viewport width
        height: '50vh', // Adjust the height as per your design needs
        margin: '0 auto', // Auto margins for horizontal centering
        borderRadius: '20px', // Optional: if you want rounded corners for the map container
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Optional: if you want to add a shadow to match other elements
      };

  return (
    <div>
      <NavBar />
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>{country.name}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img 
            src={country.flag} 
            alt={`Flag of ${country.name}`} 
            style={{ height: '200px', width: 'auto', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} 
          />
        </div>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {country.languages}</p>
          
          <div className='flex justify-center h-[300px]  rounded-[16px]'>
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
        {/* Other content sections can be added here */}
        {/* Connections */}
        <div className="w-full pt-5 pb-5">
          <div className="w-full flex justify-center text-3xl pb-5 font-light">
            <h1>Recent News and Resources:</h1>
          </div>
          <Grid container spacing={3} className='flex justify-center '>
            <Grid item xs={6} md={2.5} className='flex justify-center '>
              <Card className='rounded-2xl h-[400px] w-[275px]'>
                {/* <SupportCard support_groups_data={singleGroupsInstance} /> */}
              </Card>
              </Grid>
              <Grid item xs={6} md={2.5} className='flex justify-center '>
                <Card className='rounded-2xl h-[400px] w-[275px]'>
                  <MediaCard media_data={singleNewsInstance} />
                </Card>
              </Grid>
          </Grid>
        </div>

      </main>
    </div>
  );
};

export default CountryDetailPage;
