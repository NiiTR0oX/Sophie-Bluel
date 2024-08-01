// Récupération du token depuis le stockage de session
let token = sessionStorage.getItem("token")

// Vérification de l'existence du token
if(token) {

    // Sélection du lien de connexion et modification de son contenu
    let login_link = document.querySelector('#login_link')
    login_link.innerHTML = `<a id="nav-logout" class="only_admin" href="#">logout</a>`

    // Sélection de l'élément de déconnexion nouvellement créé
    let navLogout = document.querySelector('#nav-logout')

    // Ajout d'un événement au clic pour le bouton de déconnexion
    navLogout.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche le comportement par défaut du lien

        sessionStorage.removeItem("token"); // Suppression du token de la session

        window.location.reload(); // Rechargement de la page pour mettre à jour l'interface
    });

    // Création d'une barre de navigation pour les utilisateurs administrateurs
    let navBar = document.createElement('div');
        navBar.style.backgroundColor = 'black'; // Couleur de fond noire
        navBar.style.color = 'white'; // Couleur du texte blanche
        navBar.style.padding = '10px'; // Ajout de padding
        navBar.style.display = 'flex'; // Utilisation du flexbox pour le layout
        navBar.style.justifyContent = 'space-between'; // Espace entre les éléments
        navBar.style.alignItems = 'center'; // Alignement vertical au centre

        // Création d'un lien de modification
        let modifyLink = document.createElement('a');
        modifyLink.href = '#'; // Lien vide pour l'instant
        modifyLink.id = 'modify-button'; // ID pour le lien de modification
        modifyLink.style.color ='white'; // Couleur du texte blanche
        modifyLink.innerHTML = 'Modifier <i class="fa fa-edit"></i>'; // Texte et icône de modification

        // Ajout du lien de modification à la barre de navigation
        navBar.appendChild(modifyLink);
        document.body.insertBefore(navBar, document.body.firstChild); // Insertion de la barre de navigation en haut de la page

    // Ajout d'un bouton de modification à l'élément .modify
    let modify = document.querySelector('.modify')
        modify.innerHTML +=  `<div>
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Modifier</p>
        </div>`
        
    // Masquer le conteneur des boutons de catégorie
    buttonContainer.style.display ='none'
}