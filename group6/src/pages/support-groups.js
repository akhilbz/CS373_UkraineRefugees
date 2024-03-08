import React from 'react'; // Add this line at the top of your file
import NavBar from './NavBar'; 
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import SupportCard from '@/components/SupportCard';
import { setSupportGroups } from '@/actions';
import axios from 'axios';


export default function SupportGroups() {
    const [supportGroups, setSupportGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [groupsPerPage] = useState(6); // Adjust the number of groups per page as needed

    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const currentGroups = supportGroups.slice(indexOfFirstGroup, indexOfLastGroup);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const fetchSupportGrpups = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://cs373-backend.ukrainecrisis.me/api/support-groups');
                setSupportGroups(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching support group data:', error);
                setLoading(false);
            }
        };

        fetchSupportGrpups();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(supportGroups)

    return (
        <div>
            <NavBar />
            <main>
                <header className='flex flex-col items-center justify-between pt-7 w-full'>
                    <h1 className='text-3xl font-medium mb-4'>Ukraine Refugee Support Groups</h1>
                    <div className='flex justify-between w-full px-4'>
                        <h2 className='font-light text-xl'>Total Support Groups: {supportGroups.length}</h2>
                        <h2 className='font-light text-xl'>Page Number: {currentPage}</h2>
                    </div>
                </header>
                <div className={`pt-28 pb-8 ${isSmallScreen ? 'px-2' : 'px-8'} flex justify-center w-full`}>
                    <Grid container spacing={isSmallScreen ? 2 : 4} className='flex justify-center'>
                        {currentGroups.map((group, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} className='flex justify-center'>
                                <Card className={`rounded-2xl min-h-[325px] ${isSmallScreen ? 'w-full max-w-[90%]' : 'w-[275px]'} mx-auto`}>
                                    <SupportCard support_groups_data={group}/>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className='flex justify-center mt-4 mb-8 w-full gap-2'>
                    <Button 
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                        disabled={currentPage === 1} 
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <Button 
                        style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                        disabled={currentPage === Math.ceil(supportGroups.length / groupsPerPage)} 
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </main>
        </div>
    );
};
