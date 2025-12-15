# ShareFare

ShareFare is a simple web app where users can list surplus groceries or homemade
items they want to give away. Others can browse or search for listings, claim
them, and track donation history. Focus on building trust and clarity between
donors and recipients.

## Project structures

The project is currently structured into multiple directories. Mainly:

- `src` which contains the apps initialization logic.
- `src/types` which defines entities and models used throughout the application.
- `src/pages` which contains website pages.
- `src/components` which contains reusable components shared throughout pages.

## Running the app

The application is written using the React framework and Vite tooling. To
run the app, install its dependencies via `npm i` and run `npm run dev`

## User flows

Currently, the users can:

- list, sort and filter listed items based on his preferences.
- send messages to each other to discuss offered items.
- create and edit own listings.

We are planning to implement use cases where users can:

- list history and archive their listings or claimed items.
- cancel claimed items.

We will probably not deal with generic things where users could:

- update their settings.
- login using SSO or other providers.

## Data

The application contains mocked data. There is no need to seed it manually.
Just start the application and you will see items from bunch of users and
messages from these users.
