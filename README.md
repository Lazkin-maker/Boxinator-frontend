# Boxinator

This is an application that acts as a box shipping service, built using React framework. The application work as a service to ship and track mystery boxes to people all around the world.

## Features
- Shipment functionality : which is made for both registered and no registered users. When the program runs the user will be directed to startup page "Guest page", and there the "Guest" user has ability to register himself as new user or login or just ignore it and send a new shipment.

- User functionality : It is made for users who are registered. When the user logs in, he/she will be able to see current and previous shipments that they made. They will also be able to modifie thier account information such as (mobile number, country , date of birth , etc.). A registered user can also create a new or cancel shipments.

- Admin dashboard: This page is only for users who have adminstrative roles. An admin has advanced features such as (see all shipments and their related info, edit status and other information for a specific shipment and edit country multiplier). 

- Security: For this part we have set up keycloak server to authorize and authenticated different users. Users are able to login/register themself by using "keycloak" form. 

## Rquirments
- Npm/Node.js
- React CRA (create-react-app)
- Visual Studio Code Text Editor/ IntelliJ
- Browser Developer Tools for testing and debugging
- React Dveloper Tools
- Git

# Team members
- [Lazkin Youssuf](https://github.com/Lazkin-maker)
- [Rubin Barclay](https://github.com/RubinBarclay)
-  [Jakob Mehamad Burhan](https://github.com/Jakob-mbi)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Project status
The project has achieved basic functionality, feel free to frok this project and add more features to make it more advanced. Some suggestions to work with:
1. Add some error handling. The project missing the ability to inform the user if something goes wrong.
2. Add email confirmation when a new shipment has created.

## License
This project is licensed under the MIT license. See [LICENSE.md](https://github.com/Lazkin-maker/Boxinator-frontend/blob/main/LICENSE.md) for more information.
