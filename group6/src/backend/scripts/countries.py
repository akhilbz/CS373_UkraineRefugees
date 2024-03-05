from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
from restcountries import RestCountryApiV2 as rapi
from flask import jsonify

import requests


# using web driver
def getCountries():
    accepted_countries = [
        "United States of America",
        "Canada",
        "Germany",
        "Sweden",
        "Norway",
        "Australia",
        "United Kingdom",
        "France",
        "Netherlands",
        "Switzerland",
        "Belgium",
        "Denmark",
        "Finland",
        "Austria",
        "Italy",
        "Spain",
        "Portugal",
        "New Zealand",
        "Ireland",
        "Luxembourg",
        "Greece",
        "Czech Republic",
        "Hungary",
        "Poland",
        "Slovakia",
        "Slovenia",
        "Croatia",
        "Estonia",
        "Latvia",
        "Lithuania",
        "Malta",
        "Cyprus",
        "Iceland",
        "Japan",
        "South Sudan",
        "Turkey",
        "Qatar",
        "United Arab Emirates",
        "Jordan",
        "Lebanon",
        "Saudi Arabia",
        "Kuwait",
        "Bahrain",
        "Oman",
        "Singapore",
        "Malaysia",
        "Thailand",
        "South Africa",
        "Brazil",
        "Argentina",
        "Chile",
        "Mexico",
        "Colombia",
        "Peru",
        "Ecuador",
        "Costa Rica",
        "Uruguay",
        "Panama",
        "Venezuela",
        "India",
        "Bangladesh",
        "Pakistan",
        "Indonesia",
        "Philippines",
        "Vietnam",
        "Cambodia",
        "Laos",
        "Myanmar",
        "Nepal",
        "Sri Lanka",
        "Mongolia",
        "Israel",
        "Iran",
        "Iraq",
        "Egypt",
        "Morocco",
        "Tunisia",
        "Algeria",
        "Nigeria",
        "South Sudan",
        "Kenya",
        "Uganda",
        "Rwanda",
        "Tanzania",
        "Ethiopia",
        "Somalia",
        "Eritrea",
        "Sudan",
        "Afghanistan",
        "Syria",
        "Iraq",
        "Yemen",
        "Libya",
        "Republic of Moldova",
        "Romania",
        "Bulgaria",
        "Montenegro",
        "North Macedonia",
        "Liechtenstein",
        "Georgia",
    ]

    allCountries = []

    for name in accepted_countries:

        country_info = {
            "name": "",
            "capital": "",
            "region": "",
            "population": 0,
            "languages": [],
            "flag": "",
        }

        try:

            country_list = rapi.get_countries_by_name(name)
            country = country_list[0]

            country_info["name"] = name if name else "Not Available"
            country_info["capital"] = (
                country.capital if country.capital else "Not Available"
            )
            country_info["region"] = (
                country.region if country.region else "Not Available"
            )
            country_info["population"] = (
                country.population if country.population else "Not Available"
            )
            country_info["languages"] = (
                country.languages[0]["name"] if country.languages else "Not Available"
            )
            country_info["flag"] = country.flag if country.flag else "Not Available"

            allCountries.append(country_info)

        except requests.exceptions.InvalidURL as e:
            pass

    return allCountries
