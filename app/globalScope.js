import { getCookie } from 'globalUtils';
import initMainScript from './utils/main';

const globalScope = {
    token: '',
    isAdmin: false,
    previewMode: false,
    api: process.env.API_URL,
    previousPage: '',
    selectionData: {},
    userData: null,
    feather: null, // refer initialiseApp.js
    axios: null, // refer initialiseApp.js
    activated: getCookie('tpzl_activate') || '',
    initMainScript,
};

console.log(globalScope.initMainScript);

export default globalScope;

