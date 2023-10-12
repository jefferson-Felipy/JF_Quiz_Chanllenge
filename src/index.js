"use strict";

const open_quiz = document.querySelector('#open_quiz');
const input_Name = document.querySelector('#inputName');
const alert_Error = document.querySelector('#alert_err');

class OpenQuiz {
    constructor() {
        this.input_Name = '';
        this.alert_Error = alert_Error;
    }

    Validation = () => {
        open_quiz.addEventListener('click',() => {
            this.input_Name = input_Name.value.trim();

            if((this.input_Name.length <= 1 || this.input_Name === "")){
                this.alert_Error.classList.add('alert_error');
                this.alert_Error.textContent = 'Error no Nome!';
            }
            else{
                localStorage.setItem('Value_Nome', input_Name.value.trim());
                window.location.href = "./views/Start_Quiz.html";
            }
        });
    }
}

const execution = new OpenQuiz();
execution.Validation();
execution.Insert_Options();