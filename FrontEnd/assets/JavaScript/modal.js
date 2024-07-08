// récupérer le bouton modifier via le modAdmin.js dans la variable //
// mettre un écouteur d'evenement sur le bouton au click et dans cette écouteur d'evenement faire apparaitre la modale//
// export const modifyButton = document.querySelector('#modify-button');

// import { modifyButton } from './modAdmin.js';


// let token = sessionStorage.getItem("token");
let btnAdd = document.querySelector('#btn_add')
let modal1 = document.querySelector('.modal_1')
let modal2 = document.querySelector('.modal_2')



if (token) {
    const modifyButton = document.querySelector('#modify-button');
    console.log(modifyButton)
    // let login_link = document.querySelector('#login_link');
    // login_link.innerHTML = `<a id="nav-logout" class="only_admin" href="#">logout</a>`;

    // let navLogout = document.querySelector('#nav-logout');

    // navLogout.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     sessionStorage.removeItem("token");
    //     window.location.reload();
    // });

    //

    btnAdd.addEventListener('click', function(event) {
        console.log(event)
        modal1.classList.toggle('hidden')
        modal2.classList.toggle('hidden')
    })

    modifyButton.addEventListener('click', function(event) {
        console.log(event)
        event.preventDefault();
        showModal();
        displayAllWorksOnModal()
    });

    let modify = document.querySelector('.modify')

    modify.addEventListener('click', function(event) {
        console.log(event)
        event.preventDefault();
        showModal();
        displayAllWorksOnModal()
    });

    function showModal() {
        let modal = document.querySelector('.modal_container')
        console.log(modal)
        modal.classList.toggle('hidden')   
    }
    
    // async function showModalGallery(){
    //     // await getWorksFromApi()
    //     // works.forEach((work, index) => {
        
    //     // })

    //     // récupérer avec un queryselector <div class="gallery_photo"></div> en injectant avec le projet
    //     // je dois injecter les figures des projets
    //     // faire une boucle
    //     // mettre le bouton avec la poubelle
                
    // }
}

    async function displayAllWorksOnModal() {
        try {
            let works = await getWorksFromApi();

            let galleryContainer = document.querySelector('.gallery_photo');

            galleryContainer.innerHTML = '';

            works.forEach((work) => {
                let myFigure = document.createElement("figure");
                myFigure.setAttribute("data_category_id", work.categoryId);

                let myImg = document.createElement("img");
                myImg.setAttribute("src", work.imageUrl);
                myImg.setAttribute("alt", work.title);
                myFigure.appendChild(myImg);

                // let myFigCaption = document.createElement("figcaption");
                // myFigCaption.textContent = work.title;
                // myFigure.appendChild(myFigCaption);

                let deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                let trashIcon = document.createElement('i');
                    trashIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteButton.appendChild(trashIcon);
                // deleteButton.innerHTML = '&#128465;';
                deleteButton.addEventListener('click', function() {
                    console.log(`Supprimer le projet avec l'ID: ${work.id}`);
                    deleteProject(work.id);
                });
                myFigure.appendChild(deleteButton);

                galleryContainer.appendChild(myFigure);
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage des travaux:', error);
        }
    }

    async function getWorksFromApi() {
        try {
            let response = await fetch("http://localhost:5678/api/works");
            let works = await response.json();
            return works;
        } catch (error) {
            console.error('Erreur lors de la récupération des travaux:', error);
            return [];
        }
    }

    async function deleteProject(projectId) {
        try {
            await fetch(`http://localhost:5678/api/works/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            displayAllWorks();
            displayAllWorksOnModal()
        } catch (error) {
            console.error('Erreur lors de la suppression du projet:', error);
        }
    }

   function displayAddProjectForm () {

    // modifier la génération du html pour avoir la balise image / le titre en input et la catégorie avec un select
    // input de type file avec la balise image(Filereader)
    
    //changer les champs de form id="addProjectForm" enctype="multipart/form-data" method="POST" action="/"
    
    const formHtml = `
        <form id="addProjectForm" enctype="multipart/form-data" method="POST" action="/">
            <div class="form-group">
                <label for="projectName">Nom du projet</label>
                <input type="text" id="projectName" name="projectName" required>
            </div>
            <div class="form-group">
                <label for="projectDescription">Description</label>
                <textarea id="projectDescription" name="projectDescription" required></textarea>
            </div>
            <button type="submit" id="addProjectSubmit">Ajouter le projet</button>
        </form>
    `;
    modal2.innerHTML = formHtml;
}

displayAddProjectForm()

let addProjectForm = document.querySelector('#addProjectForm')

//    document.addEventListener('DOMContentLoaded', function() {

//     const form = document.getElementById('projectForm');

    addProjectForm.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        // changer les champs après avoir modifier le html à la 147
        // refaire la validation
        // faire un appel API

        const projecttitle= document.getElementById('projectName').value.trim();
        const projectDescription = document.getElementById('projectDescription').value.trim();
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        let valid = true;

        if (!projectName) {
            showError('projectNameError', 'Le nom du projet est requis.');
            valid = false;
        }

        if (!projectDescription) {
            showError('projectDescriptionError', 'La description du projet est requise.');
            valid = false;
        }

        if (!startDate) {
            showError('startDateError', 'La date de début est requise.');
            valid = false;
        }

        if (!endDate) {
            showError('endDateError', 'La date de fin est requise.');
            valid = false;
        }

        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            showError('endDateError', 'La date de fin doit être postérieure à la date de début.');
            valid = false;
        }

        if (valid) {
            const projectData = {
                projectName,
                projectDescription,
                startDate,
                endDate
            };

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projectData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erreur réseau lors de l\'envoi du formulaire.');
            })
            .then(data => {
                if (data.success) {
                    alert('Projet ajouté avec succès !');
                    form.reset();
                } else {
                    alert('Une erreur est survenue : ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur est survenue lors de l\'envoi des données.');
            });
        }
    });

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
    }

// });


// Gérer les 3 champs en vérifiant qui ne sont pas vide si il ne le sont pas vide, activer le bouton le tout dans une function