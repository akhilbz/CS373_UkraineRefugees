import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script'; // Import next/script
import NavBar from './NavBar'; // Import the NavBar component
import Image from 'next/image'; // Import the Image component
import styles from '../styles/Home.module.css';

export default function Home() {
  useEffect(() => {
    // Load Twitter widget script when component mounts
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charSet = 'utf-8';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <NavBar /> {/* Render the NavBar component */}
      {/* Home Screen */}
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${styles.mainContent}`}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Ukraine Crisis</h1>
          <div className={styles.imageContainer}>
            {/* Ukraine picture */}
            <div className={styles.imageWrapper}>
              <Image src="/Ukraine-Picture.jpeg" alt="Ukraine Picture" width={900} height={600} />
            </div>
          </div>
          <p className={`${styles.paragraph} ${styles.italic}`}>
            The conflict between Russia and Ukraine, particularly in Eastern Ukraine, has a complex history that predates 2020. Tensions escalated significantly in 2014 when Russia annexed Crimea, a region of Ukraine, following a controversial referendum. This move was widely condemned by the international community and sparked a protracted conflict between Ukrainian government forces and pro-Russian separatists in Eastern Ukraine.
            <br />
            <br />
            Russia's involvement in the conflict has played a crucial role in its escalation and continuation. Despite officially denying direct involvement, Russia has been accused by Ukraine and Western countries of providing military support, weapons, and personnel to the separatist forces. This support, including training, funding, and logistical assistance, has enabled the separatists to sustain their fight against Ukrainian government forces.
            <br />
            <br />
            The consequences of the conflict have been devastating for the people of Ukraine, with widespread displacement, loss of life, and humanitarian crises. Civilians in conflict-affected areas endure violence, insecurity, and limited access to essential services. Furthermore, the conflict has strained relations between Russia and Western countries, resulting in economic sanctions, diplomatic tensions, and ongoing efforts to seek a diplomatic resolution.
            <br />
            <br />
            Our group is deeply committed to advocating for a peaceful resolution and supporting those affected by the conflict.
          </p>
          <p className={styles.italic}>"United in solidarity, we can make a difference."</p>
          {/* Container to hold all tweets side by side */}
          <div className={styles.tweetContainer}>
            {/* Embed the first tweet */}
            <blockquote className="twitter-tweet" data-width="300">
              <p lang="en" dir="ltr">NEW from <a href="https://twitter.com/KarolinaAHird?ref_src=twsrc%5Etfw">@KarolinaAHird</a>: Russia seeks to persuade Ukraine &amp; its supporters that its control of occupied Ukrainian territory is irreversible.<br /><br />The Kremlin is using the same playbook in the lands Russia has taken since Feb 24, 2022, that it’s used in Crimea and Donbas since 2014.⬇️ <a href="https://t.co/qBE1b8BBgZ">pic.twitter.com/qBE1b8BBgZ</a>
              </p>
              <a href="https://twitter.com/TheStudyofWar/status/1755962302258446634?ref_src=twsrc%5Etfw">February 9, 2024</a>
            </blockquote>
            {/* Embed the second tweet */}
            <blockquote className="twitter-tweet" data-width="300">
              <p lang="en" dir="ltr">President Zelensky announces the firing of Ukraine's top general, the country's biggest military shake-up since Russia's full-scale invasion began<a href="https://t.co/gxVlF14wby">https://t.co/gxVlF14wby</a></p>
              <a href="https://twitter.com/cnnbrk/status/1755634610803818853?ref_src=twsrc%5Etfw">February 8, 2024</a>
            </blockquote>
            {/* Embed the third tweet*/}
            <blockquote className="twitter-tweet" data-width="300">
              <p lang="en" dir="ltr">More than 120,000 Ukrainian refugees have left the country since Russia began its attack, UN refugee agency says. <a href="https://t.co/JBxkXnOGgO">https://t.co/JBxkXnOGgO</a></p>
              <a href="https://twitter.com/NBCNews/status/1497524065392906242?ref_src=twsrc%5Etfw">February 26, 2022</a>
            </blockquote>
          </div>
        </div>
        {/* Home Screen */}
      </main>
      {/* Load Twitter widget script using next/script */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" charSet="utf-8" />
    </div>
  );
}
