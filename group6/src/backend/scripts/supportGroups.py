from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
def getGroups():
    Groups=[]
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get('https://www.weho.org/services/human-services/resources-for-ukrainian-refugees')
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, 'body'))
        )
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
        
        # Find all <p> tags
        p_tags = soup.find_all('p')
        # Initialize a list to hold the texts
        orgs = []
        links = []
        about = []
        groups = []
        
        # Iterate over each <p> tag and find <strong> elements within it
        for p in p_tags:
            strong_elements = p.find_all('strong')
            for strong in strong_elements:
                # Append the text of each <strong> element to the list
                orgs.append(strong.get_text(strip=True))
            
            a_elements = p.find_all('a')
            for a in a_elements:
                links.append(a['href'])
            b_elments = p.find_all('br')
            about.append(p.text.strip())
            

        # If you only want the first <strong> text found
        if orgs:
            orgs.pop(0)
        else:
            return "No <strong> tags found in <p> tags"
        
        if links:
            links.pop(0)
            links.pop(0)
            links.pop()
            links.pop(8)
            links.pop(10)
        else:
            return "No <strong> tags found in <p> tags"
        
        if about:
            about.pop(0)
            about.pop(0)
            about.pop(0)
            about.pop()
            newAbout=[]
            for i in range(1,40):
                if (i%2==1):
                    newAbout.append(about[i])
        else:
            return "No about's found in <p> tags"

        for i in range(20):
            groups.append({'name' : orgs[i],"link" : links[i],"about":newAbout[i]})
        for gr in groups:
            print(gr)
            print("\n")
        return groups
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return "Error fetching groups"
    finally:
        driver.quit()
