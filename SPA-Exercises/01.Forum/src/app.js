import { sendNewTopic } from '../src/newTopic.js'
import { postCommentOnServer } from './commens.js';
import { getTopics, displayTopics } from './home.js'
// import '../src/newTopic.js'

console.log('workind')

displayTopics();

window.api = {
    sendNewTopic,
    getTopics,
    postCommentOnServer,
    
}

