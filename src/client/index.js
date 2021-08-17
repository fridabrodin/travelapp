import { handleSubmit } from './js/formHandler'
import './styles/style.scss'

const button = document.getElementById("generate");

button.addEventListener("click", function(){
    console.log("I am clicked");
    handleSubmit();
 });


export {
 handleSubmit
}
