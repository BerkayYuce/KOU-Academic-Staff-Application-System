import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function IlanlarPage() {
  const [ilanlar, setIlanlar] = useState([]);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ilanlar/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIlanlar(response.data);
      } catch (err) {
        console.error('İlanlar yüklenemedi:', err);
      }
    };

    fetchIlanlar();
  }, [token]);

  const handleBasvuru = (ilanId) => {
    navigate(`/basvuru/${ilanId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Mevcut İlanlar</h2>
      <button onClick={handleLogout} style={styles.logoutButton}>Çıkış Yap</button>
      <div style={styles.ilanList}>
        {ilanlar.map((ilan) => (
          <div key={ilan.id} style={styles.ilanCard}>
            <h3>{ilan.baslik}</h3>
            <p><strong>Kadro Tipi:</strong> {ilan.kadro_tipi}</p>
            <p><strong>Başlangıç:</strong> {ilan.baslangic_tarihi}</p>
            <p><strong>Bitiş:</strong> {ilan.bitis_tarihi}</p>
            <button onClick={() => handleBasvuru(ilan.id)} style={styles.basvuruButton}>
              Başvuru Yap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '40px',
    textAlign: 'center'
  },
  logoutButton: {
    marginBottom: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  ilanList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px'
  },
  ilanCard: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    width: '250px',
    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)'
  },
  basvuruButton: {
    marginTop: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer'
  }
};

export default IlanlarPage;
