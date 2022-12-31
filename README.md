# Lee's Indoor Garden Shop
####Catering for your indoor gardening needs
### Owner
Program by Elizabeth Mwende Muthusi
### Date
15/12/2022.

### About the program

This is a mini web app/ page belonging to a person who sells indoor house plants. A user is able to get a vision of what he/ she wants to plant and select from a wide variety of categories depending on the user's needs.
You need to run the db.json server to work with this app that works concurrently with the external API.
If a user selects a plant from a particular category by clicking `More`, a pop up of the plant details will pop up showing different requirements needed to grow the plant, fun facts about its origin. If the user is interested, he will click the button `Interested`.
A pop up page again will then appear prompting the user to enter details pertaining to name, height of plant required, live or artificial, delivery location and telephone number. The user clicks on submit to submit the data.
If the user is not interested, they can close the pop up and continue browsing.
The main fetch requests (GET & POST) are in the `collection` section.

### Set up
#### External API
This project used an external API that gets all the data pertaining to the plant, except for the images, which is not available in that API.

#### db.json
This project required a set up of a local server to store our plant images to display plants when the external API fetches data of the plant. This API was also used to store our data for the couresel at the top of the page and also the users delivery information after submitting a form

#### HTML
The `index.html` structure was built out and divided into five sections; header, intro, most liked, other plant section and a footer section.

#### CSS
Using `style.css` and bootstrap, I built out the design of the page.

#### JavaScript
Using `index.js`, I built out the functionality of the app.
I also used `environment.js` to store the external API key.
The API key was imported from environment.js to `index.js` and used to fetch (GET) plants from the external API.

Since this API does not have images, I used half of the plants.
For the retrieved plants (half), in the event a button of specific categories are clicked, it calls the `displayPlantInCategory()` passing the plants and specific category of button labelled as the `property` variable.
In `displayPlantInCategory()`, when a button of a particular category is clicked, only plants belonging to that category are collected. The plants are then appended to the parent container and eventually displayed on the DOM.

After displaying, four functions are called to solve four problems.
- `removePlantsOfNotSameCategory(property)`
Upon clicking a button category, different plants pile on top of each other on the DOM even if not belonging to the category. This function removes plants not of the same category.
- `respectiveImage()`
The external API does not have images. The db.json stores the plants images according to their common names. The internal server has to be run to display images. Otherwise, when clicking on a particular category, only the plant name and `More` button are displayed without the image.
- `findPair()`
The api contains plants whose name `${plant.common[0]}` repeat, hence multiple displays, thus need to eliminate copies.
- `removeUndefinedTitles()`
One plant displayed undefined on the title `${plant.common[0]}` because there was no common name given on the external API, thus a need to remove it.

On the collection section containing the plants, it involves multiple events mostly involving buttons and clicks, modals appearing and dissapearing. There are two modals in this section, an overlay and multiple buttons. 

- When a user clicks the `More` button of a paricular plant, a modal becomes visible. `active` class is added to `modalMore` and `modalOverlay` to become visible.
- When `Interested` button is clicked, `active` class is removed from `modalMore` to make it invisible and added to `modalInterested` to make it visible.
- We want to hide all the modals and overlay when the overlay is clicked, hence `active` class is removed from `modalMore`, `modalInterested` and `modalOverlay`. We also want to hide all the modals and overlay when the x button is clicked, so we do the same action as the previous sentence.
- `Back` button is in the second modal, which when clicked goes back to the first modal, hence hide second modal (remove `active` class) and display first modal (add `active` class).
- In the event a user is interested in a plant, he/she can input the details and click `Order Now` to order. That data from the filled out form is then collected and function `verifyInputs(collected, form)` is called to verify no blank inputs only. Onced verification is done using `sum` variable, the data is then collected in variable `data` and assigned to their respective labels.

We finally store the data to our internal server (db.json) by fetch POST method and use it to contact the customer.

