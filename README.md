# Ukrain-Refugees

## Canvas / Slack group number: Group 6

### Names of the team members:
- Samuel Osibamowo
- Chuma Anigbogu
- Alex Jimenez
- Derek Chen
- Akhilesh Bitla

### Project Name: UkraineCrisis

- **Website URL:** [www.UkraineCrisis.me](https://www.UkraineCrisis.me)
- **API Documentation:** [https://documenter.getpostman.com/view/32956503/2sA2r53kYq](https://documenter.getpostman.com/view/32956503/2sA2r53kYq)
- **Backend URL:** [cs373-backend.ukrainecrisis.me](https://cs373-backend.ukrainecrisis.me/)

### GIT SHA
| Phase | SHA |
| ----- | --- |
| 1          | 6d5ee9626fd69c08894a14485eef21f91124c491       |
| 2          | 8328c8ed2932c441991cb822271fcbfd02d91218       |
| 3          | 5a687edfd387d5f42bb08e8cfa77e7ad1215eb94       |
| 4          |        |

### Phase Leader
| Phase        | Phase Leader | Responsibilities |
| ----- | ------------ |------------|
| 1          | Chuma                         | Delegating tasks, and motivating team                         |
| 2          |Samuel                          |Getting the group past walls and hurdles                          |
| 3          | Alex                         |  Early bird that help set the foundation                        |
| 4          |                          |                          |

**GitLab Pipeline:** [https://gitlab.com/ajimenez1173/cs373-group-6/-/pipelines/1177324288](https://gitlab.com/ajimenez1173/cs373-group-6/-/pipelines/1177324288)

## Estimated/Actual Completion Time
### Phase 1
| Member    | Estimated | Actual |
| ----------- | --------- | ------ |
| Samuel                  |  12                |      10        |
| Chuma                  |  4                |   8           |
| Alex                 |   7               |   12           |
| Akhilesh            |  8                |  18            |
| Derek                 |  5                | 7             |

### Phase 2
| Member    | Estimated | Actual |
| ----------- | --------- | ------ |
| Samuel                  |  15                |      40        |
| Chuma                  | 12                 |   32           |
| Alex                 |    14              |  24            |
| Akhilesh            |        8          |     17         |
| Derek                 |   14               |    24          |

### Phase 3
| Member    | Estimated | Actual |
| ----------- | --------- | ------ |
| Samuel                  |  15                |      8        |
| Chuma                  | 12                 |   9           |
| Alex                 |    6              |  8            |
| Akhilesh            |        4          |     7         |
| Derek                 |   9               |    8          |


### Project Proposal
The goal of our project is to bring attention to the ongoing crisis in Ukraine and how it has affected the lives of individuals who have been impacted.

### Data Sources
We will programmatically scrape data from the following sources:
- [UNHCR Ukrainian refugees data](https://data.unhcr.org/es/dataviz/107) (Restful API)
- [Twitter API for Ukraine Crisis News Feed](https://developer.twitter.com/en/docs/api-reference-index) (Twitter News Feed on Ukraine Crisis)
- [Hilltop USC for Employment & Training Support](https://hilltopusc.org/employment-training) (Support group/resources)
- [Hope for Ukraine](https://hope-ua.com/)
- [EU Solidarity with Ukraine](https://eu-solidarity-ukraine.ec.europa.eu/helping-ukrainians-how-you-can-donate-and-engage_en)
- [AI for Good](https://ai4good.org/ukraine/)
- [Razom for Ukraine](https://www.razomforukraine.org/)

### Models
#### 1. Support Groups/Resources
   - **Attributes:** Name/Basic Info, Services/Resources provided, Status of Resource, Contact Info, Location, Year Established
   - **Instances:** 3

#### 2. News/Media
   - **Attributes:** Name/Basic Info, Publisher, The Actual News, Different Sources, Date
   - **Instances:** 3

#### 3. Asylum Countries
   - **Attributes:** Name, Capital, Current Location, Immigration Distance, Story and Personal Struggles
   - **Instances:** 3

### Sorting and Filtering
- **Support Groups:** Date, Name, Location, Status, Contact
- **News Media:** Publication Date, Name, Location, Type of source, Publisher
- **Asylum Countries:** Title, Location, Name, Distance Immigrated, Date of Story

### Connections
Each model will connect to instances of at least two other models, enhancing the richness and interactivity of the data.

### Media Types
- **Support Groups:** Maps, Videos, Images, Text
- **News:** Text, Images/Videos/Recordings
- **Asylum Countries:** Images/Videos, Text, Map

### Site Questions
Our site will provide answers to the following questions:
1. How could you help out?
2. What is currently going on in Ukraine?
3. How has this event affected people’s lives?
