from urllib3.util.retry import Retry
import modelsAPI
import unittest
import requests

from requests.adapters import HTTPAdapter

BASE_URL = "http://cs373-backend.ukrainecrisis.me"

# Create a session object
session = requests.Session()

# Define the retry strategy
retries = Retry(total=5,
                backoff_factor=0.1,
                status_forcelist=[500, 502, 503, 504])

# Mount it for both http and https usage
adapter = HTTPAdapter(max_retries=retries)
session.mount('http://', adapter)
session.mount('https://', adapter)


class EndpointTests(unittest.TestCase):

    def test0(self):
        # Test All News Endpoint
        response = session.get(BASE_URL + "/api/news")
        self.assertTrue(response.status_code == 200)
        news_list = response.json()
        self.assertTrue(isinstance(news_list, list))
        self.assertEqual(len(news_list), 167)

    def test1(self):
        # Test All Countries Endpoint
        response = session.get(BASE_URL + "/api/asylum-countries")
        self.assertTrue(response.status_code == 200)
        countries_list = response.json()
        self.assertTrue(isinstance(countries_list, list))
        self.assertEqual(len(countries_list), 100)

    def test2(self):
        # Test All Support Groups Endpoint
        response = session.get(BASE_URL + "/api/support-groups")
        self.assertTrue(response.status_code == 200)
        groups_list = response.json()
        self.assertTrue(isinstance(groups_list, list))
        self.assertEqual(len(groups_list), 50)

    def test3(self):
        # Test Singular News Endpoint
        response = session.get(BASE_URL + "/api/news/1")
        self.assertTrue(response.status_code == 200)
        news_dictionary = response.json()
        self.assertTrue(isinstance(news_dictionary, dict))
        self.assertEqual(len(news_dictionary), 8)
        self.assertEqual(news_dictionary["name"], "Biztoc.com")

    def test4(self):
        # Test Singular Country Endpoint
        response = session.get(BASE_URL + "/api/asylum-countries/1")
        self.assertTrue(response.status_code == 200)
        countries_dictionary = response.json()
        self.assertTrue(isinstance(countries_dictionary, dict))
        self.assertEqual(len(countries_dictionary), 7)
        self.assertEqual(
            countries_dictionary["name"], "United States of America")

    def test5(self):
        # Test Singular Support Group Endpoint
        response = session.get(BASE_URL + "/api/support-groups/1")
        self.assertTrue(response.status_code == 200)
        support_dictionary = response.json()
        self.assertTrue(isinstance(support_dictionary, dict))
        self.assertEqual(len(support_dictionary), 7)
        self.assertEqual(support_dictionary["name"], "Islamic Relief USA")

    def test6(self):
        # Test Countries Search Endpoint
        response = session.get(BASE_URL + "/api/search/countries/Uni")
        self.assertTrue(response.status_code == 200)

    def test7(self):
        # Test News Search Endpoint
        response = session.get(BASE_URL + "/api/search/news/Ukraine")
        self.assertTrue(response.status_code == 200)
    
    def test8(self):
        # Test News Search Endpoint
        response = session.get(BASE_URL + "/api/search/support-groups/New")
        self.assertTrue(response.status_code == 200)
    



if __name__ == "__main__":
    unittest.main()
