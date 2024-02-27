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
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    url = "https://www.rescue.org/announcement/welcoming-our-ukrainian-neighbors-washington"
    driver.get(url)

    try:
        # Wait until the element you want to interact with is loaded
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

        # Now using Selenium to interact with the page
        scraper = BeautifulSoup(driver.page_source, "html.parser")

        # These lines grab the full title, full story, partial url fo images, date, location, type of source, publish/source
        images = scraper.find_all(class_="rpla-responsive-image")
        titles = scraper.find_all(
            class_="rpla-responsive-title rpla-responsive-title--long"
        )
        stories = scraper.find_all(class_="rpla-paragraph rpla-paragraph--body")
        date = scraper.find_all(class_="rpla-meta")
        source = scraper.find_all(class_="rplm-caption__credit")
        type = scraper.find_all(class_="rpla-slug rpla-slug--size-large")

        countries_list = ["Poland", "Ukraine", "Moldova", "Switzerland", "Spain"]
        unique_countries_set = set()

        # stories = scraper.find_all(class_='rplc-teaser-search')

        for story in titles:
            print(story.text)

        print(" ")
        print(date[0].text)
        print(" ")
        print(source[0].text)
        print(" ")

        # if type[0].text != "Report" or type[0].text != "Annoucement":
        #     print("Article")
        # else:
        print(type[0].text)

        print(" ")
        for text in stories:
            print(text.text)

        # ... (previous code remains unchanged)
        print(" ")
        # Loop through story to find location, if no location is found, default loaction to Ukraine
        for i, text in enumerate(stories):
            found_countries = [
                country for country in countries_list if country in text.text
            ]

            for country in found_countries:
                unique_countries_set.update(found_countries)
        if not unique_countries_set:
            unique_countries_set.add("Ukraine")

        print(unique_countries_set)

    # Example of clicking a link (modify the selector as per your requirement)
    # link = driver.find_element_by_link_text('Link Text Here')
    # link.click()

    # Add more navigation or interaction code here

    except NoSuchElementException:
        print("Element not found")
    finally:
        # Clean up, close the browser
        driver.quit()

    # gives you the full url for images
    return "www.rescue.org" + images[0].attrs["src"]
