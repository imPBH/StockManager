# Stock Manager

This project is a stock management system designed to help businesses keep track of their inventory. The system includes an ASP.NET API, a database, a Next.js web application, and an Expo mobile application.

## Summary

- [Purpose](#purpose)
- [Web application](#web-application)
  - [Login/Register page](#loginregister-page)
  - [Companies page](#companies-page)
  - [References page](#references-page)
  - [Warehouses page](#warehouses-page)
  - [Articles page](#articles-page)
- [Mobile application](#mobile-application)
  - [Login page](#login-page)
  - [Companies page](#companies-page-1)
  - [Warehouses page](#warehouses-page-1)
  - [Action page](#action-page)
  - [Scanner page](#scanner-page)
  - [Add a new reference](#add-a-new-reference)
  - [Reference already exists](#reference-already-exists)
  - [Update a reference](#update-a-reference)
  - [Add a new article](#add-a-new-article)
- [Infrastructure](#infrastructure)
- [Challenges](#challenges)
- [Project organisation](#project-organisation)
- [Documentation](#documentation)
- [Authors](#authors)

## Purpose

The purpose of this project is to provide businesses with a simple and efficient way to manage their inventory. The web application allows users to view and manage their inventory from a desktop or laptop computer, while the mobile application provides users with the ability to manage their inventory on-the-go, making use of the mobile camera to act as a barcode scanner.

## Web application

The web application is built with Next.js, a server-rendered React framework. It provides users with an easy-to-use interface for managing their inventory.

### Login/register page

<img src="https://github.com/imPBH/StockManager/assets/59230262/0b06eeb7-c69d-48ed-b2d1-6579528d8a04" height="400">

And here is the modal for register.

<img src="https://github.com/imPBH/StockManager/assets/59230262/76c27a01-4d0e-4106-bd09-63355cf96e5f" height="400">

### Companies page
On this page, users can view all of their companies, create new ones, and manage companies warehouses and references.

<img src="https://github.com/imPBH/StockManager/assets/59230262/17794859-c050-4cde-a988-225aaa268c08" height="400">

Here is the modal for creating a new company.

<img src="https://github.com/imPBH/StockManager/assets/59230262/bc3a3f5e-b62b-42d8-a15f-4a80b1072e2c" height="400">

### References page
Each company have its own references, on this page, users can view all of their references, add new ones, and edit them.

<img src="https://github.com/imPBH/StockManager/assets/59230262/e0f1d9a0-4956-4eda-bf9d-07c91bc84010" height="400">

Here is the edit modal.

<img src="https://github.com/imPBH/StockManager/assets/59230262/e9bebdcf-88a7-45f6-a0d1-87ca1160a4a9" height="400">

And here is the modal for creating a new reference.

<img src="https://github.com/imPBH/StockManager/assets/59230262/6dcde044-d04b-4791-b50a-864872d2e01c" height="400">

### Warehouses page
On this page, users can view all the company warehouses, they can add new ones, edit and delete them. They also can view articles stored inside them.

<img src="https://github.com/imPBH/StockManager/assets/59230262/49a2ff85-46f4-41fd-9f5d-ea63132e916c" height="400">

Here is the edit modal.

<img src="https://github.com/imPBH/StockManager/assets/59230262/9df92397-eddf-4ab6-82b9-a5e4fb992cda" height="400">

And here is the modal for creating a new warehouse.

<img src="https://github.com/imPBH/StockManager/assets/59230262/358dc0ec-1a14-4c7d-9317-0dd58894cbee" height="400">

### Articles page
On this page, users can view all articles stored in a warehouse. They can add new ones, edit and delete them.

<img src="https://github.com/imPBH/StockManager/assets/59230262/469b9019-1795-4841-a220-7f7c23112155" height="400">

Here is the edit modal, users can change the expiration date or leave it blank to not set an expiration for the article.

<img src="https://github.com/imPBH/StockManager/assets/59230262/d95b934e-f480-4d65-9306-df411e5db63a" height="400">

And here is the modal for creating a new article.

<img src="https://github.com/imPBH/StockManager/assets/59230262/f75dbb0d-fd7d-451e-a27d-604dc37be445" height="400">

## Mobile application

The mobile application is built with Expo, a framework for building cross-platform mobile applications. The application transforms the user's phone into a real stock management accessory. This does not allow to view articles or references, but it is used to quickly add new articles/references by simply scanning the barcode.

### Login page
The mobile application does not have a registration page, it is an accessory, not the main product.

<img src="https://github.com/imPBH/StockManager/assets/59230262/6a92e54e-e23a-4d84-9cbc-ea144fc73fbb" height="500">

### Companies page
Users can choose a company.

<img src="https://github.com/imPBH/StockManager/assets/59230262/e28ec9d7-e7ec-4889-99e6-9eaf34ecfb7c" height="500">

### Warehouses page
Users can choose a warehouse.

<img src="https://github.com/imPBH/StockManager/assets/59230262/90266310-56e0-49f9-be36-94865fa0d5a0" height="500">

### Action page
On this page, users have the choice to manage the inventory or create a new sale (not implmented at the moment).

<img src="https://github.com/imPBH/StockManager/assets/59230262/2e139ce9-4565-43c6-a49b-9a3a7e419210" height="500">

### Scanner page
On this page, users can scan a barcode.

<img src="https://github.com/imPBH/StockManager/assets/59230262/4fbac1c0-43e3-437f-bba8-1b9e94aa1042" height="500">

### Add a new reference
If the scanned barcode is not linked to a reference, a page to create this new reference will appear.

<img src="https://github.com/imPBH/StockManager/assets/59230262/87ceee6f-dcaf-4f3b-a2a0-9debc9b8e66c" height="500">

### Reference already exists
If the reference already exists, a menu offering to modify the reference or to add an article from this reference will appear.

<img src="https://github.com/imPBH/StockManager/assets/59230262/d8adf487-eb7c-443c-8a87-e6d2a7a4627d" height="500">

### Update a reference
Here is the page where users can update a scanned reference.

<img src="https://github.com/imPBH/StockManager/assets/59230262/31fd1e14-45f5-482f-a230-df0d0602447b" height="500">

### Add a new article
Here is the page where users can add a new item from the scanned reference, they can choose to set an expiration date or not.

<img src="https://github.com/imPBH/StockManager/assets/59230262/7c3980ae-5883-4386-8cdf-996f4fdbdce8" height="500">

## Infrastructure
The project is built with the following technologies:
- ASP.NET API for the backend
- SQLite database
- Next.js for the web application
- Expo for the mobile application

The project is deployed using a DigitalOcean VPS on Ubuntu where the API, the database and the Next.js server are hosted with an Nginx reverse proxy.
You can see the project [here](http://stockmanager.alexisprovo.fr/login)
## Challenges

This project was very challenging for the whole team. This was our first time working with these languages/frameworks.

We had already worked with C#, but never made an API with ASP.NET and neither of us had worked with react and react native.

This was a pretty cool project, we learned a lot from it.
## Project organisation

We organized our project with Trello and used GitHub to deposit our code.

This is what the project's Trello looks like:

<img src="https://github.com/imPBH/StockManager/assets/59230262/fad481e7-9598-486c-a0d5-6d082eded6ba" height="600">

At the start of the project, we brainstormed together how to cut out the tasks to be carried out. First of all we divided the project into 3 parts:
- The back-end
- The web front-end
- The mobile front-end

Then we thought about what actions would be possible on the app. Thanks to this, we were then able to think about how to structure the database.

Once that was done, we thought about how to cut each of the 3 main parts into several sub-parts, for example: which endpoints should we create on the backend?

Each small task was then entered as a ticket in the Trello backlog with an order of priority to help us work on the most important parts first. Then we choose the tasks to be done and divide them between us.

Each ticket corresponds to a new branch on the git repository. Once we've completed our ticket, we can request a pull request. We therefore pass the ticket in review and wait for other team members to look at our work and validate it or request changes if necessary. Once it's validated, we merge our pull request on the main branch, and our ticket goes to done.
## Documentation

[Database documentation](https://github.com/imPBH/StockManager/blob/main/api/database/README.md)

[API documentation](https://github.com/imPBH/StockManager/tree/main/api/StockManagerApi/README.md)

[Web app documentation](https://github.com/imPBH/StockManager/blob/main/app/web/README.md)

[Mobile app documentation](https://github.com/imPBH/StockManager/blob/main/app/mobile/README.md)
## Authors

- [@imPBH](https://www.github.com/imPBH)
- [@nos193](https://www.github.com/nos193)
- [@Kasoro47](https://www.github.com/Kasoro47)

