import { Component } from '@angular/core';
import { Todo } from 'models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //variavel vazia e o tipo any aceita qualquer tipo
  public todos : Todo[] = [];
  public title: String = 'Minhas tarefas';
  //variavel undefined
  //public todos : any[];

  //this ajuda a ter acesso as variaveis e a todo escopo da minha classe
  //com o push incluo itens no minha lista todos
  constructor() {
    this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    this.todos.push(new Todo(2, 'ir ao mercado', false));
    this.todos.push(new Todo(3, 'Ir pra Jana', true));
  }

//pego a posição do meu todo e passo a index e quantidade de remoção
//para o splice remover 
remove(todo: Todo) {
  const index = this.todos.indexOf(todo);
  if (index !== -1) {
    this.todos.splice(index, 1);
  }
}

markAsDone(todo: Todo) {
  todo.done = true;
}

markAsUndone(todo: Todo) {
  todo.done = false;
}

  alteraTexto() {
    this.title = 'Teste';
  }
}
