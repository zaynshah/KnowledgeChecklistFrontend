# KnowledgeChecklistFrontend

## Welcome to Our Project!

![GitHub all releases](https://img.shields.io/github/downloads/FahmidulHaquee/WorldBankFrontend/total?logo=GitHub)
![APM](https://img.shields.io/apm/l/npm)
![Twitter Follow](https://img.shields.io/twitter/follow/SigmaLabs?style=social)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@babel/core)
![GitHub Sponsors](https://img.shields.io/github/sponsors/FahmidulHaquee)

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)

## Introduction

This project contains the knowledge checklist application for students at Sigma Labs. The aims of this project include:

- Providing students with a means of evaluating their current knowledge and understanding of the 12-week fullstack development curriculum.
- Providing students with resources should they require further study or assistance in a subject area.
- Providing students with assessment materials if they confident enough in a subject area.
- Providing coaches with a means of viewing the progress of an individual student.
- Providing coaches with a high-level overview of how students in a given cohort, as a means of generating feedback for the teaching performance of coaches.

## Student Overview

A user enters the following link in their browsers: ()

They are brought to the landing page, which contains a welcome message as well as two buttons; one to register and one to login.

() Screenshot of landing page

Before a student can access the website, they must register with a valid email address and password (which meets requirements). If the registration is successful, the user will receive a notification on the form. They can now login with these credentials.

() Screenshot of register

Upon login, they are directed to the student dashboard. This page contains a welcome section, progress bar, side navigation bar as well as the learning objectives under each topic. Within each learning objective, three buttons can be found side-by-side. These buttons related to the level of confidence that each trainee has with respect to that learning objective.

() Screenshot of student dashboard

To find a specific LO, a side navigation bar is provided to the students to quickly navigate through the page.

## Coach Overview

## Technologies

This project has been created with:

- yarn version: 1.22.17
- react version: 17.0.2
- react-bootstrap version: 2.1.2
- react-router-dom version: 5.2.0
- react-cookie version: 4.1.1
- react-dom version: 17.0.2

## Setup

To run locally, first fork and clone this repository. Then, in the command line, enter the following commands:

```
$ cd ../knowledge-challenge-app
$ yarn install
$ yarn start
```

As well as this. the related backend Server will also be required in order for the App to function properly. The backend repository for this project can be found [here](https://github.com/olliecase-green/KnowledgeChecklistBackend). We recommend cloning both repositories to your local machine for ease of access.

## License

The license for this software can be accessed [here](LICENSE.md)
