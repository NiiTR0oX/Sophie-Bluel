// input formulary + form quesry.selector //

const loginForm = document.querySelector('#user_login_form');
const emailInput = loginForm.querySelector('input[type="email"]');
const emailError = document.querySelector('.emailerror');
const passwordInput = loginForm.querySelector('input[type="password"]');

async function loginToApi(email, password) {
  try {
      const response = await fetch('http://localhost:5678/api/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
  } catch (error) {
      console.error('Erreur lors de la requête de connexion:', error);
      throw error;
  }
}

function validateInputs(emailInput, passwordInput) {
  let formValidation = 0;


  emailInput.style.border = '';
  passwordInput.style.border = '';


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    emailInput.style.border = "2px red solid"
    emailError.textContent = "Ce champs ne doit pas être vide."
  } else if (!emailPattern.test(emailInput.value)) {
    emailInput.style.border = "2px red solid"
    emailError.textContent = "L'email n'est pas valide !"
  } else {
      formValidation++;
  }

  const passwordPattern = /^[a-z0-9 ,.'-]+$/i
  console.log(passwordPattern.test(passwordInput.value))
  if (passwordInput.value.trim() === "") {
    passwordInput.style.border ="2px red solid"
    passwordError.textContent = "Champ obligatoire"
  } else if (passwordPattern.test(passwordInput.value)=== false) {
    passwordInput.style.border = "2px red solid"
    passwordError.textContent = "Le mot de passe est incorrect"
      
  } else {
    formValidation++;
  }

  return formValidation === 2;
}

async function handleLogin() {
  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();


      if (validateInputs(emailInput, passwordInput)) {
        console.log(validateInputs(emailInput, passwordInput))
        debugger
          try {

              const response = await fetch("http://localhost:5678/api/users/login", {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      email: emailInput.value,
                      password: passwordInput.value
                  }),
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();


              sessionStorage.setItem('token', data.token);


              window.location.href = "/index.html";

          } catch (error) {
              console.error('Erreur lors de la tentative de connexion:', error);

          }
      }
  });
}
handleLogin()