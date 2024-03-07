from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import unittest

URL = "https://www.ukrainecrisis.me/"


class Test(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        # Your options setup remains unchanged
        service = Service(ChromeDriverManager().install())
        cls.driver = webdriver.Chrome(service=service, options=options)
        cls.driver.get(URL)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test0(self):
        extension = ""
        self.driver.get(URL + extension)
        self.assertEqual(self.driver.current_url, URL + extension)

    def test1L(self):
        extension = "about-us"
        self.driver.get(URL + extension)
        self.assertEqual(self.driver.current_url, URL + extension)

    def test2(self):
        extension = "asylum-countries"
        self.driver.get(URL + extension)
        self.assertEqual(self.driver.current_url, URL + extension)

    def test3(self):
        extension = "news-and-media"
        self.driver.get(URL + extension)
        self.assertEqual(self.driver.current_url, URL + extension)

    def test4(self):
        extension = "support-groups"
        self.driver.get(URL + extension)
        self.assertEqual(self.driver.current_url, URL + extension)

    # def test5(self):
    #     WebDriverWait(self.driver, 30).until(
    #         EC.presence_of_element_located((By.NAME, 'About')))
    #     link = self.driver.find_element(By.NAME, "About")

    # # If the link is inside an iframe, switch to it before interacting with the element
    # # self.driver.switch_to.frame("iframe_name_or_id")

    #     link.click()

    # # If you switched to an iframe, switch back to the default content
    # # self.driver.switch_to.default_content()

    #     WebDriverWait(self.driver, 10).until(EC.url_matches(URL + "about-us"))
    #     self.assertEqual(self.driver.current_url, URL + "about-us")


if __name__ == "__main__":
    unittest.main()
