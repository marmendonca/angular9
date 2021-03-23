import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //variavel vazia e o tipo any aceita qualquer tipo
  public todos: Todo[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;
  //variavel undefined
  //public todos : any[];

  //ctor cria um construtor
  //this ajuda a ter acesso as variaveis, classes, a todo escopo da minha classe
  //com o push incluo itens no minha lista todos
  /*
  Foi criado um form group com as validações seguintes
  Foi incluso os imports FormBuilder, FormGroup e Validators
  */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

add() {
  const title = this.form.controls['title'].value;
  const id = this.todos.length + 1;
  this.todos.push(new Todo(id, title, false));
  this.save();
  this.clear();
}

//clear limpa as informações apos adicionar por exemplo.
clear() {
  this.form.reset();
}

//pego a posição do meu todo atraves do indexOf e no splite faço a remoção passando a posição e a quantidade de remoção
remove(todo: Todo) {
  const index = this.todos.indexOf(todo);
  if (index !== -1) {
    this.todos.splice(index, 1);
    this.save();
  }
}

markAsDone(todo: Todo) {
  todo.done = true;
  this.save();
}

markAsUndone(todo: Todo) {
  todo.done = false;
  this.save();
}

save() {
  const data = JSON.stringify(this.todos);
  localStorage.setItem('todos', data);
}

load() {
  const data = localStorage.getItem('todos');
  if (data) {
    this.todos = JSON.parse(data);
  } else {
    this.todos = []; 
  }
}
}
