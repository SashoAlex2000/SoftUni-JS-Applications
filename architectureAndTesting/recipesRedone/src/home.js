
const section = document.getElementById('home-view');
section.remove();

export function showHomeView (ctx) {

    // document.getElementById('home-view').style.display = 'block';
    ctx.render(section);


}