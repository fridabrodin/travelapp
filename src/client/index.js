import { performAction } from '.js/app.js'
import './styles/style.css'

//HTML Elements
const button = document.getElementById("generate");

// Event listener to add function to existing HTML DOM element = the generate button
button.addEventListener("click", performAction);

export {
    performAction
   }