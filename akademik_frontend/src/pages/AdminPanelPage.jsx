import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminPanelPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [ilanlar, setIlanlar] = useState([]);
  const [form, setForm] = useState({
    baslik: '',
    aciklama: '',
    kadro_tipi: 'dr',
    baslangic_tarihi: '',
    bitis_tarihi: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/'); // admin değilse ana sayfaya at
    } else {
      fetchIlanlar();
    }
  }, [user, token]);

  const fetchIlanlar = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ilanlar/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIlanlar(response.data);
    } catch (err) {
      console.error('İlanlar çekilemedi:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/ilanlar/', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('İlan başarıyla oluşturuldu!');
      setForm({
        baslik: '',
        aciklama: '',
        kadro_tipi: 'dr',
        baslangic_tarihi: '',
        bitis_tarihi: ''
      });
      fetchIlanlar();
    } catch (err) {
      console.error('İlan ekleme hatası:', err);
      setMessage('İlan oluşturulamadı.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h2>Admin Paneli - İlan Yönetimi</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="baslik" placeholder="Başlık" value={form.baslik} onChange={handleChange} required />
        <textarea name="aciklama" placeholder="Açıklama" value={form.aciklama} onChange={handleChange} required />
        <select name="kadro_tipi" value={form.kadro_tipi} onChange={handleChange}>
          <option value="dr">Doktor Öğretim Üyesi</option>
          <option value="docent">Doçent</option>
          <option value="prof">Profesör</option>
        </select>
        <input type="date" name="baslangic_tarihi" value={form.baslangic_tarihi} onChange={handleChange} required />
        <input type="date" name="bitis_tarihi" value={form.bitis_tarihi} onChange={handleChange} required />
        <button type="submit" style={styles.button}>İlan Ekle</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <div style={styles.list}>
        <h3>Mevcut İlanlar:</h3>
        {ilanlar.map((ilan) => (
          <div key={ilan.id} style={styles.card}>
            <h4>{ilan.baslik}</h4>
            <p>{ilan.aciklama}</p>
            <p><strong>{ilan.kadro_tipi}</strong> | {ilan.baslangic_tarihi} - {ilan.bitis_tarihi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '50px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '30px'
  },
  button: {
    padding: '10px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '10px',
    fontWeight: 'bold'
  },
  list: {
    marginTop: '30px'
  },
  card: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px'
  }
};

export default AdminPanelPage;
