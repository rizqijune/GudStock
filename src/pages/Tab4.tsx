import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Parser from '../components/parser';
import './Tab4.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Parser/>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
