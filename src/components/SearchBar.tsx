// components/SearchBar.tsx
import { IonSearchbar, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [userData, setUserData] = useState<any>(null);

  // Fetch GitHub user data when searchText changes
  useEffect(() => {
    if (!searchText) return;

    const timer = setTimeout(() => {
      fetch(`https://api.github.com/users/${searchText}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.log(err));
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <>
      <IonSearchbar
        animated={true}
        placeholder="Search GitHub username"
        value={searchText}
        onIonInput={e => setSearchText(e.detail.value!)}
      />
      
      <IonList>
        {userData && !userData.message && (
          <IonItem button onClick={() => window.open(userData.html_url, '_blank')}>
            <IonAvatar slot="start">
              <img src={userData.avatar_url} alt="Avatar" />
            </IonAvatar>
            <IonLabel>
              <h2>{userData.login}</h2>
              <p>{userData.name || 'No full name'}</p>
            </IonLabel>
          </IonItem>
        )}
        {userData && userData.message && (
          <IonItem>
            <IonLabel>User not found</IonLabel>
          </IonItem>
        )}
      </IonList>
    </>
  );
};

export default SearchBar;