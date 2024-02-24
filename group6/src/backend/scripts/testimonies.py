from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

def getTestimonials():
    testimonials = []

    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    driver.get("https://www.redcross.org/about-us/news-and-events/news/2022/voices-of-ukraine-refugees-tell-their-stories.html")

    def scrapePage():
        elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, ".section-control parbase"))  # Update with the correct selector
        )
        
        print(elements) # see what we got

        for element in elements:
            # Extract data here
            name = element.find_element(By.CSS_SELECTOR, ".name-selector").text
            date = "March 16, 2022"  # Update with logic to extract date
            topic = element.find_element(By.CSS_SELECTOR, ".topic-selector").text
            caption = element.find_element(By.CSS_SELECTOR, ".caption-selector").text
            image = element.find_element(By.CSS_SELECTOR, ".image-selector").get_attribute('src')
            testimonial = element.find_element(By.CSS_SELECTOR, ".testimonial-text-selector").text
            location = [52.2297, 21.0122]  # Update with logic to extract location

            testimonial_data = {
                "id": len(testimonials) + 1,
                "name": name,
                "date": date,
                "timeDisplaced": "2 years",  # Static or dynamic data?
                "topic": topic,
                "caption": caption,
                "image": image,
                "testimonial": testimonial,
                "location": location
            }
            testimonials.append(testimonial_data)

    try:
        scrapePage()  # Call this for each page if there are multiple pages
    except Exception as e:
        print("Error occurred:", e)
    finally:
        driver.quit()

    return testimonials
