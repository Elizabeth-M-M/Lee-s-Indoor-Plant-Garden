
// imported api key from environment.js
import keyForUse from "/js/environment.js";

const plantBtns = document.querySelectorAll('.plant-btn');
const container = document.querySelector('.plantBoxHolder')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': keyForUse,
		'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
	}
};
// When the DOM loads, the fetch (GET) request is done
document.addEventListener('DOMContentLoaded', ()=>{
  retrievePlants();
})
// fetch plants from the external API
function retrievePlants(){
fetch('https://house-plants.p.rapidapi.com/all', options)
	.then(response => response.json())
	.then(plants => {
    useOnlyHalfOfplants(plants)
  })
	.catch(err => console.error(err));
}
// retrieve half of plants(since this API does not have images)
function useOnlyHalfOfplants(plants){
  let plantsCollected = []
  let half =plants.length/2
  plants.forEach(plant=>{
    if(plant.id<=half){
      plantsCollected.push(plant)
    }
  })
  // For the retrieved plants (half), in the event a button of specific categories are clicked, it calls the displayPlantInCategory() passing the plants and specific category of button (property)
  plantBtns.forEach(btn=>
    {
      btn.addEventListener('click', (event)=>{
        let property = btn.innerHTML;
        displayPlantInCategory(plantsCollected, property);
      })
    })
}
// to display selected plants in category to the DOM
function displayPlantInCategory(plants, property){
  plants.forEach(plant=>{
    // When a button of a particular category is clicked, only plants belonging to that category are collected
    if(plant.category===property){
      let insect = plant.insects.toString()
      let box= document.createElement('div');
      box.classList= `plantBox col-lg-3 col-md-4 col-sm-6 ${plant.category}`
      box.innerHTML=`
        <div class="boxCard card">
          <div class="card-body">
            <img src="" class="img-fluid pb-2" alt="">
            <h4 id="plantName" class="card-title">${plant.common[0]}</h4>
            <a class="btn btn-success" id="moreBtn" role="button">More</a>
          </div>
        </div>
        <div class="modals modalMore bg-light">
          <h4 class="text-center">Taking care of<span class="contrast-color"> ${plant.common[0]}</span></h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Origin: <span class="contrast-color">${plant.origin}</span></li>
            <li class="list-group-item">Use: <span class="contrast-color">${plant.use[0]}</span></li>
            <li class="list-group-item">Watering: <span class="contrast-color">${plant.watering}</span></li>
            <li class="list-group-item">Ideal light: <span class="contrast-color">${plant.ideallight}</span></li>
            <li class="list-group-item">Tolerated light: <span class="contrast-color">${plant.toleratedlight}</span></li>
            <li class="list-group-item">Insects that affect them: <span class="contrast-color">${insect}</span></li>
          </ul>
          <button class="btn btn-success w-100" id="interestedBtn">Interested</button>
        </div>
        <div class="modals modalInterested bg-light" id="modal">
          <div class="modal-title">
            <h3><span class="contrast-color plantName">${plant.common[0]}</span> is a great pick</h3>
            <button class="contrast-color ms-3" id="closeModal">&times;</button>
          </div>
          <form class="text-start">
            <div>
              <label for="name" class="col-form-label">Name</label>
              <input type="text" name="fullname" id="fullname" class="form-control" placeholder="Your name here">
              <small class="small mt-1 ms-2">Fill in a name</small>
            </div>
            <div>
              <label for="plant type" class="col-form-label">Which plant type do you need?</label><br>
              <input type="text" name="artificial/live" id="artificialOrLive" class="form-control" placeholder="Artificial/Live">
              <small class="small mt-1 ms-2">Fill in which type you want</small>
            </div>
            <div>
              <label for="height" class="col-form-label">Approximate height needed</label>
              <input type="text" name="height" id="height" class="form-control" placeholder="In cm">
              <small class="small mt-1 ms-2">Fill in a height</small>
            </div>
            <div>
              <label for="location" class="col-form-label">Location</label>
              <input type="text" class="form-control" id="delivery">
              <small class="small mt-1 ms-2">Fill in a delivery location</small>
            </div>
            <div>
              <label for="contact" class="col-form-label">Telephone Number</label>
              <input type="tel" name="telephone" placeholder="+254..." class="form-control" id="telephone">
              <small class="small mt-1 ms-2">Fill in a telephone number</small>
            </div>
            <div class="mt-3">
              <a class="btn btn-success" id="backBtn" role="button">Back</a>
              <button class="btn btn-success" type="submit" id="orderBtn">Order Now</button>
            </div>
          </form>
        </div>
        <div class="modals modalSuccess bg-light" id="modal">
          <div class="modal-title">
            <h3>Awesome</h3>
            <p>We'll contact you as soon as possible.</p>
          </div>
        </div>
        <div id="overlay"></div>
      `
      container.appendChild(box);
    }
  })
  // explanations for these functions are given above each function
  removePlantsOfNotSameCategory(property);
  respectiveImage();
  findPair();
  removeUndefinedTitles();
  // This targeted the more button to show more details
  let btns = document.querySelectorAll('#moreBtn')
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      moreDetails(btn);
    })
  })
}
// The api does not have images. The db.json stores the plants images according to their common names. The server has to be run to display images.
function respectiveImage(){
  let names = document.querySelectorAll("#plantName");
  fetch('http://localhost:3000/plantPics')
  .then(resp=>resp.json())
  .then(images=>{
    names.forEach(name=>{
      images.forEach(image=>{
        if(name.innerHTML===image.name){
          let plantImage= name.previousElementSibling;
          plantImage.src=image.img
        }
      })
    })
  })
}
// Upon clicking a button category, different plants pile on top of each other on the DOM even if not belonging to the category. This function removes plants not of the same category.
function removePlantsOfNotSameCategory(property){
  let plantBoxes = document.querySelectorAll(".plantBox");
  plantBoxes.forEach(plantBox=>{
    if(plantBox.classList.contains(property)){
    }else{
      plantBox.remove();
    }
  })
}
// One plant displayed undefined on the title (common[0]) because there was no common name given, thus a need to remove it.
function removeUndefinedTitles(){
  let names = document.querySelectorAll("#plantName");
  names.forEach(name=>{
    let parentBox= name.parentElement.parentElement.parentElement
    if(name.innerHTML==='undefined'){
      parentBox.remove();
    }
  })
}
// The api contains plants whose name (common[0]) repeat, hence multiple displays, thus need to eliminate copies.
function findPair(){
  let plantNames=document.querySelectorAll('#plantName')
  for (let i = 0; i < plantNames.length; i++) {
    for (let j = i + 1; j < plantNames.length; j++) {
      if (plantNames[i].innerHTML === plantNames[j].innerHTML) {
        let parentBox= plantNames[i].parentElement.parentElement.parentElement;
        parentBox.remove();
      }
    }
  }
}
// This is centered around the plant collection with multiple events mostly involving buttons and clicks. To display or hide the modals, active class is added or removed depending on what the user anticipates.
function moreDetails(btn){
    let title= btn.previousElementSibling.innerHTML;
    let box =btn.parentElement.parentElement.parentElement;
    let modalMore=box.querySelector('.modalMore')
    let modalInterested=box.querySelector('.modalInterested')
    let modalOverlay=box.querySelector('#overlay');
    let form = box.querySelector('form');
    let smalls = form.querySelectorAll('small');
    let inputs = form.querySelectorAll('.form-control');

    // When more button is clicked, active class is added to modalMore and modalOverlayto become visible
    modalMore.classList.add('active');
    modalOverlay.classList.add('active');
    // When interested button is clicked, active class is removed from modalMore to make it invisible and added to modalInterested to make it visible
    box.querySelector('#interestedBtn').addEventListener('click', ()=>{
      modalMore.classList.remove('active')
      modalInterested.classList.add('active');
    })
    // We want to hide all the modals and overlay when the overlay is clicked
    modalOverlay.addEventListener('click', ()=>{
      modalOverlay.classList.remove('active');
      modalMore.classList.remove('active');
      modalInterested.classList.remove('active');
      removeInputs(smalls, inputs);
    })
    // We also want to hide all the modals and overlay when the x button is clicked
    box.querySelector('#closeModal').addEventListener('click', ()=>{
      modalOverlay.classList.remove('active');
      modalMore.classList.remove('active');
      modalInterested.classList.remove('active');
      removeInputs(smalls, inputs);
    })
    // back button is in the second modal, which when clicked goes back to the first modal, hence hide second modal and display first modal
    box.querySelector('#backBtn').addEventListener('click', ()=>{
      modalMore.classList.add('active')
      modalInterested.classList.remove('active')
    })
    // In the event a user is interested in a plant, he/she can input the details and click submit to order
    box.querySelector('form').addEventListener('submit', (event)=>{
      event.preventDefault();
      collectOrderedPlantDetails(box);
    })
}
// remove prefilled inputs
function removeInputs(smalls, inputs){
  smalls.forEach(small=>{
        small.classList.remove('active');
      })
      inputs.forEach(input=>{
        input.classList.remove('filled');
        input.classList.remove('notFilled');
        input.value='';
      })
}
// On submission of form for plant order, data is collected.
function collectOrderedPlantDetails(box){
  let form = box.querySelector('form');
  let tel= form.querySelector('#telephone');
  let delivery= form.querySelector('#delivery');
  let height= form.querySelector('#height');
  let fullname= form.querySelector('#fullname');
  let plantType= form.querySelector('#artificialOrLive');
  let collected= [fullname, plantType, height, delivery, tel];
  verifyInputs(collected, form);
}
// The collected data is verified only for a blank input
function verifyInputs(items, form){
  let inputs=form.querySelectorAll('.form-control');
  let formParent = form.parentElement;
  let plant=formParent.querySelector(".plantName").innerHTML;
  let sum=0
  // Look through each input to verify it's not ""
  items.forEach(item=>{
  displayVerified(item)
  })
  // if input is filled, a class of filled is added to the inputs classlist. The sum adds up how many inputs are filled
  inputs.forEach(input=>{
    if(input.classList.contains('filled')){
      sum+=1;
    }
  })
  // When the sum equals the inputs length, the data is then collected in variable data and assigned to their respective labels
  if(sum===inputs.length){
    let data = {
      "plant":plant,
      "name": items[0].value,
      "plantType":items[1].value,
      "height":items[2].value,
      "delivery": items[3].value,
      "telephoneNumber":items[4].value,
    }
    // We store the data to our internal server by fetch POST method
    postData(data);
  }
}
// called in function verifyInputs() to look through each input to verify it's not "". par parameter represents item (input) argument
function displayVerified(par){
 let small;
  if(par.value===""){
    small= par.nextElementSibling;
    small.classList.add('active');
    par.classList.add('notFilled');
  }else{
    small= par.nextElementSibling;
    small.classList.remove('active');
    par.classList.remove('notFilled');
    par.classList.add('filled');
  }
}
// We store the data to our internal server by fetch POST method
function postData(data){
  fetch('http://localhost:3000/orders',{
    method: 'POST',
    headers:{
      'Content-Type':"application/json",
    },
    body:JSON.stringify(data)
  }).then(response=>response.json())
  .then(resp=>console.log(resp))
  .catch(err=>console.error(err))
}
// to solve, plant category buttons when clicked delay starting