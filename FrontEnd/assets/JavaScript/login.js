// Sélection du formulaire de connexion dans le DOM
const loginForm = document.querySelector('#user_login_form');

// Sélection de l'input email et de l'élément d'affichage des erreurs pour l'email
const emailInput = loginForm.querySelector('input[type="email"]');
const emailError = document.querySelector('.emailerror');

// Sélection de l'input mot de passe
const passwordInput = loginForm.querySelector('input[type="password"]');

// Fonction pour se connecter à l'API
async function loginToApi(email, password) {
  try {
      const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST', // Méthode de requête POST
          headers: {
              'Content-Type': 'application/json', // Type de contenu JSON
          },
          body: JSON.stringify({ email, password }), // Conversion des données en chaîne JSON
      });

      if (!response.ok) { // Vérifie si la réponse n'est pas correcte
          throw new Error(`HTTP error! status: ${response.status}`); // Lance une erreur avec le statut HTTP
      }

      return await response.json(); // Retourne les données JSON
  } catch (error) {
      console.error('Erreur lors de la requête de connexion:', error); // Affiche l'erreur en cas de problème
      throw error; // Relance l'erreur pour la gestion ultérieure
  }
}

// Fonction pour valider les entrées du formulaire
function validateInputs(emailInput, passwordInput) {
  let formValidation = 0; // Initialise la variable de validation du formulaire


  emailInput.style.border = ''; // Réinitialise les styles de bordure
  passwordInput.style.border = '';

// Vérification de l'email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour l'email
  if (emailInput.value.trim() === "") { // Vérifie si le champ est vide
    emailInput.style.border = "2px red solid" // Ajoute une bordure rouge
    emailError.textContent = "Ce champs ne doit pas être vide." // Message d'erreur
  } else if (!emailPattern.test(emailInput.value)) { // Vérifie si l'email est valide
    emailInput.style.border = "2px red solid" // Ajoute une bordure rouge
    emailError.textContent = "L'email n'est pas valide !" // Message d'erreur
  } else {
      formValidation++; // Incrémente la validation si l'email est valide
  }
// Vérification du mot de passe
  const passwordPattern = /^[a-z0-9 ,.'-]+$/i // Expression régulière pour le mot de passe
  console.log(passwordPattern.test(passwordInput.value))
  if (passwordInput.value.trim() === "") { // Vérifie si le champ est vide
    passwordInput.style.border ="2px red solid" // Ajoute une bordure rouge
    passwordError.textContent = "Champ obligatoire" // Message d'erreur
  } else if (passwordPattern.test(passwordInput.value)=== false) { // Vérifie si le mot de passe est valide
    passwordInput.style.border = "2px red solid" // Ajoute une bordure rouge
    passwordError.textContent = "Le mot de passe est incorrect" // Message d'erreur
      
  } else {
    formValidation++; // Incrémente la validation si le mot de passe est valide
  }

  return formValidation === 2; // Retourne vrai si les deux champs sont valides
}

// Fonction pour gérer la connexion
async function handleLogin() {
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Empêche le comportement par défaut du formulaire


      if (validateInputs(emailInput, passwordInput)) { // Vérifie si les entrées sont valides
        console.log(validateInputs(emailInput, passwordInput))
        debugger // Point d'arrêt pour le débogage
          try {

              const response = await fetch("http://localhost:5678/api/users/login", {
                  method: "POST", // Méthode de requête POST
                  headers: {
                      'Content-Type': 'application/json', // Type de contenu JSON
                  },
                  body: JSON.stringify({
                      email: emailInput.value,
                      password: passwordInput.value
                  }),
              });

              if (!response.ok) { // Vérifie si la réponse n'est pas correcte
                  throw new Error(`HTTP error! status: ${response.status}`); // Lance une erreur avec le statut HTTP
              }

              const data = await response.json(); // Parse les données JSON


              sessionStorage.setItem('token', data.token); // Stocke le token dans la session


              window.location.href = "/index.html"; // Redirige vers la page d'accueil

          } catch (error) {
              console.error('Erreur lors de la tentative de connexion:', error); // Affiche l'erreur en cas de problème

          }
      }
  });
}
handleLogin() // Appel de la fonction pour gérer la connexion