import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from "@ionic/react";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);
  const [newTask, setNewTask] = useState("");

  // Charger les tâches depuis le serveur lors du montage du composant
  useEffect(() => {
    const fetchTasks = () => {
      fetch("http://localhost:3000/tasks")
        .then((response) => response.json())
        .then((data) => setTasks(data));
    };

    fetchTasks();
  }, []);

  // Fonction pour ajouter une tâche
  const addTask = () => {
    const task = { text: newTask, completed: false };
    from(
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
    )
      .pipe(switchMap((response) => response.json()))
      .subscribe({
        next: (newTaskFromServer) => {
          setTasks((prevTasks) => [...prevTasks, newTaskFromServer]);
          setNewTask("");
        },
        error: (error) => {
          console.error("Error adding task:", error);
        },
      });
  };

  // Fonction pour valider/invalider une tâche
  const toggleCompleted = (taskId: number) => {
    // Logique pour valider/invalider une tâche (à compléter)
  };

  // Fonction pour supprimer une tâche
  const deleteTask = (taskId: number) => {
    from(
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })
    )
      .pipe(
        switchMap((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // Gérer les erreurs HTTP ici
            return Promise.reject("Failed to delete the task");
          }
        })
      )
      .subscribe({
        next: () => {
          // Mettre à jour l'état pour retirer la tâche supprimée
          setTasks(tasks.filter((task) => task.id !== taskId));
        },
        error: (error) => {
          console.error("Error deleting task:", error);
        },
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion de Tâches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="task-input">
          <IonItem>
            <IonInput
              value={newTask}
              placeholder="Ajouter une tâche"
              onIonChange={(e) => setNewTask(e.detail.value || "")}
            />
          </IonItem>
          <IonButton onClick={addTask}>Ajouter une tâche</IonButton>
        </div>
        <IonList>
          {tasks.map((task, index) => (
            <IonItemSliding key={index}>
              <IonItemOptions side="start">
                <IonItemOption
                  onClick={() => toggleCompleted(task.id)}
                  color="success"
                >
                  {task.completed ? "Invalider" : "Valider"}
                </IonItemOption>
              </IonItemOptions>
              <IonItem>
                <IonLabel className={task.completed ? "task-completed" : ""}>
                  {task.text}
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  onClick={() => deleteTask(task.id)}
                  color="danger"
                >
                  Supprimer
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
