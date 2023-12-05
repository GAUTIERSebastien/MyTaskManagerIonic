import './TaskComponent.css';
import { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

const TaskComponent = ({ task }) => {
  useEffect(() => {
    const taskElement = document.getElementById(`task-${task.id}`);

    const doubleClick$ = fromEvent(taskElement, 'dblclick').pipe(
      filter((event) => event.detail === 2)
    );

    const subscription = doubleClick$.subscribe(() => {
      // Logique pour valider/invalider la tâche
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [task]);

  return (
    // Votre composant de tâche ici
  );
};
