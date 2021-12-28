
# Mainteny Little Project

A brief project that allows user to view list of registered users as well as enable adding courses for the resgistered users.

## Installation

Install mainteny with npm

```bash
  cd mainteny
  npm install 
```
Install mainteny with yarn

```bash
  cd mainteny
  yarn install 
```


Run the client locally
```bash
  cd mainteny/client
  yarn install 
  yarn start
```

    
## Run Locally

Clone the project

```bash
  git clone https://github.com/Sambalicious/mainteny
```

Go to the project directory

```bash
  cd mainteny
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
 
This project uses postgres SQL DATABASE, therefore the following environment variables will be need for connection.
`PORT `
`DB_HOST`
`DB_USERNAME`
`DB_PASSWORD`
`DATABASE`
`SECRET_TOKEN`



## API Reference

#### Login to dashboard

```http
  Post /api/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Email` | `string` | **Required**. User email |
| `Password` | `string`| **Required**. User password |

#### Get all courses

```http
  GET /api/courses
```
#### Create new course

```http
  POST /api/courses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Course` | `string` | **Required**. Course Title |
| `Lecturer` | `string`| **Required**. Lecturer Taking the course |

#### Get all students

```http
  GET /api/students?pageIndex=1&pageSize=5
```
#### Create a new student

```http
  POST /api/students
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name` | `string` | **Required**. Student Name |
| `Email` | `string`| **Required**. Student Email |
| `Password` | `string` | **Required**. Student Password |


#### Get student details

```http
  GET /api/students/${UserId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `UserId`      | `string` | **Required**. UserId of student to fetch |

#### add Course for a student

```http
  POST /api/students/${UserId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `UserId`      | `string` | **Required**. UserId of student to fetch |
| `CourseId` | `string` | **Required**. CourseId to be added 



