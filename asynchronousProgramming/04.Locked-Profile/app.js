async function lockedProfile() {
    
    let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let profiles = await(response.json());

    let main = document.getElementById('main');
    main.innerHTML = '';

    let entries = Object.entries(profiles)

    for (let profile of entries) {
        console.log(profile);

        let newProfileHTML = `
        <img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${profile[1].username}" disabled readonly />
				<div class="user1Username" style="display: none">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${profile[1].email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user1Age" value="${profile[1].age}" disabled readonly />
				</div>
				
				<button>Show more</button>
        `;

        let newPorifleDiv = document.createElement('div');
        newPorifleDiv.classList.add('profile');
        newPorifleDiv.innerHTML = newProfileHTML;

        main.appendChild(newPorifleDiv);

    }

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', buttonClick)
    }

    function buttonClick(event) {
        let hiddenDiv = event.target.parentElement.getElementsByClassName('user1Username')[0];
        let radio= event.target.parentElement.getElementsByTagName('input')[0];

        if (radio.checked === true) {
            return;
        }
        
        if (event.target.textContent == 'Show more') {
            
            hiddenDiv.style.display = 'block';
            event.target.textContent = 'Hide it';
        }else if (event.target.textContent == 'Hide it') {
            hiddenDiv.style.display = 'none';
            event.target.textContent = 'Show more';
        }

    }


}