// components/SearchBar.tsx
import { IonSearchbar, IonAvatar } from '@ionic/react';
import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!searchText.trim()) {
      setUserData(null);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://api.github.com/users/${searchText}`)
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.error(err));
    }, 500);

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

      {userData && !userData.message && (
        <div className="card-container">
          <div 
            className="profile-card" 
            onClick={() => window.open(userData.html_url, '_blank')}
          >
            <IonAvatar className="card-avatar">
              <img src={userData.avatar_url} alt="GitHub Avatar" />
            </IonAvatar>
            
            <div className="card-info">
              <h2 className="card-username">@{userData.login}</h2>
              <p className="card-name">{userData.name || 'No full name'}</p>
            </div>
          </div>
        </div>
      )}

      {userData && userData.message === "Not Found" && (
        <div className="card-container">
          <p style={{ color: 'var(--ion-color-medium)' }}>User not found</p>
        </div>
      )}
    </>
  );
};

export default SearchBar;