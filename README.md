# Welcome to Online Objective Examination System

Online Objective Examination System(OOES) is a web application developed using Node.js platform and a lightweight Node.js framework Express.js. The templating engine used is Jade and the database used is MongoDB. 

OOES can be operated by three different types of users- Admin, Student and Faculty. They can login valid credentials(College ID and Password). Once logged in, their data is stored in a session using Passport.js and they can logout from it anytime they wish.

The Admin is allowed to add, edit and delete Student and Faculty users. They can also add, edit and delete Courses. In addition to this, they can register a Student to a particular course and deregister him from the same. The Admin can also assign a course to a Faculty and deassign him from the same. Admin users are directly managed using the database and cannot be created or deleted through the software.

Faculty users are allowed to create exams for the courses they teach. They can set the name and code of the exam, its duration and the number of questions.

Student users can take the exams of the courses they are registered in. Once an exam is successfully submitted by the student, he cannot attempt it again. The Students have an option to view their performance in the past exams.

## Getting Started

1. Extract the zip file of the GitHub repository to an empty folder. Let this folder be called OOES.

2. Install Node.js version '4.4.0' using the command line or from the setup at Node.js website. This installs Node.js and NPM(Node Package Manager) as well.

3. Install the Node package Express(this is for the Node.js framework Express.js)  globally using NPM install.

4. Install MongoDB from MongoDB website. Start Mongo Daemon and set the dbpath to   OOES/data.

5. Start the application using the command npm start after navigating to OOES folder.

6. Using a browser, go to http://localhost:3000 and you'll see the application running!

## Setting Up Default Admin User

Create an admin user in database to log in. Set up MongoDB on port 27017. Create a new DB called examdb. Create a new collection called admin. Add the following entry (directly to DB): 
{username: DESIRED_ADMIN_USERNAME, password: DESIRED_ADMIN_PASSWORD}.

## Contributing

We encourage you to contribute to OOES project. Suggest new features and fix bugs to contribute!

