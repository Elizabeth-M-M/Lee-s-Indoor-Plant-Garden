# Lee's Indoor Garden Shop
####Catering for your indoor gardening needs
### Owner
Program by Elizabeth Mwende Muthusi
### Date
15/12/2022.

### About the program
This is a mini web app/ page belonging to a person who sells indoor house plants. A user is able to get a vision of what he/ she wants to plant and select from a wide variety of categories depending on the user's needs.
If a user selects a plant from a particular category by clicking `More`, a pop up of the plant details will pop up showing different requirements needed to grow the plant, fun facts about its origin. If the user is interested, he will click the button `Interested`.
A pop up page again will then appear prompting the user to enter details pertaining to name, height of plant required, live or artificial, delivery location and telephone number. The user clicks on submit to submit the data.
If the user is not interested, they can close the pop up and continue browsing.

### Set up
#### External API
This project used an external API that gets all the data pertaining to the plant, except for the images, which is not available in that API.

#### db.json
This project required a set up of a local server to store our plant images to display plants when the external API fetches data of the plant. This API was also used to store our data for the couresel at the top of the page and also the users delivery information after submitting a form

#### HTML
The `index.html` structure was built out and divided into five sections; header, intro, most liked, other plant section and a footer section.

#### CSS
Using `stye.css`, I built out the design of the page.

#### JavaScript
Using `index.js`, I built out the functionality of the app.
I also used `environment.js` to store the external API key.

- Once the DOM loads, data is first fetched from both the external and internal server and called in the functions `loadPlantsFromExternalServer()` and `getDataForCarousel()` for the respective APIs. The first function fetches the plant details and the second the data for the top of the web page.

`getDataForCarousel()` gets data and calls the `displayCourosel(responses)` to display the courosel.

For the `loadPlantsFromExternalServer()`, respective plant category's name was stored in a button. When the button of a particulay category is clicked, `displayPlants(plant)` is called that creates a div with an innerHTML of details of the plant. The div is then appended to the container element with the query selector `.most-liked-width.container`.
`fetchImagesInternally()` is then called to fetch images of the plant displayed.