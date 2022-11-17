
const section = document.getElementById('home-view');
section.remove();

export function showHomeView () {

    // document.getElementById('home-view').style.display = 'block';
    document.querySelector('main').appendChild(section);


}