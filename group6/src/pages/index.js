import NavBar from './NavBar'; // Import the NavBar component
import Image from 'next/image'; // Import the Image component
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      {/* Home Screen */}
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${styles.mainContent}`}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Ukraine Refugee</h1>
          <div className={styles.imageContainer}>
            {/* Ukraine picture */}
            <div className={styles.imageWrapper}>
              <Image src="/Ukraine-Picture.jpeg" alt="Ukraine Picture" width={900} height={600} />
            </div>
          </div>
          <p className={`${styles.paragraph} ${styles.italic}`}>
            The ongoing situation in Ukraine has led to a humanitarian crisis, with many individuals displaced and in need of assistance. Our group is dedicated to promoting resources and aid to those affected by the crisis. Together, we strive to provide support and raise awareness for the Ukraine refugee community.
          </p>
          <p className={styles.italic}>"United in solidarity, we can make a difference."</p>
        </div>
        {/* Home Screen */}
      </main>
    </div>
  );
}