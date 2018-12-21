const addMeetupBtn = document.querySelector('.add-meetup-btn');
const meetupForm = document.querySelector('.add-meetup-form');

const displayMeetupForm = () => {
  // console.log(meetupForm.style.display);
  meetupForm.style.display = meetupForm.style.display === "none" ? "block" : "none";
}

addMeetupBtn.addEventListener('click', displayMeetupForm);