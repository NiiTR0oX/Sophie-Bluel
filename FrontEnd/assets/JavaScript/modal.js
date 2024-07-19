// récupérer le bouton modifier via le modAdmin.js dans la variable //
// mettre un écouteur d'evenement sur le bouton au click et dans cette écouteur d'evenement faire apparaitre la modale//
// export const modifyButton = document.querySelector('#modify-button');

// import { modifyButton } from './modAdmin.js';


// let token = sessionStorage.getItem("token");
let btnAdd = document.querySelector('#btn_add')
let modal1 = document.querySelector('.modal_1')
let modal2 = document.querySelector('.modal_2')
let arrowLeft = document.querySelector('.fa-arrow-left')
let windowClose = document.querySelector('#close')



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
        arrowLeft.classList.toggle('hidden')
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

    function displayAddProjectForm() {

        const formHtml = ` 
            <form id="addProjectForm" enctype="multipart/form-data" method="POST" action="/">
            <div>
            
            </div>
            <div>
            <h3>Ajout photo</h3>
            </div>
            <div class="form-group-photo">
                    <i class="fa-regular fa-image" aria-hidden="true"></i>
                    <label for="projectImage">+ Ajouter une photo</label>
                    <input type="file" id="projectImage" name="projectImage" accept="image/*" required>
                    <img id="previewImage" src="#" alt="Aperçu de l'image" style="display: none; width: 26%; height: auto;"/>
                    <p>jpg, png : 4mo max</p>
                </div>
                <div class="form-group">
                    <label for="projectName">Titre</label>
                    <input type="text" id="projectName" name="projectName" required>
                </div>
                <div class="form-group">
                    <label for="projectCategory">Catégorie</label>
                    <select id="projectCategory" name="projectCategory" required>
                        <option value="1">Objet</option>
                        <option value="categorie2">Appartement</option>
                        <option value="categorie3">Hotel & restaurants</option>
                        <!-- Ajouter d'autres options de catégorie si nécessaire -->
                    </select>
                </div>
                <hr>
                <button type="submit" id="addProjectSubmit" disabled>Valider</button>
            </form>
        `;
        modal2.innerHTML = formHtml;


    
        document.getElementById('projectImage').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const previewImage = document.getElementById('previewImage');
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }
    
    displayAddProjectForm();

let addProjectForm = document.querySelector('#addProjectForm')

//    document.addEventListener('DOMContentLoaded', function() {

//     const form = document.getElementById('projectForm');

document.getElementById('projectImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';
        const photoI = document.querySelector('#addProjectForm .form-group-photo i')
        photoI.style.display ='none';

        const photoLabel = document.querySelector('#addProjectForm .form-group-photo label')
        photoLabel.style.display ='none';

        const photoP = document.querySelector('#addProjectForm .form-group-photo p')
        photoP.style.display= 'none';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// addProjectForm.addEventListener('input' , function(event) {
//     const targetElement = event.target;
//     console.log('targetElement', targetElement);
//         if (addProjectForm.elements[0].value !== "" && addProjectForm.elements[1].value !== "" && addProjectForm.elements[2].value !== "") {
//         //changer la classe et mettre une classe active et je retire l'attribut disabled
//             // document.getElementById('addProjectSubmit').classList.add('active');
//             // document.getElementById('addProjectSubmit').removeAttribute('disabled');
//         }else {
//         // changer la et enlever une classe active et mettre l'attribut disabled*
//             // document.getElementById('addProjectSubmit').classList.remove('active');
//             // document.getElementById('addProjectSubmit').setAttribute('disabled', 'disabled');
//     }
// })

    addProjectForm.addEventListener('input', function(event) {
     const targetElement = event.target;
        console.log('targetElement', targetElement);

        const submitButton = addProjectForm.querySelector('button[type="submit"]');
        const photoInput = addProjectForm.querySelector('input[type="file"]');

        if  (addProjectForm.elements[0].value !== "" && addProjectForm.elements[1].value !== "" && addProjectForm.elements[2].value !== "") {
            // photoInput.files.length > 0) {
        
        // Ajouter une classe active, retirer l'attribut disabled, et changer la couleur en vert
            submitButton.classList.add('active');
            submitButton.removeAttribute('disabled');
            submitButton.style.backgroundColor = '#1D6154'; // Change la couleur du bouton en vert
        }else {
        // Enlever la classe active, ajouter l'attribut disabled, et remettre la couleur d'origine
            submitButton.classList.remove('active');
            submitButton.setAttribute('disabled', 'true');
            submitButton.style.backgroundColor = ''; // Remet la couleur d'origine du bouton
        }
    });

addProjectForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const projectCategory = document.getElementById('projectCategory').value;
    const projectImage = document.getElementById('projectImage').files[0];

        if (!projectName || !projectCategory || !projectImage) {
            displayError('Tous les champs sont requis.');
            return;
        }

    const formData = new FormData();
    formData.append('title', projectName);
    formData.append('category', projectCategory);
    formData.append('image', projectImage);


    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
                alert('Projet ajouté avec succès');
                addProjectForm.reset();
                document.getElementById('previewImage').style.display = 'none';
            } else {
                displayError(data.message || 'Une erreur est survenue lors de l\'ajout du projet.');
            }
        })
        .catch(error => {
            displayError('Une erreur est survenue lors de l\'ajout du projet.');
            console.error('Error:', error);
        });
});

// function clearErrors() {
//     const errorElement = document.getElementById('formError');
//     if (errorElement) {
//         errorElement.remove();
//     }
// }

function displayError(message) {
    const errorElement = document.createElement('div');
    errorElement.id = 'formError';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    const form = document.getElementById('addProjectForm');
    form.prepend(errorElement);
}

// displayAddProjectForm();

//         let valid = true;

//         if (!projectName) {
//             showError('projectNameError', 'Le nom du projet est requis.');
//             valid = false;
//         }

//         if (!projectDescription) {
//             showError('projectDescriptionError', 'La description du projet est requise.');
//             valid = false;
//         }

//         if (!startDate) {
//             showError('startDateError', 'La date de début est requise.');
//             valid = false;
//         }

//         if (!endDate) {
//             showError('endDateError', 'La date de fin est requise.');
//             valid = false;
//         }

//         if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
//             showError('endDateError', 'La date de fin doit être postérieure à la date de début.');
//             valid = false;
//         }

//         if (valid) {
//             const projectData = {
//                 projectName,
//                 projectDescription,
//                 startDate,
//                 endDate
//             };

//             fetch('http://localhost:5678/api/works', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(projectData)
//             })
//             .then(response => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error('Erreur réseau lors de l\'envoi du formulaire.');
//             })
//             .then(data => {
//                 if (data.success) {
//                     alert('Projet ajouté avec succès !');
//                     form.reset();
//                 } else {
//                     alert('Une erreur est survenue : ' + data.message);
//                 }
//             })
//             .catch(error => {
//                 console.error('Erreur:', error);
//                 alert('Une erreur est survenue lors de l\'envoi des données.');
//             });
//         }

//     function showError(elementId, message) {
//         const errorElement = document.getElementById(elementId);
//         if (errorElement) {
//             errorElement.textContent = message;
//         }
//     }

//     function clearErrors() {
//         document.querySelectorAll('.error').forEach(error => error.textContent = '');
//     }

// // });


// // Gérer les 3 champs en vérifiant qui ne sont pas vide si il ne le sont pas vide, activer le bouton le tout dans une function