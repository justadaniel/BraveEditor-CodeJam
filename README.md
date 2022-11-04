# BraveEditor (CodeJam)

This time for _CodeJam_, I wanted to make an app that can assist me with all of my data-related needs. Introducing BraveEditor, a cross-platform desktop app that allows quest designers to create their own quests for an engine-agnostic video game while not having to deal with the nuances of a game engine running all the time. The app exports a file that can then be ingested into a game engine, such as Unity or Unreal, or even your own custom engine. The way it's set up is very modular thanks to React and can have features built into it with ease. The goal in the future would be to incorporate localization and dialogue into the pipeline.

**Tech Used:** React, Vite, Cordova, Electron, Framework7, TypeScript, SCSS/SASS

## "CodeJam" Background

I set aside a little bit of my time to participate in what I call, _CodeJam_. CodeJam is what I call my personal "game jam" however it doesn't need to fall into the category of video games.

Game Jam _(noun)_: an event in which video game developers work in groups to conceptualize, design, and build a functioning version of one or more game projects over a restricted period of a few hours or days.

## Features

-   Dynamic Navigation
-   Dark Mode (for obvious reasons)
-   Open a Quests File (use `quests.json` in the `./testsave` folder)
-   GUID Based Identification System
-   Framework7 & DOM7 for GUI Management
-   Data is stored in `.json` files _(for easy source control)_
-   `Store` class for internal data management

#### Quests

-   Change a Quest's Details
-   Modify/Reorder Quest Clear Conditions
-   Modify Quest Rewards
-   Write a Description for the user to see

## Install Dependencies

First of all we need to install dependencies, run in terminal

```
npm install
```

## NPM Scripts

-   🔥 `start` - run development server
-   🔧 `dev` - run development server
-   🔧 `build` - build web app for production
-   📱 `build-cordova` - build cordova app
-   🖥 `cordova-electron` - run dev build cordova Electron app

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.

## Documentation & Resources

### Framework7

-   [Core Documentation](https://framework7.io/docs/)
-   [React Documentation](https://framework7.io/react/)

### Electron

There is also cordova Electron platform installed. To learn more about it and Electron check this guides:

-   [Cordova Electron Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/electron/index.html)
-   [Official Electron Documentation](https://electronjs.org/docs)

## Screenshots

<img src="docs/0.gif" width="640"/>

<em>Loading the quests file.</em>

<img src="docs/1.gif" width="640"/>

<em>Editing the Quest called "A Tablet's Worth" and make it a mission that is required to be completed to finish the game.</em>

<img src="docs/2.gif" width="640"/>

<em>Removing the quest step from "The Battle Within" and saving the changes.</em>
