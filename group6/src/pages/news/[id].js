import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import SupportCard from '@/components/SupportCard';
import AsylumCountriesCard from '@/components/AsylumCountriesCard';


const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [newsItem, setNewsItem] = useState(null);
  const [singleCountryInstance, setSingleCountriesInstance] = useState(null);
  const [singleGroupsInstance, setSingleGroupsInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the Google Maps API
  const center = { lat: -34.397, lng: 150.644 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY,
})

  useEffect(() => {
    if (id && isLoaded) {
      const fetchNewsDetails = async () => {
        setLoading(true);
        try {
          let randomNumber1 = Math.floor(Math.random() * 100) + 1;
          let randomNumber2 = Math.floor(Math.random() * 50) + 1;

          const response = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/news/${id}`);
          const response2 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/asylum-countries/${randomNumber1}`);
          const response3 = await axios.get(`https://cs373-backend.ukrainecrisis.me/api/support-groups/${randomNumber2}`);
          setNewsItem(response.data);
          setSingleCountriesInstance(response2.data)
          setSingleGroupsInstance(response3.data)

        } catch (error) {
          console.error('Error fetching news details', error);
        }
        setLoading(false);
      };

      fetchNewsDetails();
    }
  }, [id, isLoaded]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const mapContainerStyle = {
    width: '80vw', // This will make the map width responsive to the viewport width
    height: '50vh', // Adjust the height as per your design needs
    margin: '0 auto', // Auto margins for horizontal centering
    borderRadius: '20px', // Optional: if you want rounded corners for the map container
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Optional: if you want to add a shadow to match other elements
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsItem) {
    return <div>No news data available.</div>;
  }

  return (
    <div>
      <NavBar />
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>{newsItem.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img 
            src={newsItem.urlToImage} 
            alt={`Cover of ${newsItem.title}`} 
            style={{ maxWidth: '100%', height: 'auto', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }} 
          />
        </div>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <p><strong>Author:</strong> {newsItem.author}</p>
          <p><strong>Published At:</strong> {newsItem.dateString}</p>
          <p><strong>Source Name:</strong> {newsItem.name}</p>
          <div style={{ textAlign: 'justify', marginTop: '20px' }}>
            <p>{newsItem.description}</p>
            <p>{newsItem.content}</p>
          </div>
        </div>
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
        {/* Other content sections can be added here */}
        <Grid container spacing={3} className='flex justify-center '>
            <Grid item xs={6} md={2.5} className='flex justify-center '>
              <Card className='rounded-2xl h-[400px] w-[275px]'>
                <AsylumCountriesCard country_data={singleCountryInstance} />
              </Card>
              </Grid>
              <Grid item xs={6} md={2.5} className='flex justify-center '>
                <Card className='rounded-2xl h-[400px] w-[275px]'>
                  {/* <SupportCard support_groups_data={singleGroupsInstance} /> */}
                </Card>
              </Grid>
          </Grid>
      </main>
    </div>
  );
};

export default NewsDetailPage;
