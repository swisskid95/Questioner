const addBtn = document.querySelector('.add-btn');
const hiddenForm = document.querySelector('.add-form');

const displayForm = () => {
  hiddenForm.style.display = hiddenForm.style.display === "none" ? "block" : "none";
}

addBtn.addEventListener('click', displayForm);