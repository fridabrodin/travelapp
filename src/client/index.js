import { performAction, getWeather, postData } from './js/formHandler'
import './styles/style.scss'

const button = document.getElementById("generate");

button.addEventListener("click", function(){
    console.log("I am clicked");
    performAction();
 });


export {
    performAction,
    getWeather,
    postData
}
