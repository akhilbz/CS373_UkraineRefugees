import NavBar from './NavBar'; // Import the NavBar component
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <NavBar /> {/* Render the NavBar component */}
      {/* Home Screen */}
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${styles.mainContent}`}>
        <div className={styles.mainContent}>
          <h1>Ukraine Refugee</h1>
          <p>
            The ongoing situation in Ukraine has led to a humanitarian crisis, with many individuals displaced and in need of assistance. Our group is dedicated to promoting resources and aid to those affected by the crisis. Together, we strive to provide support and raise awareness for the Ukraine refugee community.
          </p>
          <p className={styles.italic}>"United in solidarity, we can make a difference."</p>
        </div>
        {/* Home Screen */}
      </main>
    </div>
  );
}
