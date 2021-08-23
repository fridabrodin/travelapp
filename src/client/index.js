import { handleSubmit } from './js/formHandler'
import './styles/style.scss'
import "../media/background.jpg";

//Set value for travel date as the date of today
document.getElementById("travel-date").valueAsDate = new Date();

const button = document.getElementById("generate");

button.addEventListener("click", function(){
    handleSubmit();
 });


export {
 handleSubmit
}
