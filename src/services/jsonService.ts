import { from } from "rxjs";
import { switchMap } from "rxjs/operators";

const addTask = (task) => {
  return from(
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
  ).pipe(switchMap((response) => response.json()));
};
