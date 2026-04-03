// pages/Tab3.tsx
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SearchBar from '../components/SearchBar';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GitHub Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <SearchBar />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
