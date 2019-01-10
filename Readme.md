# Questioner 
____
[![Build Status](https://travis-ci.com/swisskid95/Questioner.svg?branch=develop)](https://travis-ci.com/swisskid95/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/swisskid95/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/swisskid95/Questioner?branch=develop)

 **Questioner** is a tool that allows you **crowd-source** for contributions on an upcomming **Meetup** with questions to be treated.

#### The UI template

The template for the front end of this application can be found here [UI template](https://swisskid95.github.io/Questioner/UI/index.html) 

#### The Application

The main application is hosted here [Questioner](https://sanusi-questioner-server.herokuapp.com/api/v1)

#### The Pivotal Tracker Story link can be found here [PT stories](https://www.pivotaltracker.com/n/projects/2232638)

#### The Endpoint

This currently contain *8 endpoints* 

__listed below are the endpoints http verbs and the details:__

____

**>- GET api/v1/meetups**
____
   Gets all meetups from record
  

**>- POST api/v1/meeptups**
____
   Creates a new meetup

**>- GET api/v1/meetups/:<meetupsID>**
____
   Gets meetup with specified id from record

**>- POST api/v1/meetups/<meetupID>/rsvp**
____
  Adds a meetup to rsvp list

**>- GET api/v1/meetups/upcoming**
   Gets all meetups that have not occured yet

**>- POST api/v1/questions**
____
   Create a question in the question record

**>- PATCH api/v1/question/<questionID>/upvote**
   Increases question with specified id's vote by 1

**>- PATCH api/v1/question/<questionID>/downvote**
   Decreases question with specified id's vote by 1

#### work still in progress
