const observerUserPhoto = new MutationObserver(function(mutationsList, observer) {
    const userPhotoElement = document.getElementById('user-photo');
    const userMenu = document.getElementById('user-menu');

    if (userPhotoElement) {
        userPhotoElement.addEventListener('click', function(event) {
            userMenu.classList.toggle('hidden');
            event.stopPropagation();
        });
        observerUserPhoto.disconnect();
    }
});

observerUserPhoto.observe(document.body, { childList: true, subtree: true });

function displayUserInfo(data) {
    if (data) {
        const userSkinURL = `https://avatars.spworlds.ru/face/${data.user_skin}`;
        const userName = data.user_name;
        const userRoles = data.user_roles;
        const userPCTokens = data.user_coins;
        const loginDiv = document.getElementById('login');

        loginDiv.innerHTML = 
            `<img id="user-photo" src="${userSkinURL}" alt="User Photo">
            <div id="user-menu" class="popup-menu hidden">
                <div class="user-info">
                    <img id="user-photo" src="${userSkinURL}" alt="User Photo">
                    <div class="user-text-info">
                        <div id="user-name">${userName}</div>
                        <div id="user-token">PCToken: ${userPCTokens}</div>
                    </div>
                </div>
                <hr>
                <div class="user-menu-buttons">
                    <button class="user-menu-button" id="my-profile-button"><img src="static/images/icon_account.svg">Мой профиль</button>
                    <button class="user-menu-button" id="settings-button"><img src="static/images/icon_settings.svg">Настройки</button>
                    <button class="user-menu-button" id="logout-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>Выйти</button>
                </div>
            </div>`;
    }
}

const observerProfileButton = new MutationObserver(function(mutationsList, observer) {
    const profileButton = document.getElementById('my-profile-button');

    if (profileButton) {
        profileButton.addEventListener('click', function() {
            window.location.href = 'https://site.pink-cloud.ru/me';
        });
        
        observerProfileButton.disconnect();
    }
});

observerProfileButton.observe(document.body, { childList: true, subtree: true });


function closeAllMenus() {
    const menus = document.querySelectorAll('.popup-menu');
    menus.forEach(menu => {
        if (!menu.classList.contains('hidden') && !menu.classList.contains('menu')) {
            menu.classList.add('hidden');
        }
    });

    const blurDiv = document.getElementById('blur');
    if (!blurDiv.classList.contains('hidden')) {
        blurDiv.classList.add('hidden');
    }
}

document.addEventListener('click', function(event) {
    const isClickInsidePopupMenu = event.target.closest('.popup-menu');

    if (!isClickInsidePopupMenu) {
        closeAllMenus();
    }
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(event) {
        if (link.href === window.location.href) {
            event.preventDefault();
        }
    });
});

function animationPopupButton() {
    const buttons = document.querySelectorAll('.popup-button');
    buttons.forEach(button => {
        button.classList.add('grow');
    });
}

function parallax() {
    var s = document.getElementById("floater");
    var yPos = -window.pageYOffset / 115;
    s.style.marginTop = -15 - yPos + "%";
}

window.addEventListener("scroll", function(){
	parallax();	
});
                
document.getElementById('ip-java').addEventListener('click', function(event){
    const dropdownList = document.getElementById('ip-dropdown-list');
    const dropdownArrow = document.getElementById('ip-dropdown-arrow');
    if (event.target.id === 'ip-dropdown-arrow') {
        dropdownList.classList.toggle('hidden');
        dropdownArrow.classList.toggle('ip-open-arrow');
        event.stopPropagation();
    } else if (event.target.id === 'ip-java') {
        ipCopy('mc.pink-cloud.ru', 'IP скопирован!');
    }
});

document.getElementById('ip-bedrock').addEventListener('click', function() {
    ipCopy('bedrock.pink-cloud.ru', 'IP скопирован!');
});

document.getElementById('ip-bedrock-port').addEventListener('click', function() {
    ipCopy('20062', 'Port скопирован!');
});

function ipCopy(copyText, outputText) {
    navigator.clipboard.writeText(copyText).then(() => {
        const firstIPButton = document.getElementById('ip-java');
        const dropdownList = document.getElementById('ip-dropdown-list');
        firstIPButton.textContent = outputText;
        firstIPButton.style.display = 'block';
        if (!dropdownList.classList.contains('hidden')) {
            dropdownList.classList.add('hidden');
        }
        setTimeout(() => {
            firstIPButton.innerHTML = `Java IP: mc.pink-cloud.ru<div class="ip-arrow" id="ip-dropdown-arrow"></div>`;
            firstIPButton.style.display = 'flex';
        }, 1000);
    }).catch(function(error) {
        console.error('Error copying text: ', error);
    });
}

document.getElementById('connection-to-server').onclick = function(event) {
    document.getElementById('blur').classList.toggle('hidden');

    event.stopPropagation();
};