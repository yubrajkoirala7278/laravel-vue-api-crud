import { reactive } from "vue";

export const displayMessage=reactive({
    message:'',
    color:'',
    snackbar:false
});

export const displaySuccessMessage=(msg)=>{
    displayMessage.message=msg;
    displayMessage.snackbar=true;
    displayMessage.color='green';
}
export const displayErrorMessage=(msg)=>{
    displayMessage.message=msg;
    displayMessage.snackbar=true;
    displayMessage.color='red';
}
setTimeout(() => {
    displayMessage.snackbar=false;
    displayMessage.message='';
    displayMessage.color='';
}, 1000);