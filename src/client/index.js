import { performAction } from './js/formHandler'
import './styles/style.scss'

//HTML elements
const button = document.getElementById("generate");

// Event listener to add function to existing HTML DOM element = the generate button
button.addEventListener("click", performAction);

export {
    performAction
}
