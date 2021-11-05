# ![Scale-Up Velocity](./readme-files/logo-main.png) Final 1 - URL shortner 📎

## Sexyurl shortner

A url shortner site that can recieve a long and ugly url and attached to it a shorter url that is built from my site url along with a unique id that helps us to redirect to the original url you have chosen to get shorten.

## extra features

I added a "go pro " version , in real working shorturl services you can pay money to have the abbility to chose your own slug . when you press the go pro button and extra input will pop on the screen and you can add you own personal slug , and if its not taken you can have it !

## project basic structure

Project build from back side (server dir) and front side(front dir+dist) , the project was built with webpack .

## repl.it link

https://replit.com/@SimpleLogic420/cyber4s-final1-boilerplate-url-shortener#index.js

HAVE FUN!

### Misc

- [x] **Add workflow scripts**
  - [x] build - webpack build ./web into ./public folder
  - [x] dev - start a nodemon server && start webpack dev server
  - [x] deploy to heroku

### Front

- [x] **make better design**
- [x] **home page** - /app
  - [x] url shorten input -> POST /api/shrten/ { url: <input url> }
  - [x] bootstrap sexy design
  - [x] nice error display
- [x] **stats page** /app/<UID>
  - [x] requests the stats from -> GET /api/stats/<UID>
  - [x] error display
  - [x] add dashboard with stats display:
    - [x] locations of requests
    - [x] unique requesters
    - [ ] usage graph

### Back

- [x] POST /api/shorten/ { url: <input url> }
  - [x] validate url
  - [x] check if already was shortened
  - [x] return the shorterned url
  - [x] check if uid is realy unique
- [x] GET /<UID>
  - [x] store user req data
  - [x] redirect to the URL
- [x] GET /app
  - [x] serve the static from ./public folder
- [x] GET /api/stats/<UID>
  - [x] respond with JSON of the stats
- [x] **refactoring**
