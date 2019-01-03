"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addMeetup = exports.getMeetups = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var meetups = [{
  id: 1,
  createdOn: new Date('January 20, 2018'),
  location: '7a, Mobolaji way Ikeja, Lagos.',
  images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
  topic: 'meetup 1',
  happeningOn: new Date('Febraury 6, 2018')
}, {
  id: 2,
  createdOn: new Date('June 19, 2018'),
  location: '15, Allwhite avenue, Ikotun, Lagos.',
  images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
  topic: 'meetup 2',
  happeningOn: new Date('October 1, 2018')
}, {
  id: 3,
  createdOn: new Date('December 5, 2018'),
  location: '131, oshodi/apapa road Oshodi/Isolo, Lagos.',
  images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
  topic: 'meetup 3',
  happeningOn: new Date('January 14, 2019')
}];

var getMeetups = function getMeetups() {
  return meetups;
};

exports.getMeetups = getMeetups;

var addMeetup = function addMeetup(meetup) {
  var meetupToDb = {};
  var nextId = meetups.length + 1;
  meetupToDb.id = nextId;
  meetupToDb.createdOn = new Date(meetup.createdOn.trim());
  meetupToDb.location = meetup.location.trim();
  meetupToDb.images = _toConsumableArray(meetup.images);
  meetupToDb.topic = meetup.topic.trim();
  meetupToDb.happeningOn = new Date(meetup.happeningOn.trim()); // Push data to meetup

  meetups.push(meetupToDb);
  return [meetupToDb];
};

exports.addMeetup = addMeetup;