import React, { useState } from 'react';
import NavBar from './NavBar';
import { Tabs, Tab } from '@mui/material';
import AsylumPieChart from '@/components/UkraineVisuals/AsylumPieChart';
import MediaBarChart from '@/components/UkraineVisuals/MediaBarChart';
import SupportHistogram from '@/components/UkraineVisuals/SupportHistogram';
import OrganizationPieChart from '@/components/BBVisuals/OrganizationPieChart';
import ScholarshipBarChart from '@/components/BBVisuals/ScholarshipBarChart';
import CitiesHistogram from '@/components/BBVisuals/CitiesHistogram';

const VisualsPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);


    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px', marginBottom: '20px', fontSize: '25px', fontWeight: 'bold', textDecorationLine: 'underline' }}>Content for Our Visuals</p>
                        <div className='flex justify-center mt-2 w-full space-x-4 mb-8'>
                            <div className="space-y-4">
                                <div className=' bg-white p-2 rounded-xl flex justify-center items-center'>
                                    <AsylumPieChart />
                                </div>
                                <div className=' flex-col rounded-xl bg-white h-20 flex justify-center text-center'>
                                    <h2 className='text-black font-semibold text-xl '>Regions Pie Chart</h2>
                                    <p className=' text-gray-500 font-light text-xs '>Description: Details the percentage of countries in each region.</p>
                                </div>

                                <div className=' bg-yellow-600 p-2 rounded-xl flex justify-center items-center'>
                                    <SupportHistogram />
                                </div>
                                <div className=' flex-col rounded-xl bg-yellow-600 h-20 flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>Support Groups Histogram</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the number of support groups at a range of ratings.</p>
                                </div>
                            </div>
                            <div className=' bg-[#202c34] p-2 rounded-xl flex-col flex justify-evenly '>
                                <MediaBarChart />
                                <div className=' flex-col rounded-xl flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>News & Media Bar Graph</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the percentage of articles available from each source.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ color: 'white', textAlign: 'center', margin: '20px 0', fontSize: '25px', fontWeight: 'bold' }}>
                            Self Critique
                        </div>
                        <div style={{ margin: '20px', fontSize: '18px', color: 'white' }}>
                            <strong>What Did We Do Well?</strong>
                            <ul>
                                <li>Communicate</li>
                                <li>Learning</li>
                                <li>Completing all the different components/tasks each phase</li>
                            </ul>
                            <strong>What Did We Learn?</strong>
                            <ul>
                                <li>New Technologies, AWS, Flask, React, SQL</li>
                                <li>How to efficiently split and delegate tasks</li>
                                <li>Working with Premade APIs along with creating our own</li>
                            </ul>
                            <strong>What Did We Teach Each Other?</strong>
                            <ul>
                                <li>How to work with React, using components and handling states</li>
                                <li>How to design backend components such as the database and unit tests</li>
                            </ul>
                            <strong>What Can We Do Better?</strong>
                            <ul>
                                <li>Better UI/Design</li>
                                <li>Better Commenting on Code</li>
                                <li>More Data on instances</li>
                            </ul>
                            <strong>Peer Reviews</strong>
                            <ul>
                                <li>Helped us stay on task and take responsibility on doing our part every Phase</li>
                            </ul>
                            <strong>What Puzzles Us?</strong>
                            <ul>
                                <li>Creating Unit tests was pretty challenging</li>
                                <li>AWS and Gitlab Pipelines were difficult and troublesome</li>
                            </ul>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px', marginBottom: '20px', fontSize: '25px', fontWeight: 'bold', textDecorationLine: 'underline' }}>Content for Developer Visuals</p>
                        <div className='flex justify-center mt-2 w-full space-x-4 mb-8'>
                            <div className="space-y-4">
                                <div className=' bg-slate-700 p-2 rounded-xl flex justify-center items-center'>
                                    <OrganizationPieChart />
                                </div>
                                <div className=' flex-col rounded-xl bg-white h-20 flex justify-center text-center'>
                                    <h2 className='text-black font-semibold text-xl '>Organizations Bar Chart</h2>
                                    <p className=' text-gray-500 font-light text-xs '>Description: Details the percentage of organizations per organization type.</p>
                                </div>

                                <div className=' bg-yellow-600 p-2 rounded-xl flex justify-center items-center'>
                                    <CitiesHistogram />
                                </div>
                                <div className=' flex-col rounded-xl bg-yellow-600 h-20 flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>City Population Histogram</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the number of cities at a range of populations.</p>
                                </div>
                            </div>
                            <div className=' bg-[#245372] p-2 rounded-xl flex-col flex justify-evenly '>
                                <ScholarshipBarChart />
                                <div className=' flex-col rounded-xl flex justify-center text-center'>
                                    <h2 className='text-white font-semibold text-xl '>Scholarship Amount Bar Graph</h2>
                                    <p className=' text-slate-50 font-light text-xs '>Description: Details the number of scholarship that awarded the same amount.</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ color: 'white', textAlign: 'center', margin: '20px 0', fontSize: '25px', fontWeight: 'bold' }}>
                            Developer Critique
                        </div>
                        <div style={{ margin: '20px', fontSize: '18px', color: 'white' }}>
                            <strong>What Did They Do Well?</strong>
                            <ul>
                                <li>The splash page is very well done!</li>
                                <li>The color scheme is very clean and simple.</li>
                                <li>Technical report was written very thorough.</li>
                            </ul>
                            <strong>How Effective was Their Restful API?</strong>
                            <p>Their rest API routes are very comprehensive, consisting of 3 main branches that can take in queries for each of their models (cities, organizations, and scholarships). Their main home rest API route isn't empty, instead returning a web component that serves as a guide for the user and helps them get around their API endpoints, which I find to be very insightful. The home API details where and how to get to the rest of their APIs which makes sense because going to the route "/" is everyone's default.</p>
                            <strong>How Well Did They Implement Your User Stories?</strong>
                            <ul>
                                <li>They always did a great job implementing our user stories.</li>
                                <li>They were also very communicative when it came to any problems with our user stories.</li>
                            </ul>
                            <strong>What Did We Learn from Their Website?</strong>
                            <p>We learned how low income students in the k-12 range could look for different ways of support through scholarships and support groups.</p>
                            <strong>What Can They Do Better?</strong>
                            <ul>
                                <li>Include more interactive media in scholarship instances.</li>
                                <li>Links to other instances could be displayed more effectively with improved visual design.</li>
                            </ul>
                            <strong>What Puzzles Us About Their Website?</strong>
                            <p>What puzzles us is how exactly do each one of these organizations help/what do they provide to students.</p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                    <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Content not found</p>
                    </div>
                );
        }
    };



    return (
        <div>
            <NavBar />
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                sx={{
                    '.MuiTab-root': { fontWeight: 'bold', color: 'white', textShadow: '1px 1px black' },
                }}
            >
                <Tab label="Our Visuals" />
                <Tab label="Developer Visuals" />
            </Tabs>
            {renderTabContent()}
        </div>
    );
};

export default VisualsPage;
