// input formulary + form quesry.selector //

const loginForm = document.querySelector('.user_login_formulary');

async function getLoginFromApi() {
    await fetch("http://localhost:5678/api/login")
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

  async function displayAllLogin() {
    await getLoginFromApi();
    console.log(login);
    loginForm.addEventListener('submit', async (event) => {
        clearError();
        event.preventDefault()
        const data = new FormData(loginForm)
    
        const response = await login(data)
        const user = await response.json()
        console.log(user)
    
        if (response.status === 200) {
            sessionStorage.setItem('token', user.token)
            document.querySelector(".button").innerHTML = "log out";
            } else if (response.status !== 200) {
            console.log(response.status);
            loginError();
        }
    })
  }
  displayAllLogin();



// vérifier le mail et mot de passe //
// envoyer mon fetch si réponse ok je redirige sur la page d'acceuil sinon j'affiche une erreur//