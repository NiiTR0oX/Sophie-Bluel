// Sélection des éléments du DOM
let btnAdd = document.querySelector('#btn_add')
let modal1 = document.querySelector('.modal_1')
let modal2 = document.querySelector('.modal_2')
let arrowLeft = document.querySelector('.fa-arrow-left')
let windowClose = document.querySelector('#close')
let modal_container = document.querySelector('.modal_container')

// Vérifie si l'utilisateur est connecté (token présent)
if (token) {
    // Sélectionne le bouton de modification dans la barre de navigation
    const modifyButton = document.querySelector('#modify-button');
    console.log(modifyButton)

    // Événement au clic pour afficher les modals
    btnAdd.addEventListener('click', function(event) {
        console.log(event)
        modal1.classList.toggle('hidden')
        modal2.classList.toggle('hidden')
        arrowLeft.classList.toggle('hidden')
    })

    // Événement au clic pour revenir à la première modal
    arrowLeft.addEventListener('click', function(event) {
        console.log(event);
        modal1.classList.remove('hidden');
        modal2.classList.add('hidden');
        arrowLeft.classList.add('hidden');
    });
    // Événement au clic pour fermer la fenêtre modale
    windowClose.addEventListener('click', function(event) {
        console.log(event);
        modal1.classList.remove('hidden');
        modal2.classList.add('hidden');
        modal_container.classList.add('hidden');
    });
    // Événement au clic sur le bouton de modification pour afficher la modal
    modifyButton.addEventListener('click', function(event) {
        console.log(event)
        event.preventDefault();
        showModal(); // Affiche la modal
        displayAllWorksOnModal() // Affiche tous les travaux dans la modal
    });

    // Événement au clic sur l'élément de modification pour afficher la modal
    let modify = document.querySelector('.modify')

    modify.addEventListener('click', function(event) {
        console.log(event)
        event.preventDefault();
        showModal(); // Affiche la modal
        displayAllWorksOnModal() // Affiche tous les travaux dans la modal
    });

    // Fonction pour afficher la modal
    function showModal() {
        let modal = document.querySelector('.modal_container')
        console.log(modal)
        modal.classList.toggle('hidden')   
    }
}

    // Fonction pour afficher tous les travaux dans la modal
    async function displayAllWorksOnModal() {
        try {
        await getWorksFromApi(); // Récupère les travaux depuis l'API

            let galleryContainer = document.querySelector('.gallery_photo');

            galleryContainer.innerHTML = ''; // Réinitialise le contenu de la galerie
            
            // Parcours des travaux et affichage dans la modal
            works.forEach((work) => {
                let myFigure = document.createElement("figure");
                myFigure.setAttribute("data_category_id", work.categoryId);

                let myImg = document.createElement("img");
                myImg.setAttribute("src", work.imageUrl);
                myImg.setAttribute("alt", work.title);
                myFigure.appendChild(myImg);

                // Ajout d'un bouton de suppression pour chaque travail
                let deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                let trashIcon = document.createElement('i');
                    trashIcon.classList.add('fa-solid', 'fa-trash-can');
                deleteButton.appendChild(trashIcon);
                deleteButton.addEventListener('click', function() {
                    console.log(`Supprimer le projet avec l'ID: ${work.id}`);
                    deleteProject(work.id); // Supprime le projet
                });
                myFigure.appendChild(deleteButton);

                galleryContainer.appendChild(myFigure); // Ajout de la figure au conteneur de la galerie
            });
        } catch (error) {
            console.error('Erreur lors de l\'affichage des travaux:', error);
        }
    }

    // Fonction pour supprimer un projet
    async function deleteProject(projectId) {
        try {
            await fetch(`http://localhost:5678/api/works/${projectId}`, {
                method: 'DELETE', // Méthode de suppression
                headers: {
                    'Authorization': `Bearer ${token}`, // Token pour l'autorisation
                    'Content-Type': 'application/json'
                }
            });
            await displayAllWorks(); // Met à jour l'affichage des travaux
            await displayAllWorksOnModal() // Met à jour l'affichage des travaux dans la modal
        } catch (error) {
            console.error('Erreur lors de la suppression du projet:', error);
        }
    }

    // Fonction pour afficher le formulaire d'ajout de projet
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
                        <option value="2">Appartement</option>
                        <option value="3">Hotel & restaurants</option>
                        <!-- Ajouter d'autres options de catégorie si nécessaire -->
                    </select>
                </div>
                <hr>
                <button type="submit" id="addProjectSubmit" disabled>Valider</button>
            </form>
        `;
        modal2.innerHTML = formHtml; // Ajoute le formulaire dans la modal2

        // Affichage de l'aperçu de l'image sélectionnée
        document.getElementById('projectImage').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const previewImage = document.getElementById('previewImage');
                previewImage.src = e.target.result; // Affiche l'image sélectionnée
                previewImage.style.display = 'block';
            };
    
            if (file) {
                reader.readAsDataURL(file); // Lit le fichier pour l'aperçu
            }
        });
    }
    
    displayAddProjectForm(); // Affiche le formulaire d'ajout de projet

// Sélection du formulaire d'ajout de projet
let addProjectForm = document.querySelector('#addProjectForm')

// Événement pour l'affichage de l'aperçu de l'image
document.getElementById('projectImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const previewImage = document.getElementById('previewImage');
        previewImage.src = e.target.result;
        previewImage.style.display = 'block';

        // Masque les éléments inutiles après la sélection de l'image
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

    // Événement pour vérifier si tous les champs du formulaire sont remplis
    addProjectForm.addEventListener('input', function(event) {
     const targetElement = event.target;
        console.log('targetElement', targetElement);

        const submitButton = addProjectForm.querySelector('button[type="submit"]');
        const photoInput = addProjectForm.querySelector('input[type="file"]');

        // Active ou désactive le bouton de soumission
        if  (addProjectForm.elements[0].value !== "" && addProjectForm.elements[1].value !== "" && addProjectForm.elements[2].value !== "") {
            submitButton.classList.add('active');
            submitButton.removeAttribute('disabled');
            submitButton.style.backgroundColor = '#1D6154';
        }else {
            submitButton.classList.remove('active');
            submitButton.setAttribute('disabled', 'true');
            submitButton.style.backgroundColor = ''; 
        }
    });

// Événement pour soumettre le formulaire d'ajout de projet
 addProjectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupération des valeurs du formulaire
    const projectName = document.getElementById('projectName').value;
    const projectCategory = document.getElementById('projectCategory').value;
    const projectImage = document.getElementById('projectImage').files[0];

        // Vérifie si tous les champs sont remplis
        if (!projectName || !projectCategory || !projectImage) {
            displayError('Tous les champs sont requis.');
            return;
        }

    // Création d'un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append('title', projectName); // Ajoute le nom du projet
    formData.append('category', projectCategory); // Ajoute la catégorie du projet
    formData.append('image', projectImage); // Ajoute l'image du projet

    // Envoie des données du formulaire à l'API
    fetch('http://localhost:5678/api/works', {
        method: 'POST', // Méthode de requête POST
        headers: {
            'Authorization': `Bearer ${token}`, // Autorisation avec le token
        },
        body: formData // Corps de la requête contenant les données du formulaire
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data) {
                alert('Projet ajouté avec succès'); // Affiche un message de succès
                addProjectForm.reset(); // Réinitialise le formulaire
                document.getElementById('previewImage').style.display = 'none'; // Masque l'aperçu de l'image
                document.querySelector('.form-group-photo label').style.display = 'flex'; // Réaffiche le label
                document.querySelector('.form-group-photo p').style.display = 'block'; // Réaffiche le paragraphe
                document.querySelector('.form-group-photo i').style.display = 'block'; // Réaffiche l'icône
                displayAllWorks(); // Met à jour l'affichage des travaux
                console.log(works)
                displayAllWorksOnModal() // Met à jour l'affichage des travaux dans la modal
            } else {
                displayError(data.message || 'Une erreur est survenue lors de l\'ajout du projet.'); // Affiche une erreur si le projet n'a pas été ajouté
            }
        })
        .catch(error => {
            displayError('Une erreur est survenue lors de l\'ajout du projet.'); // Affiche une erreur en cas de problème avec la requête
            console.error('Error:', error);
        });
});

// Fonction pour afficher un message d'erreur
function displayError(message) {
    const errorElement = document.createElement('div'); // Crée un nouvel élément div pour l'erreur
    errorElement.id = 'formError'; // Attribue un ID à l'élément
    errorElement.style.color = 'red'; // Style le texte en rouge
    errorElement.innerText = message; // Ajoute le message d'erreur
    const form = document.getElementById('addProjectForm'); // Sélectionne le formulaire
    form.prepend(errorElement); // Ajoute l'erreur en haut du formulaire
}