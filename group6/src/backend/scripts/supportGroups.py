from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import re

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager



def getInfo():
    # List to hold the scraped address
    names = []
    location = []
    ratings = []
    descriptions = []
    contacts = []
    contacts2 = []
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')
        repeat = False
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        indexs = []
        for i in range(len(elements)):
            text = elements[i].text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    if text not in names:
                        indexs.append(i//2)
                        names.append(text)  # Only append the text
                        repeat = False
                    else:
                        repeat = True
                else:
                    if repeat:
                        location.append(text)
            counter+=1
        

        #For Ratings
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__ratings')
        for i in range(len(elements)):
            rating_text = elements[i].text.strip()  # This should give you "100%"
            # You can further process it to remove the '%' if needed
            rating_value = rating_text.replace('%', '')
            if i in indexs:
                if len(rating_value)>1:
                    # Append the rating value to your list
                    ratings.append(rating_value)
        

       


        link_hrefs = []
        links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="charitynavigator.org/ein/"]')
        count = 0
        for link in links:
            if count%3 == 0:
                href = link.get_attribute('href')
                link_hrefs.append(href)
            count+=1

        # Visit each link and get the phone number
        for href in link_hrefs:
            driver.get(href)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]')))
            phone_number = driver.find_element(By.CSS_SELECTOR, 'a[href^="tel:"]').get_attribute('aria-label')
            contacts.append(phone_number)
            if len(contacts) == 15:
                break
        
        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')

         # Click on the tab for 'Food & Supplies'
        food_supplies_tab = driver.find_element(By.ID, '47')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        repeat = False
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        indexs = []
        for i in range(len(elements)):
            text = elements[i].text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    if text not in names:
                        indexs.append(i//2)
                        names.append(text)  # Only append the text
                        repeat = False
                    else:
                        repeat = True
                else:
                    if repeat:
                        location.append(text)
            counter+=1
        

        #For Ratings
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__ratings')
        for i in range(len(elements)):
            rating_text = elements[i].text.strip()  # This should give you "100%"
            # You can further process it to remove the '%' if needed
            rating_value = rating_text.replace('%', '')
            if i in indexs:
                if len(rating_value)>1:
                    # Append the rating value to your list
                    ratings.append(rating_value)
        

       
        
        link_hrefs = []
        links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="charitynavigator.org/ein/"]')
        count = 0
        for link in links:
            if count%3 == 0:
                href = link.get_attribute('href')
                link_hrefs.append(href)
            count+=1

        # Visit each link and get the phone number
        nums = 0
        for href in link_hrefs:
            driver.get(href)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]')))
            phone_number = driver.find_element(By.CSS_SELECTOR, 'a[href^="tel:"]').get_attribute('aria-label')
            if nums > 14:
                if(phone_number not in contacts):
                    contacts2.append(phone_number)
            if len(contacts2) > 16:
                break
            nums+=1

        for phones in contacts2:
            contacts.append(phones)

        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')

    
     # Click on the tab for 'Medical Supplies'
        food_supplies_tab = driver.find_element(By.ID, '46')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        repeat = False
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        indexs = []
        for i in range(len(elements)):
            text = elements[i].text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    if text not in names:
                        indexs.append(i//2)
                        names.append(text)  # Only append the text
                        repeat = False
                    else:
                        repeat = True
                else:
                    if repeat:
                        location.append(text)
            counter+=1
        

        #For Ratings
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__ratings')
        for i in range(len(elements)):
            rating_text = elements[i].text.strip()  # This should give you "100%"
            # You can further process it to remove the '%' if needed
            rating_value = rating_text.replace('%', '')
            if i in indexs:
                if len(rating_value)>1:
                    # Append the rating value to your list
                    ratings.append(rating_value)
        


        link_hrefs = []
        links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="charitynavigator.org/ein/"]')
        count = 0
        for link in links:
            if count%3 == 0:
                href = link.get_attribute('href')
                link_hrefs.append(href)
            count+=1

        # Visit each link and get the phone number
        nums = 0
        contacts2 = []
        for href in link_hrefs:
            driver.get(href)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]')))
            phone_number = driver.find_element(By.CSS_SELECTOR, 'a[href^="tel:"]').get_attribute('aria-label')
            if nums > 31:
                if phone_number not in contacts:
                    contacts2.append(phone_number)
            if len(contacts2) > 6:
                break
            nums+=1

        for phones in contacts2:
            contacts.append(phones)

        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')
    

     # Click on the tab for 'Long Term assistance'
        food_supplies_tab = driver.find_element(By.ID, '52')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        repeat = False
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        indexs = []
        for i in range(len(elements)):
            text = elements[i].text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    if text not in names:
                        indexs.append(i//2)
                        names.append(text)  # Only append the text
                        repeat = False
                    else:
                        repeat = True
                else:
                    if repeat:
                        location.append(text)
            counter+=1
        

        #For Ratings
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__ratings')
        for i in range(len(elements)):
            rating_text = elements[i].text.strip()  # This should give you "100%"
            # You can further process it to remove the '%' if needed
            rating_value = rating_text.replace('%', '')
            if i in indexs:
                if len(rating_value)>1:
                    # Append the rating value to your list
                    ratings.append(rating_value)
        

        

        link_hrefs = []
        links = driver.find_elements(By.CSS_SELECTOR, 'a[href*="charitynavigator.org/ein/"]')
        count = 0
        for link in links:
            if count%3 == 0:
                href = link.get_attribute('href')
                link_hrefs.append(href)
            count+=1

        # Visit each link and get the phone number
        nums = 0
        contacts2 = []
        for href in link_hrefs:
            driver.get(href)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]')))
            phone_number = driver.find_element(By.CSS_SELECTOR, 'a[href^="tel:"]').get_attribute('aria-label')
            if nums > 36:
                if phone_number not in contacts:
                    contacts2.append(phone_number)
            if len(contacts2) > 0:
                break
            nums+=1

        for phones in contacts2:
            contacts.append(phones)

        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')
    

     # Click on the tab for 'Emergency Housing'
        food_supplies_tab = driver.find_element(By.ID, '49')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        repeat = False
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        indexs = []
        for i in range(len(elements)):
            text = elements[i].text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    if text not in names:
                        indexs.append(i//2)
                        names.append(text)  # Only append the text
                        repeat = False
                    else:
                        repeat = True
                else:
                    if repeat:
                        location.append(text)
            counter+=1
        

        #For Ratings
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__ratings')
        for i in range(len(elements)):
            rating_text = elements[i].text.strip()  # This should give you "100%"
            # You can further process it to remove the '%' if needed
            rating_value = rating_text.replace('%', '')
            if i in indexs:
                if len(rating_value)>1:
                    # Append the rating value to your list
                    ratings.append(rating_value)
        

      


        # Visit each link and get the phone number
        nums = 0
        contacts2 = []
        for href in link_hrefs:
            driver.get(href)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href^="tel:"]')))
            phone_number = driver.find_element(By.CSS_SELECTOR, 'a[href^="tel:"]').get_attribute('aria-label')
            if nums > 37:
                if phone_number not in contacts:
                    contacts2.append(phone_number)
            if len(contacts2) > 0:
                break
            nums+=1

        for phones in contacts2:
            contacts.append(phones)

        driver.get('https://www.charitynavigator.org/discover-charities/where-to-give/ukranian-crisis/#charity_list')
        contacts.pop()
        contacts.pop()

    except Exception as e:
        print(f"An error occurred: {e}")

    print(len(names))
    print(len(location))
    print(len(ratings))
    print(len(contacts))
   

    driver.quit()
    return location

