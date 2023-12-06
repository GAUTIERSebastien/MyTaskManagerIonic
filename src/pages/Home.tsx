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
} from "@ionic/react";
import "./Home.css";
import {
  fetchTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
} from "../services/jsonService";
import { TaskInterface } from "../interfaces/TaskInterface";

const Home = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [newTask, setNewTask] = useState("");

  // Charger les tâches depuis le serveur lors du montage du composant
  useEffect(() => {
    const subscription = fetchTasks().subscribe(setTasks);
    return () => subscription.unsubscribe();
  }, []);

  const handleAddTask = () => {
    const task = { text: newTask, completed: false };
    addTask(task).subscribe({
      next: (newTaskFromServer) => {
        setTasks((prevTasks) => [...prevTasks, newTaskFromServer]);
        setNewTask("");
      },
      error: (error) => console.error("Error adding task:", error),
    });
  };

  const handleToggleCompleted = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      toggleTaskCompletion(taskId, !task.completed).subscribe(() => {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          )
        );
      });
    }
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId).subscribe(() => {
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
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
          <IonButton color="success" onClick={handleAddTask}>
            Ajouter une tâche
          </IonButton>
        </div>
        <IonList>
          {tasks.map((task) => (
            <IonItemSliding key={task.id}>
              <div className="item-sliding-wrapper">
                <IonLabel className={task.completed ? "task-completed" : ""}>
                  {task.text}
                </IonLabel>
                <div className="button-group">
                  <IonButton
                    onClick={() => handleToggleCompleted(task.id)}
                    color="success"
                    className="ion-button"
                  >
                    {task.completed ? "Invalider" : "Valider"}
                  </IonButton>

                  <IonButton
                    onClick={() => handleDeleteTask(task.id)}
                    color="success"
                    className="ion-button"
                  >
                    Supprimer
                  </IonButton>
                </div>
              </div>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
