import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'TODO CRUD';
  list = [];
  getTodo = [];
  updateId: number;
  isEdit = false;
  submitted = false;

  constructor() {
    this.getItem();
  }
  ngOnInit(): void {}

  TodoList = new FormGroup({
    task: new FormControl('', Validators.required),
    des: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.submitted = true;
    if (this.TodoList.invalid) {
      return;
    }
    this.isEdit ? this.todoUpdate() : this.todoAdd();
  }

  todoAdd() {
    console.log('Todo....', this.TodoList.value);
    this.list.push(this.TodoList.value);
    localStorage.setItem('Todo', JSON.stringify(this.list));
    console.log('List...', this.list);
    this.resetForm();
  }

  getItem() {
    this.getTodo = JSON.parse(localStorage.getItem('Todo'));
    this.list = this.getTodo !== null ? this.getTodo : [];
    console.log('GetList.....', this.list);
  }

  resetForm() {
    this.TodoList.reset();
    this.submitted = false;
    this.isEdit = false;
  }

  action(type: string, index: number, task: any, des: any) {
    if (type == 'edit') {
      this.TodoList.setValue({
        task: task,
        des: des,
      });
      this.isEdit = true;
    } else if (type == 'delete') {
      this.list = this.list.filter((item, i) => i !== index);
      localStorage.setItem('Todo', JSON.stringify(this.list));
      console.log('Delete....', this.list);
    } else {
      console.log('Call Wrong Function......');
    }
    this.updateId = index;
  }

  todoUpdate() {
    this.list.forEach((ele, index) => {
      index == this.updateId
        ? ((ele.task = this.TodoList.value.task),
          (ele.des = this.TodoList.value.des))
        : 'Not Update';
    });
    localStorage.setItem('Todo', JSON.stringify(this.list));
    console.log('Update...', this.list);
    this.resetForm();
    this.isEdit = false;
  }
}
