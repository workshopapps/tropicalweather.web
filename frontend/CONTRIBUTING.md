# Weathery App

## Table of Contents

- [Weathery App](#weathery-app)
  - [Table of Contents](#table-of-contents)
  - [IMPORTANT!!! : OPEN YOUR PULL REQUESTS ON `dev` BRANCH, NOT `main`](#important--open-your-pull-requests-on-dev-branch-not-main)
  - [Getting started](#getting-started)
  - [Working on your assigned task](#working-on-your-assigned-task)
  - [Styleguides](#styleguides)
      - [Layout](#layout)
  - [Opening Pull requests](#opening-pull-requests)
  - [Other Information](#other-information)

## IMPORTANT!!! : OPEN YOUR PULL REQUESTS ON `dev` BRANCH, NOT `main`

First off, thanks for taking the time to be part of this awesome project ❤️

All Team members contribution are valued and encouraged, therefore, do not hesitate to contribute. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for the Team leads and PR Leads and smooth out the experience for all involved. Can't wait to collaborate and build an elegant Weather Application 🎉

## Getting started

> If this is your first time contributing, follow these simple steps to get the project set up on your machine

- Clone the repo to your machine, don't fork the repo `git clone https://github.com/workshopapps/weathery.web.git`
- Go into the front-end folder `cd frontend` and run `npm install` to get all dependencies
- Run `npm run prepare` to setup husky hooks. This ensures your code follows the style guide before commits are made
- Run `npm start` to start the development server and view the project in your browser
  - If you run into this eslint issue `Expected Linebreaks To Be ‘Lf’ But Found ‘Crlf’` just run `npm run lint` and it'll be fixed. Different PCs use different linebreak styles so this is common.

## Working on your assigned task

In order to contribute to this project, the entire process follows the following structure

- Ensure you have a ticket assigned to you on [Linear](https://linear.app/team-gear/team/FRO/all)
- Run `git pull` on the dev branch to ensure you have the most up-to-date changes
- Create a new branch from the dev branch. Your branch name should have the prefix `fe-` to signify it is a frontend branch. E.g `git checkout -b fe-home_page`
- Commit your changes in atomic manner with clear messages using this [guide](https://www.conventionalcommits.org/en/v1.0.0/)
- Once you're done, push your changes to github and open a pull request for your branch. Reach out to Ibimina/Sodiq so it can be reviewed and merged.


## Styleguides

We advocate for clean code and well structured codes. It is easier said than done, which is why there are linting configurations set up in the repository. Endeavour to keep the code you write clean and maintainable. Software is not only a science, but also an art.

We're utilizing eslint as our style guide

- Your file names should end with `.jsx`
- Your component names should be in PascalCase and it should match the filename. E.g `HomePage.jsx` should have a component name of `HomePage`
- Add any Page component to the `pages` folder. If you have a component that is repeated several times in your project, consider converting it to a reusable component and store it in the `components` folder
- This project utilizes [Tailwind CSS](https://tailwindcss.com/) for styling. If you feel more comfortable with Vanilla CSS, keep your stylesheets in the `styles` folder.
- Make sure the name of the stylesheet matches the name of the component you're working on.
- Import your stylesheet inside the correspoding components not `index.jsx`
- Refer to the official [Eslint](https://eslint.org/docs/latest/) doc if you don't understand any of the rules it enforces
- Run `npm run lint` to check/fix linting errors

#### Layout

We have created a layout to ensure the DRY principle is followed. This layout contains the header and footer so you page component stays in-between.

How to use it:

- Head on to App.jsx to see the current structure
- If the page you're working on isn't part of the current Routes;
  - Create a new page component for it in the `pages` folder
  - Import it into App.jsx and add it to the Routes
- If the page you're working on is part of the current Routes;
  - Continue updating the page component in the `pages` folder


```jsx
// App.jsx
import MyPage from './pages/MyPage';
...
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      ...
      <Route path="/my-page" element={<MyPage />} />
    </Route>,
  ),
);
```


## Opening Pull requests

  Now that you have updated your online copy. You will need a way to inform the PR Leads handling the original repository that your contribution is ready. To do that, you open a Pull request, which simply means that you want them to combine(merge) your changes with that of the original repository. Because, what is the essence of making changes without the changes being merged right?

  To open a pull request, immediately after the last step (commiting your changes with push):

  - Head over to the weathery.web repo. And switch to the branch you made changes to.
  - You should see a button that says `Contribute`. Click it and open a pull request. 
  - Create your pull request with the title of your Linear ticket
  - Explain what your changes does, adding images and proof (test) if needed. Add a link to your linear ticket as well for easy access
  - Click the open pull request button and wait.
  - Add comments where neccesary and wait for the PR Leads to check.


## Other Information

- Check if there are any linting errors by running `npm run lint` before commiting your code.
- Please make sure your commit messages and pr titles give enough info about the changes you've made.

- ### Pull Requests

  - Take note of all instructions above
  - The main branch for development would be the **DEVELOP** branch
  - Do not make a pull request with changes to the main branch
  - Whatever task it is that you do must be responsive on all screens
  - Make sure your commit messages and PR title are precise and meaningful, no..."it is now working" or "finally" commit messages, else your PR may not be merged
  - Add a screenshot of what it is that you've worked on for all screens...mobile, tab, desktop screens
  - Make sure your branch is up to date with the dev branch and without conflicts before making your pull request, if not your PR may not be merged
  - Push your code as soon as you can [ASAP]
  - Link whatever ticket it is that you worked on to your pull request
  - Add all other neccessary links you may have to your pull request inluding the link to the design
  - In the comment section of the pull request, document your work thoroughly(a helpful description)
  - In a situation where you work on functional parts add a show `what it does` video if you can
  - Do `git fetch` at least twice a day to be up to date with the repo
  - Always do a git fetch or pull of the main branch before you write code and before making your pull request
  - Your pull request must not change the work of others
  - Your work should be pixel perfect