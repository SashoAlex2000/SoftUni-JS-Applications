
import { default as page } from '../node_modules/page/page.mjs'

page('index.hmtl', '/home')
page('/home',  () => console.log('HOME'));
page('/create', () => console.log('da ti eva creata'));

// ???????????????

page.start();
