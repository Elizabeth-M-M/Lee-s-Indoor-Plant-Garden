// imported api key from environment.js
import keyForUse from "./environment.js";
let currentItem = 0;
let storageForContainers = document.querySelector('.most-liked-width.container');

// When DOM loads, start of the page carousel works with the buttons and plants are loaded
document.addEventListener('DOMContentLoaded', ()=>{
 loadPlantsFromExternalServer();
 getDataForCarousel()

})
// fetch half of data from external API
function loadPlantsFromExternalServer(){
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key":keyForUse,
        "X-RapidAPI-Host": "house-plants.p.rapidapi.com",
      },
    };
    fetch("https://house-plants.p.rapidapi.com/all", options)
      .then((response) => response.json())
      .then((responses) => {
        const half = Math.ceil(responses.length / 2);
        const firstHalf = responses.slice(0, half);
        firstHalf.forEach(response=>{
          displayPlantinCategory(response)
        })
      })
      .catch((err) => console.error(err));
}
// Plants are displayed according to the category they fall under using click event listener
function displayPlantinCategory(plant){
  const btns = document.querySelectorAll('.plantBtn');
  btns.forEach(btn=>{
    btn.addEventListener('click', (event)=>{
      if(btn.innerHTML === plant.category){
        if(plant.common[0]!==undefined){
          displayPlants(plant);
        }
      }
    })
  })
}
// Display plants
function displayPlants(plant){    
    let container = document.createElement('div');
    container.className=`container-card-holder withoutDits ${plant.category}`
    container.innerHTML=`
          <div class="container-card withoutDits">
            <img src="" alt="">
            <h3 id="plantName">${plant.common[0]}</h3>
            <button id="moreBtn" class="btn">More</button>
          </div>
          <div class="container-card-details invisible">
            <h2>Need to know about <span> ${plant.common[0]}</span></h2>
            <h4>watering</h4>
            <p>${plant.watering}</p>
            <h4>Ideal light</h4>
            <p>${plant.ideallight}</p>
            <h4>Origin: <span>${plant.origin}</span></h4>
            <h4>Use: <span>${plant.use[0]}</span></h4>
            <button class="btn btn-dark" data-modal-target="#modal" id="openModal">Interested</button>
          </div>
          <div class="modal" id="modal">
            <div class="modal-header">
              <h3><span>${plant.common[0]}</span> is a great pick</h3>
              <button data-close-modal id="closeModal">&times;</button>
            </div>
            <form >
              <div class="width">
                  <label for="name">Name</label>
                  <input type="text" name="fullname" id="fullname" placeholder="Your name here">
                </div>
                <div class="width">
                  <label for="plant type">Which plant type do  you need?</label><br>
                  <input type="text" name="artificial/live" id="artificialOrLive" placeholder="Artificial/Live">
                </div>
                <div class="width">
                  <label for="height">Approximate height needed</label>
                  <input type="text" name="height" id="height" placeholder="In cm">
                </div>
                <div class="width">
                  <label for="location">Location</label>
                  <input type="text" placeholder="Delivery location" id="delivery">
                </div>
                <div class="width">
                  <label for="contact">Telephone Number</label>
                  <input type="tel" name="telephone" placeholder="+254..." id="telephone">
                </div>
                <input class="btn btn-dark" type="submit" value="Order Now">
            </form>
        </div>
      <!-- overlay -->
          <div id="overlay"></div>
  `
  storageForContainers.appendChild(container);
  // remove kids of container that do not belong to the plant.category
  let kids = storageForContainers.children;
  removeUnnecesary(kids, plant.category)
}
// The external api does not have image sources, so images are fetched from the internal api
function fetchImagesInternally(){
  fetch('http://localhost:3000/plantPics')
  .then(resp=>resp.json())
  .then(greeneries=>greeneries.forEach(greenery=>{
  let cards = document.querySelectorAll('.container-card.withoutDits')
  // console.log(cards)
  cards.forEach(card=>{
    let title= card.querySelector('#plantName');
    if(title.innerHTML=== greenery.name){
      let image= title.previousElementSibling;      
      image.src=greenery.img;
    }
  })
  }))
}


function removeUnnecesary(plants, category){
  // console.log(kids)
  for(let plant of plants){
    if(plant.classList[2]!==category){
      plant.remove()
    }
    fetchImagesInternally()
    let moreBtns=document.querySelectorAll('#moreBtn')
    // console.log(moreBtns)
    moreBtns.forEach(more=>{
      more.addEventListener('click', ()=>{
        // console.log(more.parentElement)
        let containerCards = document.querySelectorAll('.container-card')
        let parent1 =more.parentElement;
        let grandparent = parent1.parentElement;
        let title = parent1.querySelector('#plantName').innerHTML;
        let parentSibling = parent1.nextElementSibling;
        parent1.classList.remove('withoutDits');
        grandparent.classList.remove('withoutDits');
        parentSibling.classList.remove('invisible');
        const openModalButtons = document.querySelectorAll('#openModal');
        const closeModalButtons = document.querySelectorAll('#closeModal');
        // console.log(closeModalButtons)



        openModalButtons.forEach(btn=>{
          btn.addEventListener('click', () => {
            let modal = btn.parentElement.nextElementSibling;
            let overlay = modal.nextElementSibling;
            modal.classList.add("active");
            overlay.classList.add("active");
            // console.log(modal.classList)
        })
        })
        closeModalButtons.forEach(btn=>{
          btn.addEventListener('click', () => {
            let modalChild = btn.parentElement
            let modal = modalChild.parentElement;
            let overlay = modal.nextElementSibling;
            let detailsDiv =modal.previousElementSibling;
            let containerCard = detailsDiv.previousElementSibling;
            let parent = detailsDiv.parentElement

            // console.log(modal.classList)
            // console.log(overlay)

            modal.classList.remove("active");
            overlay.classList.remove("active")
            detailsDiv.classList.add('invisible')
            containerCard.classList.add('withoutDits')
            parent.classList.add('withoutDits')

        })
        })



        containerCards.forEach(card =>{
          let titleCard = card.querySelector('#plantName').innerHTML;
          let cardSibling = card.nextElementSibling;
          let cardParent = card.parentElement;
          if(cardSibling.classList.contains('invisible')){
          }else{
            if(title!==titleCard){
            // console.log(title)
            cardSibling.classList.add('invisible')
            card.classList.add('withoutDits')
            cardParent.classList.add('withoutDits')
            }
          }
       })

       let forms=document.querySelectorAll('form')
      //  console.log(forms)
       forms.forEach(form=>{
        form.addEventListener('submit', (event)=>{
          event.preventDefault();
          // console.log('hey')
          // console.log(event.target)
          let formSelected = event.target
          collectDeliveryInfo(formSelected)

        })
       })


        })
      })
  }
}


function collectDeliveryInfo(form){
    let tel= form.querySelector('#telephone').value;
    let delivery= form.querySelector('#delivery').value;
    let height= form.querySelector('#height').value;
    let fullname= form.querySelector('#fullname').value;
    let plantType= form.querySelector('#artificialOrLive').value;
    // console.log(tel, delivery, height, fullname, plantType)
    let data = {
      "name": fullname,
      "plantType":plantType,
      "height":height,
      "delivery": delivery,
      "telephoneNumber":tel,
    }
    // postData(data)
}
// Post is not working; To resolve
function postData(data){

  fetch('http://localhost:3000/orders',{
    method: 'POST',
    headers:{
      'Content-Type':"application/json",
    },
    body:JSON.stringify(data)
  }).then(response=>response.json())
  .then(data=>console.log(data))
}
let header = document.querySelector('.header-content-main h1');
  let headerP = document.querySelector('.header-content-main p');
  let headerImage = document.querySelector('.header-img img');
  let right = document.querySelector('#right');
  let left = document.querySelector('#left');

function getDataForCarousel(){
fetch(`http://localhost:3000/startSection`)
.then(resp=>resp.json())
.then(responses=>{
  displayCourosel(responses)

})
}
function displayCourosel(responses){

  if(currentItem>responses.length-1){
    currentItem=0;
  }else if(currentItem<0){
currentItem=responses.length-1
  }
  let item = responses[currentItem]
  header.innerHTML=item.title
  headerP.innerHTML=item.text
  headerImage.src=item.image

}
right.addEventListener('click', ()=>{

currentItem++
  // console.log(currentItem)
  getDataForCarousel();


})
left.addEventListener('click', ()=>{
  currentItem--
  // console.log(currentItem)
  getDataForCarousel();
})
