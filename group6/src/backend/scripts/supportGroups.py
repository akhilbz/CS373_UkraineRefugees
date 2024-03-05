from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def getInfo():
    groups = []
    dups=[]
    add = True
    options = webdriver.ChromeOptions()
    # Your options setup remains unchanged
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

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
        

            # Adjust to scrape mission statement and phone number as needed
            detail_link = card.find_element(By.CSS_SELECTOR, '.tab-card__right > p > a').get_attribute('href')
            driver.get(detail_link)  # Navigate to the charity's page
        
            try:
                # Assuming mission statement is available on the detail page, adjust the selector as needed
                mission_statement = WebDriverWait(driver, 1).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'your-mission-statement-selector'))
                ).text
            except:
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
        
            # Print or save the scraped data
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if temp not in groups:
                    groups.append(temp)
                    print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}")
                dups.append(name)
                print(len(groups))
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
                # Assuming mission statement is available on the detail page, adjust the selector as needed
                mission_statement = WebDriverWait(driver, 1).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'your-mission-statement-selector'))
                ).text
            except:
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
        
            # Print or save the scraped data
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if temp not in groups:
                    groups.append(temp)
                    print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}")
                dups.append(name)
            if (len(groups) >=44):
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
                # Assuming mission statement is available on the detail page, adjust the selector as needed
                mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'your-mission-statement-selector'))
                ).text
            except:
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
        
            # Print or save the scraped data
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if temp not in groups:
                    groups.append(temp)
                    print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}")
                dups.append(name)
        driver.back()  # Navigate back to the main list to continue the loop


    driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/')
    
    # No changes needed for the initial setup and navigation

    cards = driver.find_elements(By.CSS_SELECTOR, '.tabgrid__card-item')
    counter = 0
    for card in cards:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="48"]'))
            )
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
                # Assuming mission statement is available on the detail page, adjust the selector as needed
                mission_statement = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'your-mission-statement-selector'))
                ).text
            except:
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
        
            # Print or save the scraped data
            if add:
                temp = {"Name": name, "Location": location, "Rating":rating, "Mission_statement": mission_statement, "Phone": phone_number, "Website": web_url}
                if temp not in groups:
                    groups.append(temp)
                    print(f"Name: {name}, Location: {location}, Rating: {rating}, Mission Statement: {mission_statement}, Phone: {phone_number}, Website: {web_url}")
                dups.append(name)
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


        # Locate the <span> element with the class "truncate" and extract the text
        message_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
        )
        full_message = message_element.text.strip()

        # Split the message at the first period and keep the first part
        first_part_of_message = full_message.split('.')[0]


        temp = {"Name": text, "Location": location_info, "Rating":percentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)




        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[1].text.strip()

        print(f"Organization Name: {second_organization_name}")
        location_info = "Wheaton IL"

        print(f"Location/Status: {location_info}")

        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[1].text.strip()
        print(f"Percentage: {secondPercentage}")

        driver.get('https://www.charitynavigator.org/ein/351835273')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       
        print(f"Phone number: {phone_text}")

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')

        print(f"Website URL: {website_url}")

        # Locate the <span> element with the class "truncate" and extract the text
        message_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
        )
        full_message = message_element.text.strip()
        # Split the message at the first period and keep the first part
        first_part_of_message = full_message.split('.')[0]
        print(f"Message: {first_part_of_message}")


        temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)





        driver.get('https://www.charitynavigator.org/search?q=ukraine&sort=rating')
        organization_name_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold'))
        )
        all_organization_name_elements = driver.find_elements(By.CSS_SELECTOR, 'h2.tw-mt-0.tw-font-sofia-pro.tw-font-semibold')
        second_organization_name = all_organization_name_elements[2].text.strip()

        print(f"Organization Name: {second_organization_name}")
        location_info = "Minneapolis, MN"

        print(f"Location/Status: {location_info}")

        # Scrape the percentage info
        percentage_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'h1.tw-font-sofia-pro.tw-font-normal'))
        )
        percentage = driver.find_elements(By.CSS_SELECTOR,'h1.tw-font-sofia-pro.tw-font-normal')
        secondPercentage = percentage[2].text.strip()
        print(f"Percentage: {secondPercentage}")

        driver.get('https://www.charitynavigator.org/ein/411307457')

        phone_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.icon-text-indent[href^="tel:"]'))
        )
        phone_text = phone_element.text.strip()

        # Extract just the numeric part if needed
       
        print(f"Phone number: {phone_text}")

        website_element = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.icon-text-indent > a[target="_blank"][href]'))
        )
        website_url = website_element.get_attribute('href')

        print(f"Website URL: {website_url}")

        # Locate the <span> element with the class "truncate" and extract the text
        try:
            message_element = WebDriverWait(driver, 1).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
            )
            first_part_of_message = message_element.text.strip()
        except:
            first_part_of_message = "We save children's lives by transforming pediatric heart care in underserved parts of the world."
        # Split the message at the first period and keep the first part
        print(f"Message: {first_part_of_message}")

        temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)




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


        # Locate the <span> element with the class "truncate" and extract the text
        try:
            message_element = WebDriverWait(driver, 1).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
            )
            first_part_of_message = message_element.text.strip()
        except:
            first_part_of_message = "We save children's lives by transforming pediatric heart care in underserved parts of the world."
        # Split the message at the first period and keep the first part

        temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)





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


        # Locate the <span> element with the class "truncate" and extract the text
        try:
            message_element = WebDriverWait(driver, 1).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
            )
            first_part_of_message = message_element.text.strip()
        except:
            first_part_of_message = "We save children's lives by transforming pediatric heart care in underserved parts of the world."
        # Split the message at the first period and keep the first part


        temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)




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
            message_element = WebDriverWait(driver, 1).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, 'span.truncate'))
            )
            first_part_of_message = message_element.text.strip()
        except:
            first_part_of_message = "We save children's lives by transforming pediatric heart care in underserved parts of the world."
        
        temp = {"Name": second_organization_name, "Location": location_info, "Rating":secondPercentage, "Mission_statement": first_part_of_message, "Phone": phone_text, "Website": website_url}
        groups.append(temp)
        dups.append(text)
        
    except Exception as e:
        print(f"An error occurred: {e}")
    print(len(groups))
    return groups


getInfo()