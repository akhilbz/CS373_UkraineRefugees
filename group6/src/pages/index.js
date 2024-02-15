import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRefTestimonials, setNewsMedia, setSupportGroups } from '@/actions';
import Head from 'next/head';
import Script from 'next/script'; // Import next/script
import NavBar from './NavBar'; // Import the NavBar component
import Image from 'next/image'; // Import the Image component
import styles from '../styles/Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
    /* Refugee Testimonial Data */
    const testimonials = [{
        id: 1,
        name: "Tanja",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Long Journey After Leaving Husband Behind",
        caption: "Tanja and her children spent more than 30 hours fleeing Ukraine before arriving to Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/tanja.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `It took Tanja and her children more than 30 hours of grueling travel before they arrived at the Przemysl train station in Poland. 
        The family has another 10-hour journey before they reach Warsaw, Poland. I come from a town called Krivoy Rog in central Ukraine and near my house there is a military base. 
        The other night they were bombing constantly from 4 in the morning to 7. We were afraid so I took the kids and I fled,” she said. 
        “My husband is still there, and I start crying every time I think of that. I am so afraid for the children and the men left behind fighting in Ukraine. 
        I just want to go home; I want to go home as soon as possible. I do not want to travel to other European countries, because I want to stay close, as soon as I can go home, 
        I will,” she said.`,
        location: [52.2297, 21.0122] // latitude and longitude
    },
    {   
        id: 2,
        name: "Pendura",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Headed to Spain",
        caption: "Pendura, her daughter and grandson are headed to Spain after leaving everything behind in Ukraine.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/pendura.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Pendura, her daughter Larysa and her grandson Alexander, one year and seven months old, left their village just outside of Kyiv a few days ago. 
        While they wait in the mother and child friendly space at the train station in Lviv, Ukraine, she says that she’s left behind two sons in Kyiv who are fighting.
        During a time in her childhood, Larysa lived in Spain with a host family. When the fighting broke out, the family reached out via social media, inviting her to come stay with them in Spain. 
        While the family waits for a bus to take them there, they worry about their loved ones at home.`,
        location: [40.4168, 3.7038] // latitude and longitude 
    },
    {
        id: 3,
        name: "Alina",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Trauma of War",
        caption: "Alina and her daughter fled from their neighborhood after heavy bombing in the area.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/erica.jpeg.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `You can see the terror in Erika’s eyes when she talks about her traumatic experience in Ukraine. She says that when the bombing started, she was home with friends. 
        Since that time, it has been a nightmare. “We spent five days in the bombing shelter. I thought that it would never end. I don’t want to go back. In a few hours, I will take the bus to the Netherlands. 
        The Netherlands is a safe haven,” she said while struggling to manage her emotions and feelings. Alina, Erika’s mother, is optimistic that very soon Ukrainians will be able to return home to Ukraine.
        “We are a strong nation. We will win this war and peace is very close. I will visit Netherlands and very soon I will return to my beloved Ukraine,” Erika said.`,
        location: [52.1326, 5.2913] // latitude and longitude
    },
    {
        id: 4,
        name: "Francis",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Foreign Students Flee Ukraine",
        caption: "Francis and Frank, both students, left Ukraine when the conflict started.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/francis.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Francis from Nigeria and Frank from Cameroon recently talked to a Red Cross worker in Hungary. Both were students in Ukraine when violence erupted. 
        They were among the more than three million people who fled the country. 
        “The Red Cross has been very generous, they offered us food and tea, and helped make food for my baby,” Francis said.`,
        location: [47.1625, 19.5033] // latitude and longitude
    },
    {
        id: 5,
        name: "Viktoria",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Victoria from Kyiv",
        caption: "Viktoria and her mother are headed to relatives in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/victoria.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Viktoria and her mother came from Kyiv, Ukraine to Záhony at the Hungary-Ukraine border — a distance of more than 500 miles — with two small puppies in her backpack. 
        She said she could not bear to leave them behind. She and the puppies are now headed to Warsaw, Poland, where they will stay with a cousin.`,
        location: [] // latitude and longitude
    },
    {
        id: 6,
        name: "Magdalena",
        date: "March 16, 2022",
        timeDisplaced: "Time Displaced : 2 years",
        topic: "Welcoming Refugees",
        caption: "Megdalena is handing out toys to children arriving at a train station in Poland.",
        image: 'https://www.redcross.org/content/dam/redcross/about-us/news/2022/toys.jpg.transform/768/q70/feature/image.jpeg',
        testimonial: `Magdalena Michutka Kuras is a paramedic volunteering at the health station at the Przemysl train station in Poland. 
        She’s just received notice that another train from Ukraine has arrived at the station and she’s ready to distribute toys to children who arriving from Ukraine. 
        “It is nice to see how happy they are when they are given a toy,” she says.`,
        location: [52.2297, 21.0122] // latitude and longitude
    }];

      /* News and Media Data */
      const newsReels = [{
        id: 1,
        title: "Russia launches barrage of 45 drones over Ukraine as Kyiv changes more military leaders",
        date: "February 11, 2024",
        publisher: "AP",
        source: "Article",
        location: "Kyiv",
        caption: "Russian forces launched 45 drones over Ukraine in a five-and-a-half-hour barrage Sunday, officials said, as Ukrainian President Volodymyr Zelenskyy continued the reshuffle of his war cabinet as the war enters its third year.",
        image: 'https://dims.apnews.com/dims4/default/957dad5/2147483647/strip/true/crop/8640x5760+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Faa%2F5f%2F2c54e0fa639581dadd6b94b1ee84%2F90b6475c05814c08a48c25dde0384dd6',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strike-cabinet-reshuffle-a8cfc77e01401e448e05c77e37b746c3'
    },
    {
        id: 2,
        title: "Russian drone strike on Kharkiv, Ukraine’s 2nd largest city, kills 7",
        date: "February 10, 2024",
        publisher: "AP",
        source: "Article",
        location: "Kharkiv",
        caption: "A Russian drone strike on Kharkiv, Ukraine’s second largest city, killed seven people overnight, including three children, Kharkiv region governor Oleh Syniehubov reported Saturday. Three others sustained injuries, according to the officials.",
        image: 'https://dims.apnews.com/dims4/default/2641dc1/2147483647/strip/true/crop/6500x3656+0+0/resize/1440x810!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F36%2F7a%2F0319da6a2fd54a0b58378d43c2be%2F790cba8ce40b4a869ee6825bd44f40c9',
        link: 'https://apnews.com/article/russia-ukraine-war-drone-strikes-b5181631189a7a0d069f8ae26848cdcf'
    },
    {
        id: 3,
        title: "Russian Drone Strike Ignites a Fuel Depot, Setting a Neighborhood Ablaze in Ukraine",
        date: "February 10, 2024",
        publisher: "The New York Times",
        source: "Article",
        location: "Kharkiv",
        caption: "Seven people from two families died in the inferno in Kharkiv on Friday night, as burning oil flowed like lava. “People were doomed,” an official said.",
        image: 'https://static01.nyt.com/images/2024/02/10/multimedia/10ukraine-strike-interior-tmfk/10ukraine-strike-interior-tmfk-superJumbo.jpg?quality=75&auto=webp',
        link: 'https://www.nytimes.com/2024/02/10/world/russia-drone-strike-kharkiv-ukraine.html'
    },
    {
        id: 4,
        title: "Two years of war: Ukrainian refugees face lasting exile",
        date: "February 12, 2024",
        publisher: "yahoo!news",
        source: "Article",
        location: "Ukraine",
        caption: "Iryna, Maryna, Katya -- three generations from one family -- fled their home in southern Ukraine just after the war started, hoping to return quickly.",
        image: 'https://s.yimg.com/ny/api/res/1.2/Co4p1BpA3TXMc857X_HIOw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/afp.co.uk/0bd404b3aa3a0a4d4eca67c9242bd099',
        link: 'https://uk.news.yahoo.com/two-years-war-ukrainian-refugees-061851366.html?guccounter=1'
    },
    {
        id: 5,
        title: "What do Ukrainian refugees make of Israel’s war on Gaza?",
        date: "February 2, 2024",
        publisher: "Aljazeera",
        source: "Article",
        location: "Ukraine",
        caption: "Civilians have been bombed, killed and injured in their thousands. Infrastructure has been shelled – and millions displaced. Today, these images of conflict evoke Gaza, but 120 days ago were more associated with Ukraine following the Russian invasion of the former Soviet republic in February 2022.",
        image: 'https://www.aljazeera.com/wp-content/uploads/2024/02/Olena-1706867436.jpg?resize=770%2C513&quality=80',
        link: 'https://www.aljazeera.com/news/2024/2/2/ukrainian-refugees-divided-on-israels-war-on-gaza-but-feel-for-civilians'
    },
    {
      id: 6,
      title: "What do Ukrainian refugees make of Israel’s war on Gaza?",
      date: "February 2, 2024",
      publisher: "Aljazeera",
      source: "Article",
      location: "Ukraine",
      caption: "Civilians have been bombed, killed and injured in their thousands. Infrastructure has been shelled – and millions displaced. Today, these images of conflict evoke Gaza, but 120 days ago were more associated with Ukraine following the Russian invasion of the former Soviet republic in February 2022.",
      image: 'https://www.aljazeera.com/wp-content/uploads/2024/02/Olena-1706867436.jpg?resize=770%2C513&quality=80',
      link: 'https://www.aljazeera.com/news/2024/2/2/ukrainian-refugees-divided-on-israels-war-on-gaza-but-feel-for-civilians'
  }]

    /* Support Groups Data */
    const support_groups = [{
      id: 1,
      organization: "Airlink",
      status: "active",
      year: "2022",
      caption: `Airlink is a rapid-response humanitarian relief organization that connects airlines and pre-qualified nonprofits to help communities in crisis.`,
      about: `Airlink is a rapid-response humanitarian relief organization that connects airlines and pre-qualified nonprofits to help communities in crisis. 
      Airlink has supported the transportation of 5 assessment and emergency response teams to Poland, Romania and Moldova, with more on their way. 
      They are currently working with humanitarian, logistics, and airline partners to send relief supplies.`,
      link: 'https://airlinkflight.org/responses/ukraine/',
      resources: ['https://airlinkflight.org/help-ukraine/', 'https://airlinkflight.org/get-involved/ways-to-give/miles/'],
      youtube: 'https://www.youtube.com/embed/Asr-EWQ_IGQ?si=CH6qbyakPU1YhOQz',
      picture: 'https://www.adra.ua/wp-content/uploads/2023/03/airlink.jpg',
      location: 'Washington DC',
      contact: '+1 (202) 375-3434'

    },
      {
        id: 2,
        organization: "CARE",
        status: "active",
        year: "2022",
        caption: `CARE works around the globe to save lives, defeat poverty and achieve social justice.`,
        about: `CARE works around the globe to save lives, defeat poverty and achieve social justice. 
      CARE has launched a humanitarian appeal to support the most vulnerable Ukrainians, particularly women-headed households and the elderly. 
      Emergency gifts support CARE’s Ukraine Crisis Fund to reach 4 million with immediate aid and recovery, food, water, hygiene kits, 
      psychosocial support, and cash assistance — prioritizing women and girls, families, and the elderly.`,
        link: 'https://www.care.org/our-work/where-we-work/ukraine/',
        resources: ['https://my.care.org/site/Donation2?df_id=31067&mfc_pref=T&31067.donation=form1&s_src=172220UCF000&_ga=2.30464188.2031879431.1646163164-1963073507.1646163164', 'https://www.airbnb.org/help-ukraine'],
        youtube: 'https://www.youtube.com/embed/OICJBJgWT20?si=NVA3bX7ld0GAJFrX',
        picture: 'https://www.care.org/wp-content/uploads/2021/01/primary_logo_horizontal_min.svg',
        location: 'Atlanta, GA',
        contact: '1-800-422-7385',
      },
      {
        id: 3,
        organization: "Direct Relief",
        status: "active",
        year: "2024",
        caption: `A Santa Barbara-based organization that works to equip health professionals in resource-poor communities to meet the challenges of caring for people in need.`,
        about: `A Santa Barbara-based organization that works to equip health professionals in resource-poor communities to meet the challenges of caring for people in need. 
      Direct Relief received a list from the Ukrainian Ministry of Health of needed items, such as medications and mobile medical outreach packs with CAT-style tourniquets and bandages. 
      Direct Relief has also received information indicating a dire need for tranexamic acid, which is used to control severe bleeding by blocking the breakdown of blood clots. 
      They recently sent a large shipment of diabetic supplies and they are offering Ukrainian partners IV fluids, antibiotics, medications for anesthesia, sutures, and cardiovascular medication.`,
        link: 'https://www.directrelief.org/',
        resources: ['https://secure.directrelief.org/site/Donation2?df_id=2924&mfc_pref=T&2924.donation=form1', 'https://www.directrelief.org/get-involved/donate-crypto/',
          'https://www.weho.org/services/human-services/resources-for-ukrainian-refugees#:~:text=visit%20their%20website-,here,-.'],
        youtube: 'https://www.youtube.com/embed/MzPBYv1hG34?si=TDOvSEOpdD-BXhf9',
        picture: 'https://mma.prnewswire.com/media/1018033/Direct_Relief_Logo.jpg?p=facebook',
        location: 'Global',
        contact: '1-805-964-4767'
      },
      {
        id: 4,
        organization: "Doctors without Borders",
        status: "active",
        year: "2024",
        caption: `Doctors Without Borders/Médecins Sans Frontières is an independent, global nonprofit organization providing medical aid where it’s needed most.`,
        about: `Doctors Without Borders/Médecins Sans Frontières is an independent, global nonprofit organization providing medical aid where it’s needed most. 
      Emergency teams have arrived at the Polish-Ukrainian border and are currently trying to get essential staff and supplies into Ukraine. 
      They are working to set up emergency response activities and dispatching teams to Poland, Moldova, Hungary, Romania, and Slovakia.`,
        link: 'https://www.doctorswithoutborders.org/',
        resources: ['https://donate.doctorswithoutborders.org/secure/donate?_ga=2.127093709.1983195640.1646178330-1517370144.1646178330'],
        youtube: 'https://www.youtube.com/embed/f0dY7qazyQE?si=LTwd-cVBFMikmxF1',
        picture: 'https://www.doctorswithoutborders.org/themes/custom/msf/meta_image.png',
        location: "Geneva, Switzerland",
        contact: '212.679.6800'
      },
      {
        id: 5,
        organization: "Global Empowerment Mission",
        status: "active",
        year: "2022",
        caption: `Global Empowerment Mission (GEM) is a nonprofit organization founded as a first responder to global disasters.`,
        about: `Global Empowerment Mission (GEM) is a nonprofit organization founded as a first responder to global disasters. 
      GEM has established a welcome center in Medyka, Poland on the Ukraine border. The Welcome Center will serve as a relocation and aid center. 
      Ukrainian evacuees can choose a country where they have family or friends that can take them in. 
      Donations will assist in relocating thousands of women and children throughout Europe and funds will be used for booking and paying for immediate transportation.`,
        link: 'https://www.globalempowermentmission.org/mission/ukraine-crisis/',
        resources: ['https://globalempowermentmission.kindful.com/?campaign=1182522'],
        youtube: 'https://www.youtube.com/embed/xFxDpPJZbSo?si=APg-Iwxe6-931IJP',
        picture: 'https://www.globalempowermentmission.org/wp-content/uploads/2020/08/gem-logo-social.jpg',
        location: 'Doral, Florida',
        contact: '(800) 995-7604'
      },
      {
        id: 6,
        organization: "GlobalGiving",
        status: "active",
        year: "2022",
        caption: `GlobalGiving is a nonprofit that supports other nonprofits by connecting them to donors.`,
        about: `GlobalGiving is a nonprofit that supports other nonprofits by connecting them to donors. 
      All donations to the Ukraine Crisis Relief Fund will support humanitarian assistance in impacted communities in Ukraine and surrounding regions where Ukrainian refugees have fled. 
      GlobalGiving's nonprofit partners are providing shelter, food, clean water, psychosocial support, and economic assistance to displaced communities.`,
        link: 'https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/',
        resources: ['https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/'],
        youtube: 'https://www.youtube.com/embed/Sic0rsdnglY?si=p7sD5eFMaDCmRJV3',
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hX98ipa3t9IA3VzudSwcyYMXsIzFGSXnff2_TLFDd2u1zCdDry0jEBOHCxwhcSTewUU&usqp=CAU',
        location: 'Washington, D.C., United States',
        contact: '+1-202-232-5784'

  }];

  useEffect(() => {
    // Load Twitter widget script when component mounts
    dispatch(setRefTestimonials(testimonials));
    dispatch(setNewsMedia(newsReels));
    dispatch(setSupportGroups(support_groups));
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
          {/* Container to hold all tweets */}
          <div className={styles.tweetContainer}>
            {/* Embed the timeline for @The Study of War */}
            <a className="twitter-timeline" data-lang="en" data-width="400" data-height="800" href="https://twitter.com/TheStudyofWar?ref_src=twsrc%5Etfw">Tweets by TheStudyofWar</a>
            {/* Embed the second tweet */}
            <blockquote className="twitter-tweet" data-width="300">
              <p lang="en" dir="ltr">President Zelensky announces the firing of Ukraine's top general, the country's biggest military shake-up since Russia's full-scale invasion began<a href="https://t.co/gxVlF14wby">https://t.co/gxVlF14wby</a></p>
              <a href="https://twitter.com/cnnbrk/status/1755634610803818853?ref_src=twsrc%5Etfw">February 8, 2024</a>
            </blockquote>
            {/* Embed the timeline for @ikhurshudyan */}
            <a className="twitter-timeline" data-lang="en" data-width="400" data-height="800" href="https://twitter.com/ikhurshudyan?ref_src=twsrc%5Etfw">Tweets by ikhurshudyan</a>
          </div>
        </div>
        {/* Home Screen */}
      </main>
      {/* Load Twitter widget script using next/script */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" charSet="utf-8" />
    </div>
  );
}