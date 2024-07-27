let btnAdd = document.querySelector('#btn_add')
let modal1 = document.querySelector('.modal_1')
let modal2 = document.querySelector('.modal_2')
let arrowLeft = document.querySelector('.fa-arrow-left')
let windowClose = document.querySelector('#close')
let modal_container = document.querySelector('.modal_container')



if (token) {
    const modifyButton = document.querySelector('#modify-button');
    console.log(modifyButton)

    btnAdd.addEventListener('click', function(event) {
        console.log(event)
        modal1.classList.toggle('hidden')
        modal2.classList.toggle('hidden')
        arrowLeft.classList.toggle('hidden')
    })

    arrowLeft.addEventListener('click', function(event) {
        console.log(event);
        modal1.classList.remove('hidden');
        modal2.classList.add('hidden');
        arrowLeft.classList.add('hidden');
    });

    windowClose.addEventListener('click', function(event) {
        console.log(event);
        modal1.classList.remove('hidden');
        modal2.classList.add('hidden');
        modal_container.classList.add('hidden');
    });

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
}

    async function displayAllWorksOnModal() {
        try {
        await getWorksFromApi();

            let galleryContainer = document.querySelector('.gallery_photo');

            galleryContainer.innerHTML = '';

            works.forEach((work) => {
                let myFigure = document.createElement("figure");
                myFigure.setAttribute("data_category_id", work.categoryId);

                let myImg = document.createElement("img");
                myImg.setAttribute("src", work.imageUrl);
                myImg.setAttribute("alt", work.title);
                myFigure.appendChild(myImg);

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

    async function deleteProject(projectId) {
        try {
            await fetch(`http://localhost:5678/api/works/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            await displayAllWorks();
            await displayAllWorksOnModal()
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
                        <option value="2">Appartement</option>
                        <option value="3">Hotel & restaurants</option>
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

    addProjectForm.addEventListener('input', function(event) {
     const targetElement = event.target;
        console.log('targetElement', targetElement);

        const submitButton = addProjectForm.querySelector('button[type="submit"]');
        const photoInput = addProjectForm.querySelector('input[type="file"]');

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
        console.log(data)
        if (data) {
                alert('Projet ajouté avec succès');
                addProjectForm.reset();
                document.getElementById('previewImage').style.display = 'none';
                document.querySelector('.form-group-photo label').style.display = 'flex';
                document.querySelector('.form-group-photo p').style.display = 'block';
                document.querySelector('.form-group-photo i').style.display = 'block';
                displayAllWorks();
                console.log(works)
                displayAllWorksOnModal()
            } else {
                displayError(data.message || 'Une erreur est survenue lors de l\'ajout du projet.');
            }
        })
        .catch(error => {
            displayError('Une erreur est survenue lors de l\'ajout du projet.');
            console.error('Error:', error);
        });
});

function displayError(message) {
    const errorElement = document.createElement('div');
    errorElement.id = 'formError';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    const form = document.getElementById('addProjectForm');
    form.prepend(errorElement);
}