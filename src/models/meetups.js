const meetups = [
  {
    id: 1,
    createdOn: new Date('January 20, 2018'),
    location: '7a, Mobolaji way Ikeja, Lagos.',
    images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
    topic: 'meetup 1',
    happeningOn: new Date('Febraury 6, 2018'),
  },
  {
    id: 2,
    createdOn: new Date('June 19, 2018'),
    location: '15, Allwhite avenue, Ikotun, Lagos.',
    images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
    topic: 'meetup 2',
    happeningOn: new Date('October 1, 2018'),
  },
  {
    id: 3,
    createdOn: new Date('December 5, 2018'),
    location: '131, oshodi/apapa road Ikeja, Lagos.',
    images: ['http://img1.com', 'http://img2.com', 'http://img3.com'],
    topic: 'meetup 3',
    happeningOn: new Date('January 14, 2019'),
  },
];

const getMeetups = () => meetups;

export default getMeetups;
