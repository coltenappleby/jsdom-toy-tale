let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});





function getToys() {

  function displayToys(toyJSON) {
    let toyCollection = document.querySelector("div#toy-collection")

    toyJSON.forEach(function(toy){
      let toyCard = document.createElement("div")
      toyCard.className = "card"
      toyCard.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p> ${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>`
      toyCollection.append(toyCard)
    })
  }
  fetch('http://localhost:3000/toys').then(response => response.json())
    .then(displayToys)
}