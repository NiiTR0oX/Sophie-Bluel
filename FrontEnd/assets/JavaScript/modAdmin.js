let token = sessionStorage.getItem("token")

if(token) {
    let login_link = document.querySelector('#login_link')
    login_link.innerHTML = `<a id="nav-logout" class="only_admin" href="#">logout</a>`
    // <a id="nav-logout" class="only_admin" href="#">logout</a>
    let navLogout = document.querySelector('#nav-logout')

// const navLogout = document.querySelector('#nav-logout');

    navLogout.addEventListener('click', function(event) {
        event.preventDefault();

        sessionStorage.removeItem("token");

        window.location.reload();
    });

    let navBar = document.createElement('div');
        navBar.style.backgroundColor = 'black';
        navBar.style.color = 'white';
        navBar.style.padding = '10px';
        navBar.style.display = 'flex';
        navBar.style.justifyContent = 'space-between';
        navBar.style.alignItems = 'center';

        let modifyLink = document.createElement('a');
        modifyLink.href = '#';
        modifyLink.id = 'modify-button';
        modifyLink.innerHTML = 'Modifier <i class="fa fa-edit"></i>';

        navBar.appendChild(modifyLink);
        document.body.insertBefore(navBar, document.body.firstChild);

    let modify = document.querySelector('.modify')
        modify.innerHTML +=  `<div>
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Modifier</p>
        </div>`
    buttonContainer.style.display ='none'
}