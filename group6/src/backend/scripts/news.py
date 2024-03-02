from selenium import webdriver
import langid
import requests
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import requests


def is_english(text):
    lang, _ = langid.classify(text)
    return lang == "en"


def fetch_news_data(query):
    api_key = "36f073edca3e4d5499471738efdca7e1"
    url = f"https://newsapi.org/v2/everything?q={query}&from=2024-02-01&sortBy=publishedAt&apiKey={api_key}"

    try:
        contributors_response = requests.get(url)
        contributor_res = contributors_response.json()
        articles = contributor_res.get("articles", [])

        news_data = []

        seen_titles = set()  # To track unique article titles

        for article in articles:
            author = article.get("author", "")
            title = article.get("title", "")
            description = article.get("description", "")
            published_at = article.get("publishedAt", "")
            source = article.get("source", {})
            source_name = source.get("name", "")
            content = article.get("content", "")
            url_to_image = article.get("urlToImage", "")

            # Check if title is unique, at most two fields are empty, and the title is in English
            if (
                title
                and title not in seen_titles
                and sum(
                    1
                    for field in [
                        author,
                        description,
                        published_at,
                        source_name,
                        content,
                        url_to_image,
                    ]
                    if field
                )
                >= 4
            ):
                seen_titles.add(title)

                article_info = {
                    "author": author,
                    "title": title,
                    "description": description,
                    "publishedAt": published_at,
                    "name": source_name,
                    "content": content,
                    "urlToImage": url_to_image,
                }

                news_data.append(article_info)

        return news_data

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from News API: {e}")
        return []


def getNews():
    queries = ["ukrainewar", "ukrainerussia", "russiaukraine", "ukraine"]
    all_news_data = []

    for query in queries:
        news_data = fetch_news_data(query)
        all_news_data.extend(news_data)

    print(len(all_news_data))
    return all_news_data[0]


# Setup Selenium WebDriver

# options = webdriver.ChromeOptions()
# options.add_argument("--headless")
# options.add_argument("--disable-gpu")
# options.add_argument("--no-sandbox")
# options.add_argument("--disable-dev-shm-usage")
# driver = webdriver.Chrome(options=options)

# url = "https://www.rescue.org/search/site/Ukrainian%20refugees?page=0"
# driver.get(url)

# try:
#     WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
#     scraper = BeautifulSoup(driver.page_source, "html.parser")


#     new_page = driver.find_element(By.CLASS_NAME, 'rplm-pager-item-3--next')
#     page_ctr = 1

#     while True:
#         print("CURRENT PAGE: ", page_ctr)
#         page_ctr += 1

#         # First, get the count of links
#         links = driver.find_elements(By.CLASS_NAME, 'rplc-teaser-search__wrapper-link')
#         num_links = len(links)
#         print("NUM OF LINKS: ", num_links)


#         for i in range(num_links):
#             # Re-find the links every time after navigating back
#             links = driver.find_elements(By.CLASS_NAME, 'rplc-teaser-search__wrapper-link')
#             link = links[i]
#             link.click()
#             print("LINK CLICKED SUCCESSFULLY")
#             try:
#                 WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'rpla-responsive-title')))
#                 scraper = BeautifulSoup(driver.page_source, "html.parser")

#                 images, titles, stories, types, locations, sources, dates = [], [], [], [], [], [], []
#                 countries_list = ["Poland", "Ukraine", "Moldova", "Switzerland", "Spain"]
#                 types_of_web = ["Announcement", "Report", "Press Release"]
#                 unique_countries_set = set()

#                 image_elements = scraper.find_all(class_="rpla-responsive-image")
#                 title_elements = scraper.find_all(class_="rpla-responsive-title rpla-responsive-title--long")
#                 if not title_elements:
#                     title_elements = scraper.find_all(class_="rpla-responsive-title rpla-responsive-title--very-long")
#                 if not title_elements:
#                     title_elements = scraper.find_all(class_="rpla-responsive-title rpla-responsive-title--super-long")
#                 story_elements = scraper.find_all(class_="rpla-paragraph rpla-paragraph--body")
#                 date_elements = scraper.find_all(class_="rpla-meta")
#                 source_elements = scraper.find_all(class_="rplm-caption__credit")
#                 type_elements = scraper.find_all(class_="rpla-slug rpla-slug--size-large")

#                 # Process and store data
#                 for story in story_elements:
#                     stories.append(story.text)
#                     found_countries = [country for country in countries_list if country in story.text]
#                     unique_countries_set.update(found_countries)

#                 locations.append(unique_countries_set if unique_countries_set else {"Ukraine"})

#                 if image_elements:
#                     images.append("www.rescue.org" + image_elements[0].attrs["src"])
#                 else:
#                     images.append("Random Link")

#                 if title_elements:
#                     titles.append(title_elements[0].text.strip())

#                 if date_elements:
#                     dates.append(date_elements[0].text.strip())
#                 else:
#                     dates.append("February 22, 2022")

#                 if source_elements:
#                     sources.append(source_elements[0].text)
#                 else:
#                     sources.append("Resource.org")

#                 if type_elements[0].text in types_of_web:
#                     types.append(type_elements[0].text)
#                 else:
#                     print("ARTICLE TYPE: ", type_elements[0])
#                     types.append("Article")

#                 # Debug prints
#                 print(images, "\n\n", titles, "\n\n", types, "\n\n", dates, "\n\n", sources, "\n\n", locations, "\n\n", stories)

#             except TimeoutException:
#                 print("Timed out waiting for element to load. Continuing to next link.")
#                 driver.back()
#                 WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'rplc-teaser-search__wrapper-link')))
#                 continue


#             driver.back()
#             WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'rplc-teaser-search__wrapper-link')))

#         # try to navigate to the next page
#         try:
#             new_page = driver.find_element(By.CLASS_NAME, 'rplm-pager-item-3--next')
#             new_page.click()
#             WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
#         except NoSuchElementException:
#             print("No more pages to navigate. Exiting loop.")
#             break  # Exit the loop if 'Next Page' button is not found


#         # Re-find the 'Next Page' button after navigation
#         new_page = driver.find_element(By.CLASS_NAME, 'rplm-pager-item-3--next')


# except NoSuchElementException:
#     print("Element not found")
# finally:
#     driver.quit()
