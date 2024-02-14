import NavBar from './NavBar'; 
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSupportGroups } from '@/actions';
import Grid from '@mui/material/Grid'; 
import Card from '@mui/material/Card';
import SupportCard from '@/components/SupportCard';

export default function RefugeeTestimonials() {
    const dispatch = useDispatch();
    const support_groups = [{
        id: 1,
        organization: "Airlink",
        status: "active",
        year: "2024",
        caption: `Airlink is a rapid-response humanitarian relief organization that connects airlines and pre-qualified nonprofits to help communities in crisis.`,
        about: `Airlink is a rapid-response humanitarian relief organization that connects airlines and pre-qualified nonprofits to help communities in crisis. 
        Airlink has supported the transportation of 5 assessment and emergency response teams to Poland, Romania and Moldova, with more on their way. 
        They are currently working with humanitarian, logistics, and airline partners to send relief supplies.`,
        link: 'https://airlinkflight.org/responses/ukraine/',
        resources: ['https://airlinkflight.org/help-ukraine/', 'https://airlinkflight.org/get-involved/ways-to-give/miles/']
    },
    {
        id: 2,
        organization: "CARE (Cooperative For Assistance And Relief Everywhere)",
        status: "active",
        year: "2024",
        caption: `CARE works around the globe to save lives, defeat poverty and achieve social justice.`,
        about: `CARE works around the globe to save lives, defeat poverty and achieve social justice. 
        CARE has launched a humanitarian appeal to support the most vulnerable Ukrainians, particularly women-headed households and the elderly. 
        Emergency gifts support CARE’s Ukraine Crisis Fund to reach 4 million with immediate aid and recovery, food, water, hygiene kits, 
        psychosocial support, and cash assistance — prioritizing women and girls, families, and the elderly.`,
        link: 'https://www.care.org/our-work/where-we-work/ukraine/',
        resources: ['https://my.care.org/site/Donation2?df_id=31067&mfc_pref=T&31067.donation=form1&s_src=172220UCF000&_ga=2.30464188.2031879431.1646163164-1963073507.1646163164', 'https://www.airbnb.org/help-ukraine']
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
        'https://www.weho.org/services/human-services/resources-for-ukrainian-refugees#:~:text=visit%20their%20website-,here,-.']
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
        resources: ['https://donate.doctorswithoutborders.org/secure/donate?_ga=2.127093709.1983195640.1646178330-1517370144.1646178330']
    },
    {
        id: 5,
        organization: "Global Empowerment Mission",
        status: "active",
        year: "2024",
        caption: `Global Empowerment Mission (GEM) is a nonprofit organization founded as a first responder to global disasters.`,
        about: `Global Empowerment Mission (GEM) is a nonprofit organization founded as a first responder to global disasters. 
        GEM has established a welcome center in Medyka, Poland on the Ukraine border. The Welcome Center will serve as a relocation and aid center. 
        Ukrainian evacuees can choose a country where they have family or friends that can take them in. 
        Donations will assist in relocating thousands of women and children throughout Europe and funds will be used for booking and paying for immediate transportation.`,
        link: 'https://www.globalempowermentmission.org/mission/ukraine-crisis/',
        resources: ['https://globalempowermentmission.kindful.com/?campaign=1182522']
    },
    {
        id: 6,
        organization: "GlobalGiving",
        status: "active",
        year: "2024",
        caption: `GlobalGiving is a nonprofit that supports other nonprofits by connecting them to donors.`,
        about: `GlobalGiving is a nonprofit that supports other nonprofits by connecting them to donors. 
        All donations to the Ukraine Crisis Relief Fund will support humanitarian assistance in impacted communities in Ukraine and surrounding regions where Ukrainian refugees have fled. 
        GlobalGiving's nonprofit partners are providing shelter, food, clean water, psychosocial support, and economic assistance to displaced communities.`,
        link: 'https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/',
        resources: ['https://www.globalgiving.org/projects/ukraine-crisis-relief-fund/']
    }];

    useEffect(() => {
        dispatch(setSupportGroups(support_groups));
    }, []);
    const supportGroups = useSelector(state => state.supportGroups);

    return (
        <div>
            <NavBar />
            <main>
                <div className="top-7 flex relative items-center w-full"> 
                    <h1 className='text-3xl pt-7 font-medium w-full text-center absolute'>Ukraine Refugee Support Groups</h1> 
                    <h2 className='absolute pt-7 right-3 font-light text-xl'>Total Support Groups: {support_groups.length}</h2> 
                </div>
                <div className=' pt-28 pb-8 flex justify-center w-full'>
                    <div className="flex justify-center items-center">
                        <Grid container spacing={3} className='flex justify-center '>
                            {supportGroups.map(group => (
                                <Grid item xs={6} md={2.5} className='flex justify-center '>
                                    <Card className='rounded-2xl h-[325px] w-[275px]'>
                                        <SupportCard support_groups_data={group}/>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
                
            </main>
        </div>
    );
};