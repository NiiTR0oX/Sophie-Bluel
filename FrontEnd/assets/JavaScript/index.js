// Sélection de la galerie dans le DOM

const gallery = document.querySelector(".gallery");

const buttonContainer = document.querySelector("#categories");

// Déclaration des variables pour les travaux et les catégories

let works = [];
let categories = [];

// Fonction pour récupérer les travaux depuis l'API

async function getWorksFromApi() {
 await fetch("http://localhost:5678/api/works")
    .then((response) => {
        console.log(response) // Affiche la réponse de l'API dans la console
         return response.json();
    }).then((datas) => {
        console.log(datas) // Affiche les données reçues dans la console
      works = datas; // Stocke les données dans la variable works
    }).catch((error) => {
      console.log(error); // Affiche l'erreur en cas d'échec de la requête
    });
}

// Fonction pour afficher tous les travaux

async function displayAllWorks() {
  try {

 await getWorksFromApi(); // Appel de la fonction pour récupérer les travaux
  gallery.innerHTML = "" // Réinitialise le contenu de la galerie
  console.log(gallery) // Affiche l'élément galerie dans la console
  console.log(works) // Affiche les travaux récupérés dans la console
  works.forEach((work, index) => { // Parcours des travaux pour les afficher
    let myFigure = document.createElement("figure");
    myFigure.setAttribute("data_category_id", work.categoryId)

    let myImg = document.createElement("img");
    myImg.setAttribute("src", work.imageUrl);
    myImg.setAttribute("alt", work.title);
    myFigure.appendChild(myImg);

    let myFigCaption = document.createElement("figcaption");
    myFigCaption.textContent = work.title;
    myFigure.appendChild(myFigCaption);
    gallery.appendChild(myFigure); // Ajout de la figure à la galerie
  });
  } catch (error) {
    console.error('Erreur lors de l\'affichage des travaux:', error); // Affiche l'erreur en cas de problème
}
}
displayAllWorks(); // Appel de la fonction pour afficher tous les travaux

// Fonction pour récupérer les catégories depuis l'API

async function getCategoriesFromApi() {
  await fetch("http://localhost:5678/api/categories")
      .then((response) => {
        console.log(response)
        return response.json();
      }).then ((datas) => {
          console.log(datas)
          categories = datas;
      }).catch((error) => {
        console.log(error);
      });
}

// Fonction pour afficher toutes les catégories

async function displayAllCategories() {
    await getCategoriesFromApi(); // Appel de la fonction pour récupérer les catégories
    console.log(categories); // Affiche les catégories récupérées dans la console
    categories.unshift({ id: 0, name: "Tous" // Ajoute la catégorie "Tous" en premier

    })
    categories.forEach((category, index) => { // Parcours des catégories pour les afficher
      console.log(category); // Affiche la catégorie actuelle dans la console
      
      let button = document.createElement("button");
      button.innerText = category.name;
      button.setAttribute("class", "button")
      button.setAttribute("data_category_id", category.id)
      button.addEventListener('click', (event) => { // Ajoute un événement de clic au bouton
        const categoryId = event.target.getAttribute("data_category_id")
        const categoryButtons = document.querySelectorAll("#categories button")
        for (let categoryButton of categoryButtons){
          if (categoryButton.getAttribute("data_category_id") === categoryId) {
            categoryButton.classList.add("button_active") // Active le bouton sélectionné
          }else {
            categoryButton.classList.remove("button_active") // Désactive les autres boutons
          }
        }
        const Myfigures = document.querySelectorAll(".gallery figure")
        if (categoryId === "0") { // Si la catégorie est "Tous"
          Myfigures.forEach((figure, index)=> {
            figure.classList.remove("hidden") // Affiche tous les travaux
          })

        }else {
          Myfigures.forEach((figure, index)=> {
            figure.classList.remove("hidden") // Réinitialise les figures cachées
          })
          Myfigures.forEach((figure, index)=> {
            const figureCategory = figure.getAttribute("data_category_id")
            if (categoryId !== figureCategory) {
              console.log("match")
              figure.classList.toggle("hidden") // Cache les travaux ne correspondant pas à la catégorie
            } 
          })
        }

      })
      buttonContainer.appendChild(button)
 });
}
displayAllCategories();