import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JuriPanelPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [degerlendirmeler, setDegerlendirmeler] = useState([]);
  const [form, setForm] = useState({
    basvuruId: '',
    puan: '',
    rapor: null
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.role !== 'juri') {
      navigate('/');
    } else {
      fetchDegerlendirmeler();
    }
  }, [user, token]);

  const fetchDegerlendirmeler = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/juri/degerlendirme/list/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDegerlendirmeler(response.data);
    } catch (err) {
      console.error('Değerlendirmeler yüklenemedi:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.basvuruId || !form.puan || !form.rapor) {
      setMessage('Tüm alanları doldurun.');
      return;
    }

    const formData = new FormData();
    formData.append('basvuru', form.basvuruId);
    formData.append('puan', form.puan);
    formData.append('rapor', form.rapor);

    try {
      await axios.post('http://localhost:8000/api/juri/degerlendirme/create/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Değerlendirme başarıyla kaydedildi!');
      setForm({ basvuruId: '', puan: '', rapor: null });
      fetchDegerlendirmeler();
    } catch (err) {
      console.error('Değerlendirme hatası:', err);
      setMessage('Değerlendirme sırasında hata oluştu.');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, rapor: e.target.files[0] });
  };

  return (
    <div style={styles.container}>
      <h2>Jüri Paneli - Değerlendirme Yap</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="basvuruId" placeholder="Başvuru ID" value={form.basvuruId} onChange={handleChange} required />
        <input type="number" name="puan" placeholder="Puan" value={form.puan} onChange={handleChange} required />
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit" style={styles.button}>Değerlendirme Gönder</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.list}>
        <h3>Yaptığın Değerlendirmeler:</h3>
        {degerlendirmeler.map((deg) => (
          <div key={deg.id} style={styles.card}>
            <p><strong>Başvuru:</strong> {deg.basvuru}</p>
            <p><strong>Puan:</strong> {deg.puan}</p>
            <p><strong>Değerlendirme Tarihi:</strong> {new Date(deg.degerlendirme_tarihi).toLocaleString()}</p>
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

export default JuriPanelPage;
