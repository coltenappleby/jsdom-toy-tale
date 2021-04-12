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



let toyCollection = document.querySelector("div#toy-collection")
toyCollection.addEventListener('click', event => {
  if (event.target.className == "like-btn") {
    const toyElement = event.target.closest("div")
    // console.log(toyElement)
  
  

  const patchObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toyElement.querySelector("p").textContent) + 1
    })
  }

  fetch(`http://localhost:3000/toys/${toyElement.dataset.id}`, patchObj)
    .then(resp => resp.json())
    .then(toy => toyElement.querySelector("p").textContent = `${toy.likes} likes`)

  }
})




//event => console.log(event.target)

function getToys() {

  toyCollection.innerHTML = ``
  function displayToys(toyJSON) {
    // let toyCollection = document.querySelector("div#toy-collection")

    toyJSON.forEach(renderOneToy)
  }

  fetch('http://localhost:3000/toys').then(response => response.json())
    .then(displayToys)
}

const addToyForm = document.querySelector("form.add-toy-form")
addToyForm.addEventListener("submit", event => {
  event.preventDefault()

  const name = addToyForm.name.value
  const image = addToyForm.image.value

  const newToy = {name, image, likes:0}

  const fetchObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }

  fetch("http://localhost:3000/toys", fetchObj)
    .then(resp => resp.json())
    .then(renderOneToy)
  
  addToyForm.reset()  

})

function renderOneToy(toy){
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  toyCard.dataset.id = toy.id
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p> ${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
  toyCollection.append(toyCard)
}

function updateLike(toy) {


}