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

Question service requires Postgresql to be installed locally. Database environmental variables can be edited in the following file: `/backend/questionService/database.json` and also `/backend/questionService/services/knexfile.js`.

At the start, you can choose to build the SQL tables and default values using db-migration by following the steps below:
1. Run `npm install -g db-migrate` and `npm install -g db-migrate-pg` (For First timer)
2. Run `db-migrate up initialize` in the questionService folder
3. Tables containing default values will be built.

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

## Accessing Kubernetes Cluster
_Note: The following instructions are specific to running the services on our own AWS cluster._

### Connecting to AWS EKS Cluster with kubectl

#### AWS
1. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
2. Once installed, run `aws --version` to verify that the installation has been successful
3. Then, configure your access identity for AWS with `aws configure`. The AWS Access Key ID and AWS Secret Access Key will be the one given to you.
```
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: ap-southeast-1
Default output format [None]: json
```
4. Run `aws sts get-caller-identity` to verify your AWS Account

#### Kubernetes
To add your AWS identity to kubeconfig, run the following:
```
aws eks --region ap-southeast-1 update-kubeconfig --name cs3219
```
You should see: 
```
Added new context arn:aws:eks:ap-southeast-1:852678264376:cluster/cs3219 to /Users/XXXX/.kube/config
```

Now, get your kubectl contexts with: `kubectl config get-contexts`, you should see the AWS cluster with the name, `arn:aws:eks:ap-southeast-1:852678264376:cluster/cs3219` (or similar)

Then, switch the context to use our CS3219 cluster:
```
kubectl config use-context arn:aws:eks:ap-southeast-1:852678264376:cluster/cs3219
```

You should be successfully connected to the CS3219 cluster.

To test, run: `kubectl get all`. You should see all our pods/services/deployments.

### Kubernetes Deployment
All our 5 microservices (1 frontend and 4 backend) are deployed onto Kubernetes. Their respective deployment and service files could be found under the 'k8s' folder under their respective microservice folder.

An exhaustive list is as follows:
| Microservice      | Kubernetes File Location |
| ----------- | ----------- |
| Frontend | ./frontend/k8s/deploy.yml |
| Frontend Ingress | ./frontend/k8s/deploy.yml |
| Backend Ingress (API Gateway) | ./backend/k8s/api-ingress.yml |
| User Service      | ./backend/userService/k8s/deploy.yml       |
| Question Service   | ./backend/questionService/k8s/deploy.yml        |
| Matching Service | ./backend/matchingService/k8s/deploy.yml |
| Collaboration Service | ./backend/collaborationService/k8s/deploy.yml |

### Kubernetes Horizontal Pod Autoscaler (HPA)
The HPA is invoked through the kubectl CLI with the following command:
```
kubectl autoscale deployment {deployment-name} --cpu-percent=50 --min=1 --max=5
```

where `{deployment-name}` can be replaced with the following:
| Microservice | Deployment Name |
|--------------|-----------------|
| Frontend | frontend-deployment |
| User Service | user-deployment |
| Question Service | question-deployment | 
| Matching Service | matching-deployment | 
| Collaboration Service | collab-deployment |

