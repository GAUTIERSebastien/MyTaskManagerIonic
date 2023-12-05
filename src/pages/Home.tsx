import React from "react";
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

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion de Tâches</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Formulaire pour ajouter une tâche */}
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nouvelle Tâche</IonLabel>
            <IonInput type="text"></IonInput>
          </IonItem>
          <IonButton expand="block">Ajouter</IonButton>
        </IonList>
        {/* Liste des tâches */}
        {/* Chaque tâche sera un IonItemSliding pour permettre des actions comme valider/invalider et supprimer */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
