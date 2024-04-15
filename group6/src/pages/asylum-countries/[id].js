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

    const continentCoords = {
      'Africa': { lat: 1.6508, lng: 27.8493 },
      'Antarctica': { lat: -82.8628, lng: 135.0000 },
      'Asia': { lat: 34.0479, lng: 100.6197 },
      'Europe': { lat: 54.5260, lng: 15.2551 },
      'Americas': { lat: 54.5260, lng: -105.2551 },
      'Oceania': { lat: -18.7669, lng: 140.6675 },
    };

    // Example center location for the map
    const [center, setCenter] = useState({
      lat: Math.random() * (52 - 44) + 44,  // Latitude between 44 and 52
      lng: Math.random() * (40 - 22) + 22   // Longitude between 22 and 40
    });

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

                // Update map center based on the country's region
                const regionCoords = continentCoords[response.data.region];
                if (regionCoords) {
                    setCenter(regionCoords);
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
        return <div>Loading...</div>;
    }

    if (!country) {
        return <div>No country data available.</div>;
    }

    const handleLoad = map => {
        setMap(map);
    };
    
    const mapContainerStyle = {
        width: '80vw',
        height: '50vh', 
        margin: '0 auto', 
        borderRadius: '20px',
      };

    // Additional styles to ensure content is displayed properly
    const cardStyle = {
      maxWidth: '275px', 
      margin: 'auto', 
    };

    const gridContainerStyle = {
      marginTop: '20px',
      position: 'relative', 
    };

    const mainContainerStyle = {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1000px',
      margin: '20px auto',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      borderRadius: '20px',
      overflow: 'hidden',
      color: 'black',
    };

  return (
    <div>
      <NavBar />
      <main style={mainContainerStyle}>
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
        {/* Other content sections can be added here */}
        {/* Connections */}
        <div className="w-full pt-5 pb-5">
          <div className="w-full flex justify-center text-3xl pb-5 font-light">
            <h1>Recent News and Resources:</h1>
          </div>
          <Grid container spacing={3} style={gridContainerStyle}>
            <Grid item xs={12} md={6}>
            <Card className='rounded-2xl' style={{ width: '100%', maxHeight: '400px' }}>
                <SupportCard support_groups_data={singleGroupsInstance} />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
            <Card className='rounded-2xl' style={{ width: '100%', maxHeight: '400px' }}>
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
