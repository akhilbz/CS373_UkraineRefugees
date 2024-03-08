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
        options.add_argument('--headless')
        # No GPU support in headless mode
        options.add_argument('--disable-gpu')
        # Bypass OS security model, necessary for Docker
        options.add_argument('--no-sandbox')
        # Overcome limited resource problems
        options.add_argument('--disable-dev-shm-usage')
        cls.driver = webdriver.Chrome(options=options)
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

    def test5(self):
        WebDriverWait(self.driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "//div[text()='About']")))
        link = self.driver.find_element(By.XPATH, "//div[text()='About']")
        link.click()
        WebDriverWait(self.driver, 10).until(EC.url_matches(URL + "about-us"))
        self.assertEqual(self.driver.current_url, URL + "about-us")

    def test6(self):
        WebDriverWait(self.driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "//div[text()='News and Media']")))
        link = self.driver.find_element(
            By.XPATH, "//div[text()='News and Media']")
        link.click()
        WebDriverWait(self.driver, 30).until(
            EC.url_matches(URL + "news"))
        self.assertEqual(self.driver.current_url, URL + "news")

    def test7(self):
        WebDriverWait(self.driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "//div[text()='Support Groups']")))
        link = self.driver.find_element(
            By.XPATH, "//div[text()='Support Groups']")
        link.click()
        WebDriverWait(self.driver, 30).until(
            EC.url_matches(URL + "support-groups"))
        self.assertEqual(self.driver.current_url, URL + "support-groups")

    def test8(self):

        original_window_handle = self.driver.current_window_handle

        WebDriverWait(self.driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "//div[text()='About']")))
        link = self.driver.find_element(By.XPATH, "//div[text()='About']")

        # Click the link which opens a new tab
        link.click()

        # Switch to the new tab
        new_window_handle = None
        for window_handle in self.driver.window_handles:
            if window_handle != original_window_handle:
                new_window_handle = window_handle
                break

        if new_window_handle:
            self.driver.switch_to.window(new_window_handle)

            # Find the link in the new tab using the new window handle
            link_in_new_tab = WebDriverWait(self.driver, 30).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "AboutUs_documentationLinkBox__aTYWK")))
            link_in_new_tab.click()

            # Wait for the new URL in the new tab
            WebDriverWait(self.driver, 10).until(EC.url_matches(
                "https://gitlab.com/ajimenez1173/cs373-group-6"))

            # Assert the new URL
            self.assertEqual(self.driver.current_url,
                             "https://gitlab.com/ajimenez1173/cs373-group-6")

    def test9(self):

        original_window_handle = self.driver.current_window_handle

        WebDriverWait(self.driver, 30).until(
            EC.element_to_be_clickable((By.XPATH, "//div[text()='About']")))
        link = self.driver.find_element(By.XPATH, "//div[text()='About']")

        # Click the link which opens a new tab
        link.click()

        # Switch to the new tab
        new_window_handle = None
        for window_handle in self.driver.window_handles:
            if window_handle != original_window_handle:
                new_window_handle = window_handle
                break

        if new_window_handle:
            self.driver.switch_to.window(new_window_handle)

            # Find the link in the new tab using the new window handle
            link_in_new_tab = WebDriverWait(self.driver, 30).until(
                EC.element_to_be_clickable((By.CLASS_NAME, "AboutUs_documentationLink__dgihN")))
            link_in_new_tab.click()

            # Wait for the new URL in the new tab
            WebDriverWait(self.driver, 10).until(EC.url_matches(
                "https://documenter.getpostman.com/view/32956503/2sA2r53kYq"))

            # Assert the new URL
            self.assertEqual(self.driver.current_url,
                             "https://documenter.getpostman.com/view/32956503/2sA2r53kYq")


if __name__ == "__main__":
    unittest.main()
