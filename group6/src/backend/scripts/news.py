from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import requests


# using web driver
def getNews():
    # Setup Selenium WebDriver

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  
    options.add_argument('--disable-gpu')  
    options.add_argument('--no-sandbox')  
    options.add_argument('--disable-dev-shm-usage')  
    driver = webdriver.Chrome(options=options)

    url = 'https://www.rescue.org/search/site/Ukrainian%20refugees?page=0'
    driver.get(url)

    try:
        # Wait until the element you want to interact with is loaded
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'body'))
        )

        # Now using Selenium to interact with the page
        scraper = BeautifulSoup(driver.page_source, 'html.parser')
        stories = scraper.find_all(class_='rplc-teaser-search')

        for story in stories:
            print(story.text)
            


        # Example of clicking a link (modify the selector as per your requirement)
        # link = driver.find_element_by_link_text('Link Text Here')
        # link.click()

        # Add more navigation or interaction code here

    except NoSuchElementException:
        print("Element not found")
    finally:
        # Clean up, close the browser
        driver.quit()

    return stories[1].text