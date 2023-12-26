import { userID } from "..";
import { deleteCard, likeCrad, unlikeCards } from "./api";
import { picturesPopup, imgPopup, textImgPopup } from "./constants";
import { openPopup } from "./modal";


export function createCrads(card) {
  const cardsElement = document.querySelector('#cards-teamplate').content.querySelector('.cards__item').cloneNode(true);

  const cradsImg = cardsElement.querySelector('.cards__img');
  const cardsLike = cardsElement.querySelector('.cards__like-wraper');
  const placeName = cardsElement.querySelector('.cards__name');
  const cradsLikeImg = cardsElement.querySelector('.cards__button-like');
  const cardsLikeCounter = cardsElement.querySelector('.cards__like');
  const cardsDeleteImg = cardsElement.querySelector('.cards__button-delete');
  const likesNumber = card.likes;

  if(card.owner._id !== userID) {
    cardsDeleteImg.remove();
  }

  placeName.textContent = card.name;
  cradsImg.src = card.link;
  cradsImg.alt = card.name;

  cardsDeleteImg.addEventListener('click', () => {
    deleteCard(card._id)
    .then(() => {
      cardsElement.remove();
    })
  })

  cradsImg.addEventListener('click', ()=> {
    imgPopup.src = card.link;
    imgPopup.alt = card.name;
    textImgPopup.textContent = card.name;
    openPopup(picturesPopup);

  })

  if (likesNumber.length !== 0) {
    likesNumber.forEach(like => {
      if (like._id === userID) {
        cradsLikeImg.classList.add('cards__button-like_active');
      }
    });
  }


  // Update likes event listener
cradsLikeImg.addEventListener('click', () => {
  const isLiked = cradsLikeImg.classList.contains('cards__button-like_active');

  if (isLiked) {
    // If already liked, perform unlike
    unlikeCards(card._id)
      .then((updateCard) => {
        cardsLikeCounter.textContent = updateCard.likes.length;
        cradsLikeImg.classList.remove('cards__button-like_active');
      })
      .catch(error => {
        console.error('Error unliking card:', error);
      });
  } else {
    // If not liked, perform like
    likeCrad(card._id)
    .then((updateCard) => {
      cardsLikeCounter.textContent = updateCard.likes.length;
      cradsLikeImg.classList.add('cards__button-like_active');
    })
    .catch(error => {
      console.error('Error liking card:', error);
    });
  }
});

cardsLikeCounter.textContent = likesNumber.length;

  return cardsElement;
}

export function renderCrads(data, containerNode, position = "append") {
  const newCrad = createCrads(data);
  switch (position) {
    case "append":
      containerNode.append(newCrad);
      break;
    case "prepend":
      containerNode.prepend(newCrad);
      break;
    case "before":
      containerNode.before(newCrad);
      break;
    case "after":
      containerNode.after(newCrad);
      break;
    default:
      console.error('Invalid position value');
      break;
  }
}


