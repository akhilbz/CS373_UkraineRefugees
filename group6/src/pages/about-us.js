import Image from "next/image";
import styles from '../styles/AboutUs.module.css' // Assuming you are using CSS Modules

const defaultImageUrl = '/images/default.jpg'; // Make sure this default image exists

const teamMembers = [
    {
        id: 1,
        name: 'Samuel Osibamowo',
        role: 'Full Stack Engineer',
        imageUrl: "/samuel-headshot.jpeg",
        bio: 'I am a Junior Computer Science Major and getting a minor in Buisness. Samuel loves coding! In my free time, I enjoy drawing and skateboarding'
    },
    {
        id: 2,
        name: 'Chuma Anigbogu',
        role: 'Fulll Stack Engineer',
        imageUrl: "/chuma.jpg",
        bio: 'I am a Junior CS student with a minor in Informatics. In my free time, I enjoy playing basketball, lsitening to music and hanging out with friends.',
    },
    {
        id: 3,
        name: 'Derek Chen',
        role: 'Back End Engineer',
        imageUrl: "/1704181702021.jpg",
        bio: 'I am a Junior computer science major with a minor in business. In my free time I develop mods for Minecraft and video edit ',
    },
    {
        id: 4,
        name: 'Alex Jimenez',
        role: 'Front End  Engineer',
        imageUrl: "/IMG_4719.jpg",
        bio: 'I am a Junior Computer Science Major with a minor in Buisness. In my free time I like to watchPlay sports with my friends as well as grill.  ',
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