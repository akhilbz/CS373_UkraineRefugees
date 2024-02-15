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

### GIT SHA
| Phase | SHA |
| ----- | --- |
| 1          |        |
| 2          |        |
| 3          |        |
| 4          |        |

### Phase Leader
| Phase        | Phase Leader | Responsibilities |
| ----- | ------------ |------------|
| 1          | Chuma                         | Delegating tasks, and motivating team                         |
| 2          |                          |                          |
| 3          |                          |                          |
| 4          |                          |                          |

**GitLab Pipeline:** [https://gitlab.com/davindertoor77/cs373-group-17/-/pipelines](https://gitlab.com/davindertoor77/cs373-group-17/-/pipelines)

## Estimated/Actual Completion Time
### Phase 1
| Member    | Estimated | Actual |
| ----------- | --------- | ------ |
| Samuel                  |  12                |      10        |
| Chuma                  |  4                |   8           |
| Alex                 |   7               |   12           |
| Akhilesh            |  8                |  18            |
| Derek                 |  5                | 7             |


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

#### 3. Refugee Profile
   - **Attributes:** Name, Basic info, Current Location, Immigration Distance, Story and Personal Struggles
   - **Instances:** 3

### Sorting and Filtering
- **Support Groups:** Date, Name, Location, Common Services/Type, Resources
- **News Media:** Publication Date, Name, Location, Type of source, Publisher
- **Refugee Profile:** Age group, Location, Name, Distance Immigrated, Date of Story

### Connections
Each model will connect to instances of at least two other models, enhancing the richness and interactivity of the data.

### Media Types
- **Support Groups:** Maps, Videos, Images, Text
- **News:** Text, Images/Videos/Recordings
- **Refugee Profile:** Images/Videos, Text, Map

### Site Questions
Our site will provide answers to the following questions:
1. How could you help out?
2. What is currently going on in Ukraine?
3. How has this event affected people’s lives?
