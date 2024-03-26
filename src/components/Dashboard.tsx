import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonCardContent, IonItem, IonLabel, IonList, IonThumbnail, IonBadge } from "@ionic/react";
import { warning } from "ionicons/icons";
import styles from './Dashboard.module.css';

export default function Dashboard() {
    return (
      <>
        <IonGrid>
          <IonRow>
            <IonCol>1</IonCol>
            <IonCol>2</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonCard>
                    <div className={styles.iconkecil}>
                <IonIcon icon={warning} aria-hidden="true" size="large" color="warning"/>
                </div>
                    <IonCardHeader>
                    
                        <IonCardTitle>Stock</IonCardTitle>
                        <IonCardSubtitle>Please check your stock!</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonList className={styles.itemdashboard}>
          <IonItem>
          <IonBadge slot="start">11</IonBadge>
            <IonThumbnail slot="start">
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
            </IonThumbnail>
            <IonLabel>Item</IonLabel>
          </IonItem>
          </IonList>
                    </IonCardContent>
                </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        </>
        );
        };