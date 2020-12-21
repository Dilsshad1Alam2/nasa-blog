const postContainer = document.querySelector(".post-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const apiKey = "g7fb8Jml0fiGoQK5syKykVfmS6iZrTDZBUTWnc6w";
const count = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Populating the DOM;
function buildDOM() {

    resultsArray.forEach((result) => {
    //create a div with card class    
    const card = document.createElement('div');
    card.classList.add('card');

    //creating a clickable image
    const clickableLinkForImage = document.createElement('a');
    clickableLinkForImage.href = result.hdurl;
    clickableLinkForImage.target = '_blank'
    clickableLinkForImage.title = 'View Full Image'
    //Image of the clickable image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the day';
    image.classList.add('card-img-top');

    //create div for the card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    //Image Title
    const imageTitle = document.createElement('h5');
    imageTitle.classList.add('card-title');
    imageTitle.textContent = result.title;
    //clickable add to favourites
    const addToFavourites = document.createElement('p');
    addToFavourites.classList.add('clickable');
    addToFavourites.textContent = 'Add to favourites';
    //card text(explanation)
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.explanation;

    //building card-body
    cardBody.append(imageTitle,addToFavourites,cardText);
    
    //appending img to link
    clickableLinkForImage.append(image);

    //appending image and card-body to card
    card.append(clickableLinkForImage,cardBody);

    //appending card to post-container
    postContainer.append(card);


    });

}

//fetch request from the api
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    buildDOM();
  } catch (e) {
    console.log(e);
  }
}
getNasaPictures();
