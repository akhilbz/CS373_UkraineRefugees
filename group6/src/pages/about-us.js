import Image from "next/image";
import styles from '../styles/AboutUs.module.css' 
import { useState, useEffect } from 'react';


const defaultImageUrl = '/images/default.jpg'; 

// Constant that contais all of the team members info 
const teamMembers = [
    {
        id: 1,
        name: 'Samuel Osibamowo',
        role: 'Full Stack Engineer',
        imageUrl: "/samuel-headshot.jpeg",
        bio: 'I am a Junior Computer Science Major and getting a minor in Buisness. Samuel loves coding! In my free time, I enjoy drawing and skateboarding',
        commits: 50,
        issues: 10,
        tests: 5,
    },
    {
        id: 2,
        name: 'Chuma Anigbogu',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'I am a Junior CS student with a minor in Informatics. In my free time, I enjoy playing basketball, lsitening to music and hanging out with friends.',
        commits: 50,
        issues: 10,
        tests: 5,
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
    },
    {
        id: 4,
        name: 'Alex Jimenez',
        role: 'Front End  Engineer',
        imageUrl: "/IMG_4719.jpg",
        bio: 'I am a Junior Computer Science Major with a minor in Buisness. In my free time I like to watch and play sports with my friends as well as grill.  ',
        commits: 50,
        issues: 10,
        tests: 5,
    },
    {
        id: 5,
        name: 'Akhilesh Bitla',
        role: 'Fulll Stack Engineer',
        imageUrl: "/akhil.jpeg",
        bio: 'I am a Sophomore pursuing CS and Entrepreneurship. In my free time, I love to work out and try new food!',
        commits: 50,
        issues: 10,
        tests: 5,
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
        name: 'Name Cheap' ,
        imageUrl: '/nameCheapLogo.jpg',
        description: 'Used to obtain our URL',
    },
    {
        id: 6,
        name: 'GitLab' ,
        imageUrl: '/gitLabLogo.png',
        description: 'Used for source control',
    },
     {
        id: 7,
        name: 'AWS' ,
        imageUrl: '/awsLogo.jpg',
        description: 'Used to host our website',
    },
]

// Constant that contains the links to the data sources used
const dataSources = [
    {
        id: 1,
        name: 'Data Source 1',
        link: 'https://ai4good.org/ukraine/?gclid=CjwKCAiAiP2tBhBXEiwACslfnl-QIOpelN28AWGerGv1LyYcssKRzfTYCJCi0hNm9G7pXWgAmgaRvhoCtIMQAvD_BwE',
    },
    {
        id: 2,
        name: 'Data Source 2',
        link: 'https://ai4good.org/ukraine/?gclid=CjwKCAiAiP2tBhBXEiwACslfnl-QIOpelN28AWGerGv1LyYcssKRzfTYCJCi0hNm9G7pXWgAmgaRvhoCtIMQAvD_BwE',
    },
     {
        id: 3,
        name: 'Data Source 3',
        link: 'https://ai4good.org/ukraine/?gclid=CjwKCAiAiP2tBhBXEiwACslfnl-QIOpelN28AWGerGv1LyYcssKRzfTYCJCi0hNm9G7pXWgAmgaRvhoCtIMQAvD_BwE',
    },
]

// Contsant that holds the GitLap Repo and API Documentation
const documentation = [
    {
        id: 1,
        name : 'GitLab Repo',
        link : 'https://gitlab.com/ajimenez1173/cs373-group-6',
    },
    {
        id: 2,
        name: 'API Documentation',
        link : 'https://gitlab.com/ajimenez1173/cs373-group-6',

    }
]




// Tools Used: Zoom, Post Man, Next.Js, VS Code, AWS, GitLapApi, Name Cheap, GitLab

export default function AboutUs() {
    const [teamMembersState, setTeamMembersState] = useState(teamMembers);

    useEffect(() => {
        const fetchAndUpdateData = async () => {
          // Fetch commits and issues from GitLab API
          // Update the state of teamMembersState with new data
        };
    
        fetchAndUpdateData();
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <main className={styles.main}>
            
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
                {teamMembers.map(member => (
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


            <h1 className={styles.h1Style}>Tools</h1>
            <div className={styles.toolContainer}>
                {tools.map(tool =>(
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
                {dataSources.map(dataSource =>(
                    <div key={dataSource.id} className={styles.dataSource}>
                        
                        <div className={styles.dataSourceName}> 
                            <a href={dataSource.link}>
                                {dataSource.name}
                            </a>
                        </div>

                    </div>
                ))}
            </div>
        
        </main>


        
        
        
        
        
        
        
    );
}

