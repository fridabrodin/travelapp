import { handleSubmit } from './js/formHandler'
import './styles/style.scss'
import "../media/background.jpg";

const button = document.getElementById("generate");

button.addEventListener("click", function(){
    handleSubmit();
 });


export {
 handleSubmit
}
