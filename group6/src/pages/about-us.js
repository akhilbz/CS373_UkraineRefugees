import Image from "next/image";
import styles from '../styles/AboutUs.module.css' // Assuming you are using CSS Modules

const defaultImageUrl = '/images/default.jpg'; // Make sure this default image exists

const teamMembers = [
    {
        id: 1,
        name: 'Samuel Osibamowo',
        role: 'Full Stack Engineer',
        imageUrl: "/samuel-headshot.jpeg",
        bio: ' Samuel is a Junior Computer Science Major and getting a minor in Buisness. Samuel loves coding! In his free time, he enjoys drawing, skateboarding and hanginbg out with friends. ',
    },
    {
        id: 2,
        name: 'Chuma Anigbogu',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'Chuma loves to go outside!',
    },
    {
        id: 3,
        name: 'Derek Chen',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'Derek ',
    },
    {
        id: 4,
        name: 'Alex Jimenez',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'Alex ',
    },
    {
        id: 5,
        name: 'Akhilesh Bitla',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'Akhilesh ',
    },
    ];

export default function AboutUs() {
    return (
        <main className={styles.main}>
        <h1>About Us</h1>
        <div className={styles.teamContainer}>
            {teamMembers.map(member => (
                <div key={member.id} className={styles.memberCard}>
                    <div className={styles.imageContainer}>
                    <Image
                        src={member.imageUrl || defaultImageUrl}
                        alt={member.name}
                        layout="fill"
                        className={styles.memberImage}
                        // Remove objectFit and objectPosition as they are no longer needed
                    />
                    </div>
                    <h2>{member.name}</h2>
                    <p>{member.role}</p>
                    <p>{member.bio}</p>
                </div>
            ))}
        </div>
        </main>
    );
}