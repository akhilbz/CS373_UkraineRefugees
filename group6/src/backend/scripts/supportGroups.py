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

        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        for element in elements:
            text = element.text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    names.append(text)  # Only append the text
                else:
                    location.append(text)
            counter+=1
        print(len(names))


         # Click on the tab for 'Food & Supplies'
        food_supplies_tab = driver.find_element(By.ID, '47')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        for element in elements:
            text = element.text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    names.append(text)  # Only append the text
                else:
                    location.append(text)
            counter+=1
        print(len(names))
    
     # Click on the tab for 'Medical Supplies'
        food_supplies_tab = driver.find_element(By.ID, '46')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        for element in elements:
            text = element.text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    names.append(text)  # Only append the text
                else:
                    location.append(text)
            counter+=1
        print(len(names))
    

     # Click on the tab for 'Long Term assistance'
        food_supplies_tab = driver.find_element(By.ID, '52')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        for element in elements:
            text = element.text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    names.append(text)  # Only append the text
                else:
                    location.append(text)
            counter+=1
        print(len(names))
    

     # Click on the tab for 'Emergency Housing'
        food_supplies_tab = driver.find_element(By.ID, '49')
        food_supplies_tab.click()
    

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'tab-card__right'))
        )
        
        counter = 0
        # Finding the div with class 'tab-card__right' and its child elements
        elements = driver.find_elements(By.CSS_SELECTOR, '.tab-card__right > p')
        for element in elements:
            text = element.text.strip()
            if(len(text)>1):
                if counter %2 ==0:
                    names.append(text)  # Only append the text
                else:
                    location.append(text)
            counter+=1
        print(len(names))
        print(len(location))

    except Exception as e:
        print(f"An error occurred: {e}")

    driver.quit()
    return names

