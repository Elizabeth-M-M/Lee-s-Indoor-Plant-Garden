// import key from "./environment.js";
// console.log(key)
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": ${environment.key},
    "X-RapidAPI-Host": "house-plants.p.rapidapi.com",
  },
};

fetch("https://house-plants.p.rapidapi.com/all", options)
  .then((response) => response.json())
  .then((responses) => responses.forEach(response=>{
    // console.log(response.category)
    displayPlantinCategory(response)
  }))
  .catch((err) => console.error(err));




function displayPlantinCategory(plant){
  const btns = document.querySelectorAll('.plantBtn');
  btns.forEach(btn=>{
    btn.addEventListener('click', (event)=>{
      if(btn.innerHTML === plant.category){
        if(plant.common[0]!==undefined){
          displayPlants(plant)
        // end of appending
        }
      }
    })
  })
  }
function displayPlants(plant){
    // console.log(plant)
    let storageForContainers = document.querySelector('.most-liked-width.container')

    let container = document.createElement('div');
    container.className=`container-card-holder withoutDits ${plant.category}`
    container.innerHTML=`
          <div class="container-card withoutDits">
            <img src="Images/front-succulent-display.jpg" alt="">
            <h3 id="plantName">${plant.common[0]}</h3>
            <button id="moreBtn" class="btn">More</button>
          </div>
          <div class="container-card-details invisible">
            <h2>Need to know about ${plant.common[0]}</h2>
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
          <div>
            <p>What type do you need?</p>
            <input type="checkbox" name="Artificial" id="artificial" value="artificial">
            <label for="vehicle1"> Artificial</label><br>
            <input type="checkbox" name="live" id="live" value="live">
            <label for="vehicle1"> Live</label><br>
          </div>
          <div class="width">
            <label for="height">Approximate height needed</label>
            <input type="text" name="height" id="height" placeholder="In cm">
          </div>
          <div class="width">
            <label for="location">Location</label>
            <input type="text" placeholder="Delivery location">
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


function removeUnnecesary(plants, category){
  // console.log(kids)
  for(let plant of plants){
    if(plant.classList[2]!==category){
      plant.remove()
    }
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
            console.log(modal.classList)
            console.log(overlay)

            modal.classList.remove("active");
            overlay.classList.remove("active")
        })
        })



        containerCards.forEach(card =>{
          let titleCard = card.querySelector('#plantName').innerHTML;
          let cardSibling = card.nextElementSibling;
          let cardParent = card.parentElement;
          if(cardSibling.classList.contains('invisible')){
          }else{
            if(title!==titleCard){
            console.log(title)
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
          console.log('hey')
          console.log(event.target)
        })
       })


        })
      })
  }
}


