"use strict";

//Importando as Categorias_
import categorias from "./Categorias.js";

const p_cat = document.querySelector('#p_cat');
const p_text = document.querySelector('#p_text');

const btn_next = document.querySelector('#btn_next');
const buttons = document.querySelector('.buttons');

const cronometry = document.querySelector('#cronometry');
const p_points = document.querySelector('#p_points');

const hide = document.querySelector('#hide');
const Error_field = document.querySelector('#Error_field');
const right_answer = document.querySelector('#right_answer');

let list_numbers = [];
let next_valid = false;
let segundos = 0;
let points = 0;

class Quiz{
    contructor(){
        this.randon = 0;
        this.list_options = [];
        this.interval = null;
    }

    Number_Randon = () =>{

        //Configuracao para fins de nao repetir as mesmas perguntas_
        //Redefinindo o array de indices usados caso todos ja forem usados_
        if(list_numbers.length === categorias.length) list_numbers = [];//Esse if precisa vim antes do loop;

        //Usando o loop para verificar se o indice sorteado ja nao tenha sido usado_
        do{
            this.randon = Math.floor(Math.random()*categorias.length);
            /*O includes vai verificar se ha ou nao ja um indice sorteado dentro do array,
            se ja haver um, ele retorna true e itera o loop sorteando outro número,
            se nao haver, retorna false e sai do loop, e assim sucessivamente;*/
        }while(list_numbers.includes(this.randon)); 

        //Preenchendo os arrays de acordo com suas especificações_
        this.list_options = [...categorias[this.randon].opcoes];
        list_numbers.push(this.randon);

        //Botão de proxima pergunta inicialmente invisível_
        btn_next.style.opacity = '0';
    }

    Insert_txt = () => {
        p_cat.textContent = categorias[this.randon].nome;
        p_text.textContent = categorias[this.randon].texto;
    }

    Options = () => {
        buttons.innerHTML = '';
        //Usando o loop FOR() para criar os 4 botoes_
        for(let n = 0;n < 4;n++){
            //Criando os 4 botóes_
            const button = document.createElement('button');
            //Adicionar formatação_
            button.id = 'btns';
            //Inserindo os textos dos botões_
            button.textContent = `${this.list_options[n]}`;

            //Chamando o método Select_option() e passando um valor para ele_
            button.addEventListener('click',() => {
                //Chamando o metodo Select_option e passando valores desse para ele_
                this.Select_option(button.textContent,categorias[this.randon].resposta,button);
                //Formatando o botao que for clicado_
                button.style.backgroundColor = '#FFD700';
                this.Start_Cronometry();
            });
            //Inserindo os botoes dentro do elemento que eu quero que eles fiquem_
            buttons.appendChild(button);
        }
    }

    Select_option = (value, res, button) => {
        const allButtons = document.querySelectorAll('#btns');

        //Exibe a opção correta após 3 segundos_
        this.interval = setTimeout(() => {
            this.Stop_Cronometry();//Chamando o cronometro;

            //verificando e exibindo as respostas_
            if(value == res){
                next_valid = true;//true indicando que um botão foi clicado;
                btn_next.style.opacity = '1';//Exibindo o botão de próxima pergunta;
                button.style.backgroundColor = '#32CD32';
                points += 10;
                p_points.textContent = points;
            }
            else{
                //Formatando após clicar na errada_
                button.style.backgroundColor = 'red';
                //Verificando a resposta correta após clicar na errada_
                for(let n = 0;n < 4;n++){
                    if(allButtons[n].textContent == res) allButtons[n].style.backgroundColor = '#32CD32';
                }

                this.Error_field();
            } 
        },3000);

         // Desabilitar todos os botões após clicar em um deles
        allButtons.forEach((btn) => btn.setAttribute('disabled', true));
    }

    Start_Cronometry = () => {
        cronometry.textContent = '';
        this.interval = setInterval(() => {
            segundos++;
            cronometry.textContent = `00:0${segundos}`;
        },900);
    }

    Stop_Cronometry = () => {
        clearInterval(this.interval);
        this.Reset_Cronometry();
    }

    Reset_Cronometry = () => {
        segundos = 0;
        cronometry.textContent = '';
    }

    Error_field = () => {
        //Exibindo resposta correta_
        right_answer.textContent += categorias[this.randon].resposta;
        hide.classList.add('hide');
        Error_field.classList.add('Error_field');
        hide.style.opacity = '1';
        Error_field.style.opacity = '1';
    }

    Clean_Group = () => {
        //Formatando os campos e chamando novamente cada método_
        this.Number_Randon();
        this.Insert_txt();
        this.Options();
        next_valid = false;
    }
}

//Instanciando a classe Quiz()_
const execution = new Quiz();
execution.Number_Randon();
execution.Insert_txt();
execution.Options();

//Chamando o método de formatação_
btn_next.addEventListener('click',() => {
    next_valid == true ? execution.Clean_Group() : window.alert('Escola uma opção!');
});