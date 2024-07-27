const gallery = document.querySelector(".gallery");

const buttonContainer = document.querySelector("#categories");

let works = [];
let categories = [];

async function getWorksFromApi() {
 await fetch("http://localhost:5678/api/works")
    .then((response) => {
        console.log(response)
         return response.json();
    }).then((datas) => {
        console.log(datas)
      works = datas;
    }).catch((error) => {
      console.log(error);
    });
}

async function displayAllWorks() {
  try {

 await getWorksFromApi();
  gallery.innerHTML = ""
  console.log(gallery)
  console.log(works)
  works.forEach((work, index) => {
    let myFigure = document.createElement("figure");
    myFigure.setAttribute("data_category_id", work.categoryId)

    let myImg = document.createElement("img");
    myImg.setAttribute("src", work.imageUrl);
    myImg.setAttribute("alt", work.title);
    myFigure.appendChild(myImg);

    let myFigCaption = document.createElement("figcaption");
    myFigCaption.textContent = work.title;
    myFigure.appendChild(myFigCaption);
    gallery.appendChild(myFigure);
  });
  } catch (error) {
    console.error('Erreur lors de l\'affichage des travaux:', error);
}
}
displayAllWorks();

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

async function displayAllCategories() {
    await getCategoriesFromApi();
    console.log(categories);
    categories.unshift({ id: 0, name: "Tous"

    })
    categories.forEach((category, index) => {
      console.log(category);
      
      let button = document.createElement("button");
      button.innerText = category.name;
      button.setAttribute("class", "button")
      button.setAttribute("data_category_id", category.id)
      button.addEventListener('click', (event) => {
        const categoryId = event.target.getAttribute("data_category_id")
        const categoryButtons = document.querySelectorAll("#categories button")
        for (let categoryButton of categoryButtons){
          if (categoryButton.getAttribute("data_category_id") === categoryId) {
            categoryButton.classList.add("button_active")
          }else {
            categoryButton.classList.remove("button_active")
          }
        }
        const Myfigures = document.querySelectorAll(".gallery figure")
        if (categoryId === "0") {
          Myfigures.forEach((figure, index)=> {
            figure.classList.remove("hidden")
          })

        }else {
          Myfigures.forEach((figure, index)=> {
            figure.classList.remove("hidden")
          })
          Myfigures.forEach((figure, index)=> {
            const figureCategory = figure.getAttribute("data_category_id")
            if (categoryId !== figureCategory) {
              console.log("match")
              figure.classList.toggle("hidden")
            } 
          })
        }

      })
      buttonContainer.appendChild(button)
 });
}
displayAllCategories();