from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def getInfo():
    groups = []
    finalGroups = []
    dups=[]
    add = True
    instance = 0
    options = webdriver.ChromeOptions()
    # Your options setup remains unchanged
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    pictureLinks = [
    "https://irusa.org/wp-content/uploads/2020/04/news-image.jpg",
    "https://6480645.fs1.hubspotusercontent-na1.net/hubfs/6480645/Imported_Blog_Media/WorldVision-Logo-1.jpg",
    "https://waysidechapel.org/wp-content/uploads/2017/04/Childrens-Hunger-Fund-FINAL-1200x628.jpg",
    "https://worldaffairscouncil.org/wp-content/uploads/2017/10/shelter-box-presentationjuly2010-version-4-1-7281.jpg",
    "https://pbs.twimg.com/profile_images/1610321236592041989/2tNcIxhC_400x400.jpg",
    "https://www.globalgiving.org/pfil/organ/868/orglogo.jpg",
    "https://www.rescue.org/sites/default/files/2022-09/og-image-default.jpeg",
    "https://www.healthynewbornnetwork.org/hnn-content/uploads/SC_USA_Logo_RedBlack_Stacked-003.jpg",
    "https://assets.classy.org/1739162/83b116ee-6173-11ea-96af-0a0f862183bb.jpg",
    "https://d2g8igdw686xgo.cloudfront.net/76563015_17000535801900_r.png",
    "https://thechildrenarewaiting.org/wp-content/uploads/2022/05/ACHI-PrimaryLogo_CMYK_LIGHT-BG.png",
    "https://images.squarespace-cdn.com/content/v1/5c7ae7ce9b7d1579245505d1/bc68df21-0fb2-4fad-b47e-5830ff92fe4e/FMSC-White-RGB.jpg",
    "https://uploads.concordia.net/2018/07/30141013/AC.png",
    "https://seeklogo.com/images/G/globalgiving-logo-32B0289F4E-seeklogo.com.png",
    "https://www.allhandsandhearts.org/wp-content/uploads/2022/04/All-Hands-Hearts_logo_L-type-Purple-V2-3.png",
    "https://good360.org/wp-content/uploads/2020/11/Good360-Logo-500x.jpg",
    "https://iphce.org/wp-content/uploads/2021/04/samaritans-purse.png",
    "https://www.episcopalrelief.org/wp-content/uploads/2019/01/logo.png",
    "https://www.projecthope.org/wp-content/uploads/2018/09/featured-image-rebrand-splash2.png",
    "https://lirp.cdn-website.com/0741528c/dms3rep/multi/opt/HOPEww_Logo_Tagline_Black-Blue_TransparentBckgrd--281-29-1920w.png",
    "https://cdn.www.wesleyan.org/wesleyanit/wp-content/uploads/2022/07/13161734/WHI-16_9-800x450.jpg",
    "https://mcdowell.church/wp-content/uploads/2021/09/MWFB.001.jpeg",
    "https://assets.classy.org/1530825/295c35be-d54f-11ec-9dcf-0e47ba516a91.png",
    "https://d3osv5nby63e7f.cloudfront.net/customers/lifesong/logo_39015.png",
    "https://m25m.org/wp-content/uploads/2015/03/M25M-2017-Logo_WEB.png",
    "https://chambermaster.blob.core.windows.net/images/customers/34/members/1297/logos/MEMBER_PAGE_HEADER/logo.png",
    "https://www.ob.org/wp-content/uploads/2020/07/2020_ob-logoflame-400x300-featured.jpg",
    "https://pbs.twimg.com/media/EnMQZjpXIAAqO5Z.jpg",
    "https://assets-global.website-files.com/58bede11383ef761786b3dc6/5afc927e5faa7134be8921a6_Icon_name_Rside_blue_print_LifeChangers_WHITE-SUBHEADER.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Mercy_Corps_Logo.png",
    "https://cdn.cervistech.com/acts/images/logo/medshare.png",
    "https://cdn.greatnonprofits.org/images/logos/400dpiLogo30.jpg",
    "https://projectcure.org/app/uploads/2020/12/cropped-cropped-PC_Stacked_RedBox_Logo_Color_Web-1.jpeg",
    "https://www.qlik.com/blog/assets/uploads/images/direct-relief.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Handicap_International_Logo_2018.png",
    "https://www.map.org/wp-content/uploads/2022/12/New-MAP-Logo-2022-rgb-1.png",
    "https://images.squarespace-cdn.com/content/v1/63409d0482a14127ed59d9f4/bdb4e0aa-d572-46c6-9ccf-a8b6f5465b70/Untitled+design+%2847%29.png",
    "https://wineindustryadvisor.com/wp-content/uploads/2020/05/world-central-kitchen-logo-vector.png",
    "https://www.ifcj.org/wp-content/uploads/default-social.jpg",
    "https://www.thoughtco.com/thmb/QaORdfDJQ5C7uzGwO5OPyS4ZG2o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-139835605-58e720045f9b58ef7e76b23d-5b5f5c6346e0fb00257b4990.jpg",
    "https://www.doctorswithoutborders.org/themes/custom/msf/meta_image.png",
    "https://www.stjude.org/about-st-jude/faq/whats-alsac/_jcr_content/image.img.800.high.jpg/1454001469576.jpg",
    "https://media2.charityengine.net/WF/_transactionServerFiles/745/2019/5/14/wwp-no-gift-jpg.jpg",
    "https://t2t.org/wp-content/uploads/2014/02/T2T_Color.png",
    "https://cdn.vox-cdn.com/thumbor/iABdwUEdWUMuXvTt4cYoSah0Am8=/0x0:7802x5204/1200x800/filters:focal(3277x1978:4525x3226)/cdn.vox-cdn.com/uploads/chorus_image/image/70566385/GettyImages_1238785426.0.jpg",
    "https://i.ytimg.com/vi/X4bPR_JjjIM/maxresdefault.jpg",
    "https://assets.classy.org/17752532/fe55c4da-1d64-11ed-98eb-0a58a9feac03.png",
    "https://static.tgbwidget.com/organization_logo%2F7f2d7557-41c1-4be9-88a1-98359673188f.jpeg",
    "https://cassaday.com/wp-content/uploads/2022/08/united-help-ukraine-logo.png",
    "https://christianaidministries.org/wp-content/uploads/christian-aid-ministries-1-primary-logo-buttress-blue-rgb-900px-w-72ppi-768x382.png"
    ]

    

    driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')
    
    # No changes needed for the initial setup and navigation

    cards = driver.find_elements(By.CSS_SELECTOR, '.tabgrid__card-item')
    counter = 0
    for card in cards:
        add = True
        counter+=1
        if counter > 78:
            pass
        elif counter > 67:
            element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="49"]'))
            )
        elif counter > 60:
            element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="52"]'))
            )
        elif counter > 43:
            element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="46"]'))
            )
            element.click()
        elif counter > 15:
            element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="47"]'))
            )
            element.click()
        name = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').text.strip()
        if add == False:
            add = False
        else:
            location = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p:nth-child(2)').text.strip()
            rating = card.find_element(By.CSS_SELECTOR, '.tab-card__ratings').text.strip().replace('%', '')
        

            detail_link = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').get_attribute('href')
            driver.get(detail_link)  # Navigate to the charity's page
        
            try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
            except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"

            #print(mission_statement)
            
            
        
            try:
                # Assuming phone number is available on the detail page, adjust the selector as needed
                phone_number = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]'))
                ).get_attribute('aria-label')
            except:
                phone_number = "Phone number not found"
            
            try:
                # Assuming the web URL is available on the detail page, adjust the selector as needed
                web_url_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'a[target="_blank"][href][aria-label$="nonprofit website"]'))
                )
                web_url = web_url_element.get_attribute('href')
            except:
                web_url = "Web URL not found"


            try:
                picture_element = WebDriverWait(driver, 1).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
                )
                picture = web_url_element.get_attribute('img')
                picture = pictureLinks[instance]
            except:
                picture = pictureLinks[instance]
        
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if name not in dups:
                    groups.append(temp)
                    temp2 = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url, "Picture" : picture}
                    finalGroups.append(temp2)
                    instance+=1
                    #print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}, Picture : {picture}")
                dups.append(name)
            if len(groups) >= 37:
                break
        driver.back()  # Navigate back to the main list to continue the loop

    driver.get('https://www.charitynavigator.org/discover-charities/popular-charities/most-viewed-charities/#charity_list')
    
    # No changes needed for the initial setup and navigation

    cards = driver.find_elements(By.CSS_SELECTOR, '.tabgrid__card-item')
    counter = 0
    for card in cards:
        name = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').text.strip()
        if add == False:
            add = False
        else:
            location = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p:nth-child(2)').text.strip()
            rating = card.find_element(By.CSS_SELECTOR, '.tab-card__ratings').text.strip().replace('%', '')
        

            # Adjust to scrape mission statement and phone number as needed
            detail_link = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').get_attribute('href')
            driver.get(detail_link)  # Navigate to the charity's page
        
            try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
            except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"
        
            try:
                # Assuming phone number is available on the detail page, adjust the selector as needed
                phone_number = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]'))
                ).get_attribute('aria-label')
            except:
                phone_number = "Phone number not found"
            
            try:
                # Assuming the web URL is available on the detail page, adjust the selector as needed
                web_url_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'a[target="_blank"][href][aria-label$="nonprofit website"]'))
                )
                web_url = web_url_element.get_attribute('href')
            except:
                web_url = "Web URL not found"


            try:
                picture_element = WebDriverWait(driver, 1).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
                )
                picture = web_url_element.get_attribute('img')
                picture = pictureLinks[instance]
            except:
                picture = pictureLinks[instance]
        
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if name not in dups:
                    groups.append(temp)
                    temp2 = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url, "Picture" : picture}
                    finalGroups.append(temp2)
                    instance+=1
                    #print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}, Picture : {picture}")
                dups.append(name)
            if (len(groups) >=44):
                break
        driver.back()  # Navigate back to the main list to continue the loop
    
    driver.get('https://www.charitynavigator.org/discover-charities/popular-charities/most-viewed-charities/#charity_list')
    
    # No changes needed for the initial setup and navigation

    cards = driver.find_elements(By.CSS_SELECTOR, '.tabgrid__card-item')
    counter = 0
    for card in cards:
        try:
            name = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').text.strip()
        except: 
            add = False

        if add == False:
            add = False
        else:
            location = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p:nth-child(2)').text.strip()
            rating = card.find_element(By.CSS_SELECTOR, '.tab-card__ratings').text.strip().replace('%', '')
        

            # Adjust to scrape mission statement and phone number as needed
            detail_link = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').get_attribute('href')
            driver.get(detail_link)  # Navigate to the charity's page
        
            try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
            except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"
        
            try:
                # Assuming phone number is available on the detail page, adjust the selector as needed
                phone_number = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]'))
                ).get_attribute('aria-label')
            except:
                phone_number = "Phone number not found"
            
            try:
                # Assuming the web URL is available on the detail page, adjust the selector as needed
                web_url_element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'a[target="_blank"][href][aria-label$="nonprofit website"]'))
                )
                web_url = web_url_element.get_attribute('href')
            except:
                web_url = "Web URL not found"
            
            try:
                picture_element = WebDriverWait(driver, 1).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
                )
                picture = web_url_element.get_attribute('img')
                picture = pictureLinks[instance]
            except:
                picture = pictureLinks[instance]
        
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if name not in dups:
                    groups.append(temp)
                    temp2 = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url, "Picture" : picture}
                    finalGroups.append(temp2)
                    instance+=1
                    #print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}, Picture : {picture}")
                dups.append(name)
            add = True
        driver.back()  # Navigate back to the main list to continue the loop
    options = webdriver.ChromeOptions()
    # Your options setup remains unchanged
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    try:
        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        
        # Construct a CSS selector that matches the class of the h2 element
        css_selector = "h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold.tw-text-lg.tablet\\:tw-text-xl.tw-text-night-sky-800.tw-tracking-normal.tablet\\:tw-tracking-\\[-0\\.2px\\].tw-mb-1"
        element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, css_selector))
        )
        
        # Extract text
        text = element.text.strip()  # Using strip() to clean up any leading/trailing whitespace

        # Scrape the location/status information
        location_info_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'p.tw-font-sofia-pro.tw-font-normal'))
        )
        location_info = location_info_element.text.strip()
        location_info = "Raymore Mo"


        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = percentage_element.text.strip()


        driver.get('https://www.charitynavigator.org/ein/881006161')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"

        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1
        if text not in dups:
            temp = {"Name": text, "Location": location_info, "Rating":percentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(text)




        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[1].text.strip()

        location_info = "Wheaton IL"


        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[1].text.strip()

        driver.get('https://www.charitynavigator.org/ein/351835273')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"

        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1
        if second_organization_name not in dups:
            temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(second_organization_name)





        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[2].text.strip()

        location_info = "Minneapolis, MN"


        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[2].text.strip()

        driver.get('https://www.charitynavigator.org/ein/411307457')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        # Locate the <span> element with the class "truncate" and extract the text
        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"

        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1
        if second_organization_name not in dups:
            temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(second_organization_name)


        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[3].text.strip()
        location_info = "Falls Church, VA"


        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[3].text.strip()

        driver.get('https://www.charitynavigator.org/ein/521778729')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"
        
        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1

        if second_organization_name not in dups:
            temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(second_organization_name)





        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[4].text.strip()
        location_info = "FairFax, VA"

        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[4].text.strip()

        driver.get('https://www.charitynavigator.org/ein/471837509')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"
        
        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1


        if second_organization_name not in dups:
            temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(second_organization_name)




        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[5].text.strip()
        location_info = "FairFax, VA"


        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[5].text.strip()

        driver.get('https://www.charitynavigator.org/ein/341344364')
        try:
            phone_element = WebDriverWait(driver, 1).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
            )
            phone_text = phone_element.text.strip()
        except: phone_text = "No Phone Number"

        # Extract just the numeric part if needed
       

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')


        # Locate the <span> element with the class "truncate" and extract the text
        try:
                # Check if the "(More)" button exists and click it to reveal the full mission statement
                more_button = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".inline-var-blue"))
                )
                more_button.click()

                # Now that the "(More)" button has been clicked, wait for the detailed mission statement to be visible
                mission_statement = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".not-truncate"))
                ).text
        except:
                try:
                    # If the "(More)" button doesn't exist, try scraping the alternative mission statement format
                    mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "p > strong + span"))
                    ).text
                except:
                    # If neither method works, return a default message
                    mission_statement = "Mission statement not found"
        
        try:
            picture_element = WebDriverWait(driver, 1).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img'))
            )
            picture = web_url_element.get_attribute('img')
            picture = pictureLinks[instance]
        except:
            picture = pictureLinks[instance]

        instance+=1

        if second_organization_name not in dups:
            temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": mission_statement, "Phone": phone_text, "Website": website_url, "Picture": picture}
            finalGroups.append(temp)
            dups.append(second_organization_name)
            #print(temp)
        
    except Exception as e:
        print(f"An error occurred in the last few: {e}")
    print(len(finalGroups))
