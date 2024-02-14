import axios from 'axios';
import Image from "next/image";
import styles from '../styles/AboutUs.module.css'
import { useState, useEffect } from 'react';
import NavBar from './NavBar'; // Import the NavBar component from index.js

const defaultImageUrl = '/images/default.jpg';

// Constant that contains all of the team members info 
let teamMembers = [
    {
        id: 1,
        name: 'Samuel Osibamowo',
        role: 'Full Stack Engineer',
        imageUrl: "/samuel-headshot.jpeg",
        bio: 'I am a Junior Computer Science Major and getting a minor in Buisness. Samuel loves coding! In my free time, I enjoy drawing and skateboarding',
        commits: 50,
        issues: 10,
        tests: 0,
        gitLabName: 'Samuel Osibamowo',
        username: 'SamuelOsibamowo',
    },
    {
        id: 2,
        name: 'Chuma Anigbogu',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'I am a Junior CS student with a minor in Informatics. In my free time, I enjoy playing basketball, lsitening to music and hanging out with friends.',
        commits: 0,
        issues: 10,
        tests: 0,
        gitLabName: 'chumaanigbogu',
        username: 'chumaanigbogu',
    },
    {
        id: 3,
        name: 'Derek Chen',
        role: 'Back End Engineer',
        imageUrl: "/1704181702021.jpg",
        bio: 'I am a Junior computer science major with a minor in business. In my free time I develop mods for Minecraft and video edit ',
        commits: 50,
        issues: 10,
        tests: 5,
        gitLabName: 'Derek Chen',
        username: 'derex1987',
    },
    {
        id: 4,
        name: 'Alex Jimenez',
        role: 'Front End  Engineer',
        imageUrl: "/IMG_4719.jpg",
        bio: 'I am a Junior Computer Science Major with a minor in Buisness. In my free time I like to watch and play sports with my friends as well as grill.  ',
        commits: 50,
        issues: 10,
        tests: 0,
        gitLabName :'AlexJimenez12',
        username: 'ajimenez1173',
    },
    {
        id: 5,
        name: 'Akhilesh Bitla',
        role: 'Fulll Stack Engineer',
        imageUrl: "/akhil.jpeg",
        bio: 'I am a Sophomore pursuing CS and Entrepreneurship. In my free time, I love to work out and try new food!',
        commits: 50,
        issues: 10,
        tests: 0,
        gitLabName: 'akhilbz',
        username: 'akhilb04',
    },
];

// Constant that contains all of the tools used 
const tools = [
    {
        id: 1,
        name: 'Zoom',
        imageUrl: '/zoomLogo.png',
        description: 'Was utilized to communicate with other group memebers live',
    },
    {
        id: 2,
        name: 'Next.js',
        imageUrl: '/nextjsLogo.webp',
        description: 'Used to build the frontend of the website',
    },
    {
        id: 3,
        name: 'VSCode',
        imageUrl: '/vscodeLogo.png',
        description: 'Our Integrated Development Environment of choice',
    },
    {
        id: 4,
        name: 'Post Man',
        imageUrl: '/postmanLogo.png',
        description: 'Used for API Documentation',
    },
    {
        id: 5,
        name: 'Name Cheap',
        imageUrl: '/nameCheapLogo.jpg',
        description: 'Used to obtain our URL',
    },
    {
        id: 6,
        name: 'GitLab',
        imageUrl: '/gitLabLogo.png',
        description: 'Used for source control',
    },
    {
        id: 7,
        name: 'AWS',
        imageUrl: '/awsLogo.jpg',
        description: 'Used to host our website',
    },
]

// Constant that contains the links to the data sources used
const dataSources = [
    {
        id: 1,
        name: 'Data Source 1',
        link: 'https://apnews.com/hub/russia-ukraine',
    },
    {
        id: 2,
        name: 'Data Source 2',
        link: 'https://www.redcross.org/about-us/news-and-events/news/2022/voices-of-ukraine-refugees-tell-their-stories.html',
    },
    {
        id: 3,
        name: 'Data Source 3',
        link: 'https://www.weho.org/services/human-services/resources-for-ukrainian-refugees',
    },
]

// Contsant that holds the GitLap Repo and API Documentation
const documentation = [
    {
        id: 1,
        name: 'GitLab Repo',
        link: 'https://gitlab.com/ajimenez1173/cs373-group-6',
    },
    {
        id: 2,
        name: 'API Documentation',
        link: 'https://documenter.getpostman.com/view/32956503/2sA2r53kYq',

    }
]

export default function AboutUs() {
    const [teamMembersState, setTeamMembersState] = useState(teamMembers);
    const [totalCommits, setTotalCommits] = useState(0);
    const [totalClosedIssues, setTotalClosedIssues] = useState(0);


    useEffect(() => {
        const fetchAndUpdateData = async () => {
            // Fetch commits and issues from GitLab API
            // Update the state of teamMembersState with new data
            const projectId = process.env.NEXT_PUBLIC_GITLAB_PROJECT_ID;
            const gitLabToken = process.env.NEXT_PUBLIC_GITLAB_API_TOKEN;

            try {
                // Fetch commits data
                const contributorsResponse = await axios.get(
                    `https://gitlab.com/api/v4/projects/${projectId}/repository/contributors`, {
                        headers: {
                            'PRIVATE-TOKEN': gitLabToken,
                        },
                    }
                );
                const contributorRes = contributorsResponse.data;
                const commitsCount = contributorRes.reduce((acc, contributor) => acc + contributor.commits, 0);
                setTotalCommits(commitsCount);
                console.log('COMMITS: ', contributorRes);

                // Fetch issues data
                const issuesResponse = await axios.get(
                    `https://gitlab.com/api/v4/projects/${projectId}/issues`, {
                        headers: {
                            'PRIVATE-TOKEN': gitLabToken,
                        },
                    }
                );
                const issueRes = issuesResponse.data;


                const closedIssuesResponse = await axios.get(
                    `https://gitlab.com/api/v4/projects/${projectId}/issues?state=closed`, {
                        headers: {
                            'PRIVATE-TOKEN': gitLabToken,
                        },
                    }
                );

                const closedIssuesCount = closedIssuesResponse.data.length;
                setTotalClosedIssues(closedIssuesCount);
                
                console.log('ISSUES: ', issueRes);
                
                const updatedTeamMembers = teamMembers.map(member => {
                    // Logic to update each member's commits and issues based on the fetched data
                    // This is an example and needs to be adapted
                    let commits = 0;
                    // He had two commits on a different gitlab account, so we just add it manually here
                    if (member.gitLabName == 'AlexJimenez12') {
                        commits = 2;
                    }
                    commits += contributorRes.find(contributor => contributor.name === member.gitLabName)?.commits || member.commits;
                    const issues = issueRes.filter(issue => issue.assignee && issue.assignee.username === member.username).length;
                    
                    return { ...member, commits, issues };
                });

                setTeamMembersState(updatedTeamMembers);
            } catch (error) {
                console.error('Error fetching data from GitLab:', error);
            }
        };

        fetchAndUpdateData();
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <div>
            {/* Render the NavBar component */}
            <NavBar />
            {/* Main content */}
            <main>
                <div className={styles.main}>

                    <div className={styles.contentWrapper}>

                        <div className={styles.ourCauseContianer}>
                            <h1 className={styles.ourCauseHeader}>About Our Cause</h1>
                            <p className={styles.ourCauseText}>
                                Our site is dedicated to raising awareness among those affected by the ongoing situation in Ukraine. We aim to provide our users with the opportunity to explore stories of the numerous refugees, discover resources and support groups that raise awareness or funds for the cause, and keep you updated on the current events unfolding in Ukraine.
                            </p>
                        </div>

                        <div className={styles.documentationLinksContainer}>
                            {documentation.map(doc => (
                                <div key={doc.id} className={styles.documentationLinkBox}>
                                    <a href={doc.link} target="_blank" rel="noopener noreferrer" className={styles.documentationLink}>
                                        {doc.name}
                                    </a>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* This code is repeated on this about us page, it prints all of the information and images on the site in boxes  */}
                    <h1 className={styles.h1Style}>Team</h1>
                    <div className={styles.teamContainer}>
                        {teamMembersState.map(member => (
                            <div key={member.id} className={styles.memberCard}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={member.imageUrl || defaultImageUrl}
                                        alt={member.name}
                                        layout="fill"
                                        className={styles.memberImage}

                                    />
                                </div>

                                <div className={styles.memberName}>
                                    <h2>{member.name}</h2>
                                </div>

                                <p>{member.role}</p>

                                <div className={styles.memberBio}>
                                    <p>{member.bio}</p>
                                </div>

                                <div className={styles.statsContainer}>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{member.commits}</span>
                                        <span className={styles.statLabel}>Commits</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{member.issues}</span>
                                        <span className={styles.statLabel}>Issues</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>{member.tests}</span>
                                        <span className={styles.statLabel}>Tests</span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    
                    <div>
                        <p>Total Issues: {totalClosedIssues}</p>
                        <p>Total Commits: {totalCommits}</p>
                    </div>


                    <h1 className={styles.h1Style}>Tools</h1>
                    <div className={styles.toolContainer}>
                        {tools.map(tool => (
                            <div key={tool.id} className={styles.toolCard}>

                                <div className={styles.toolCardImageContainer}>
                                    <Image
                                        src={tool.imageUrl || defaultImageUrl}
                                        alt={tool.name}
                                        layout="fill"
                                        className={styles.toolCardImage}

                                    />
                                </div>

                                <div className={styles.toolCardName}>
                                    <h2>{tool.name}</h2>
                                </div>

                                <div className={styles.toolCardDescription}>
                                    <p>{tool.description}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                    <h1 className={styles.h1Style}>Data Sources</h1>
                    <div className={styles.dataSourceContainer}>
                        {dataSources.map(dataSource => (
                            <div key={dataSource.id} className={styles.dataSource}>

                                <div className={styles.dataSourceName}>
                                    <a href={dataSource.link}>
                                        {dataSource.name}
                                    </a>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
