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
            title = article.get("title", "").strip()
            description = article.get("description", "")
            published_at = article.get("publishedAt", "").strip()
            source = article.get("source", {})
            source_name = source.get("name", "")
            content = article.get("content", "").strip()
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
                >= 5
            ):
                seen_titles.add(title)

                article_info = {
                    "author": author if author else "Not Available",
                    "title": title if title else "Not Available",
                    "description": description if description else "Not Available",
                    "publishedAt": published_at if published_at else "Not Available",
                    "name": source_name if source_name else "Not Available",
                    "content": content if content else "Not Available",
                    "urlToImage": url_to_image if url_to_image else "Not Available",
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

    return all_news_data[0]
