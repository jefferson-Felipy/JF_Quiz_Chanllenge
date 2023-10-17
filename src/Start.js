"use strict";

const p_nome = document.querySelector('#p_nome');
const p_categoria = document.querySelector('#categoria');
const start_quiz = document.querySelector('#start_quiz');

class Start_Quiz{
    constructor(){
        this.Value_Nome = localStorage.getItem('Value_Nome');
        this.Value_Categoria = localStorage.getItem('Value_Categoria');
    }

    Insert_group = () => {
        p_nome.innerHTML += this.Value_Nome;
        p_categoria.innerHTML += this.Value_Categoria;
    }

    Start_quiz = () => {
        start_quiz.addEventListener('click',() => {
            window.location.href = "./Quiz.html";
        });
    }
}

const execution = new Start_Quiz();
execution.Insert_group();
execution.Start_quiz();