
const placeholderPatter = /%%(.+?)%%/g;
const templates = {};


export async function render(templateName, ctx) {
    // ^^ will receive a template name(file) and has to extract the HTML from there 
    const html = await loadTemplate(templateName);

    const result = html.replace(placeholderPatter, replacer);

    // let result = html.replace('%%username%%', ctx['username']);
    // result = result.replace('%%items%%', ctx['username'].map(i => `<li>${i}</li>`).join('\n'))
    document.querySelector('main').innerHTML = result;

    function replacer(match, name) {
        const value = ctx[name];
        if (value !== undefined) {
            return escapeHTML(value)
        } else {
            return match;
        }
    }
}


async function loadTemplate(name) {

    if (templates[name] === undefined) {
        const response = await fetch(`/views/${name}.html`);
        templates[name] = await response.text();
    }

    return templates[name];

}

function escapeHTML (html) {

    return html.toString()
        .replaceAll('<', '%lt')
        .replaceAll('>', '%gt')
        .replaceAll('&', '%amp')

}

