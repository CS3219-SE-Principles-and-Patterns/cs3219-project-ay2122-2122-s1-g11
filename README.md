# CS3219: PeerPrep Group 11

## Group Members
| Member             | Student ID |
|--------------------|------------|
| Goh Jun Wei        | A0201970M  |
| Low En Hao         | A0200239U  |
| Murugesan Karthika | A0191135L  |
| Lee Wei Yi, Samuel | A0202032H  |

## Seting up Locally
Please ensure that the you install all the dependencies for each service before starting the server. To install the dependencies, simply run `npm install` in each of the base directory of each service.
### User Service
**Prerequisites:**

User service requires Postgresql to be installed locally. Database environmental variables can be edited in the following file: `/backend/userService/config/db.config.js`

**Starting the server:**

Once the database is set up, \
enter into the terminal in the base directory of the User Service: `/backend/userService` and run 
```
npm start
```
The User Service runs on port 4000.


### Question Service
**Prerequisites:**

Question service requires Postgresql to be installed locally. Database environmental variables can be edited in the following file: `/backend/questionService/database.json`

**Starting the server:**

Once the database is set up, \
enter into the terminal in the base directory of the Question Service: `/backend/questionService` and run 
```
npm start
```
The Question Service runs on port 3001.

### Matching Service
**Prerequisites:**

Matching service requires Redis to be installed locally. Once Redis is installed, open a terminal and enter the following command to start the local Redis server.
```
redis-server
```


**Starting the server:**

Once the Redis store is set up, \
enter into the terminal in the base directory of the Matching Service: `/backend/matchingService` and run 
```
npm start
```
The Matching Service runs on port 8000.

### Collaboration Service

**Starting the server:**

Enter into the terminal in the base directory of the Collaboration Service: `/backend/collaborationService` and run 
```
npm start
```
The Collaboration Service runs on port 5000.

### Frontend

**Starting the server:**

Enter into the terminal in the base directory of the Collaboration Service: `/frontend` and run 
```
npm start
```
The Frontend runs on port 3000.
