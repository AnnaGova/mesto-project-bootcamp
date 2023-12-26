
const cardsElement = document.querySelector('#cards-teamplate').content.querySelector('.cards__item').cloneNode(true);

function CreateCrads (card) {

  const cradsImg = cardsElement.querySelector('.cards__img');
  const cardsLike = cardsElement.querySelector('.cards__like-wraper');
  const placeName = cardsElement.querySelector('.cards__name');
  const placesList = document.querySelector('.cards__list');
  const formPlaces = document.forms['addPhotos'];
  const photosPopup = document.querySelector('.popup-photos');
  const picturesPopup = document.querySelector('.pictures-popup');
  const imgPopup = document.querySelector('.pictures-popup__img');
  const textPicPopup = document.querySelector('.pictures-popup__text');


  placeName.textContent = card.name;
  cradsImg.src = card.link;
  cradsImg.alt = card.name;

  //placesList.addEventListener('click', function(evt){
    //if (evt.target.classList.contains('cards__button-like')) {
      //evt.target.classList.toggle('cards__button-like_active');
    //}

    //i//f (evt.target.classList.contains('cards__button-delete')) {
      //const cardItem = evt.target.closest('.cards__item');
      //cardItem.remove();
    //}

    //if (evt.target.classList.contains('cards__img')) {
     // openPopup(picturesPopup);
      //imgPopup.src = evt.target.getAttribute('src');
      //imgPopup.alt = evt.target.getAttribute('alt');
      //Выбираем ближайшую карточку
      //const card = evt.target.closest('.cards__item')
      //Переменная для текста с карточки картинки
      //const cardtexts = card.querySelector('.cards__name').textContent;
      //Присваеваем текст блоку попап
      //textPicPopup.textContent = cardtexts;

    //}
//})

    return cardsElement

  };

  function renderCrads(data, containerNode, position = "append") {
    const newCrad = CreateCrads(card);
    switch (position) {
      case "appende":
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
        console.error('invalid position value');
        break;
    }
  }
