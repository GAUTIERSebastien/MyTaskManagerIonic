// src/services/jsonService.ts
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TaskInterface } from "../interfaces/TaskInterface";

const baseURL = "http://localhost:3000/tasks";

const fetchTasks = () => {
  return from(fetch(baseURL)).pipe(switchMap((response) => response.json()));
};

const addTask = (task: Partial<TaskInterface>) => {
  return from(
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
  ).pipe(switchMap((response) => response.json()));
};

const toggleTaskCompletion = (taskId: number, completed: boolean) => {
  return from(
    fetch(`${baseURL}/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    })
  ).pipe(switchMap((response) => response.json()));
};

const deleteTask = (taskId: number) => {
  return from(
    fetch(`${baseURL}/${taskId}`, {
      method: "DELETE",
    })
  ).pipe(switchMap((response) => response.json()));
};

export { fetchTasks, addTask, toggleTaskCompletion, deleteTask };
