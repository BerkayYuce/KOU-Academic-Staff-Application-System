import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function BasvuruPage() {
  const { ilanId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [cv, setCv] = useState(null);
  const [diploma, setDiploma] = useState(null);
  const [yayinListesi, setYayinListesi] = useState(null);
  const [ekDosya, setEkDosya] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cv || !diploma || !yayinListesi) {
      setMessage('Lütfen tüm zorunlu belgeleri yükleyin.');
      return;
    }

    const formData = new FormData();
    formData.append('ilan', ilanId);
    formData.append('cv', cv);
    formData.append('diploma', diploma);
    formData.append('yayin_listesi', yayinListesi);
    if (ekDosya) {
      formData.append('ek_dosya', ekDosya);
    }

    try {
      await axios.post('http://localhost:8000/api/basvurular/create/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Başvuru başarıyla gönderildi!');
      setTimeout(() => {
        navigate('/ilanlar');
      }, 2000);
    } catch (err) {
      console.error('Başvuru hatası:', err);
      setMessage('Başvuru sırasında bir hata oluştu.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Başvuru Formu</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fileInput}>
          <label>CV (PDF):</label>
          <input type="file" accept="application/pdf" onChange={(e) => setCv(e.target.files[0])} required />
        </div>
        <div style={styles.fileInput}>
          <label>Diploma (PDF):</label>
          <input type="file" accept="application/pdf" onChange={(e) => setDiploma(e.target.files[0])} required />
        </div>
        <div style={styles.fileInput}>
          <label>Yayın Listesi (PDF):</label>
          <input type="file" accept="application/pdf" onChange={(e) => setYayinListesi(e.target.files[0])} required />
        </div>
        <div style={styles.fileInput}>
          <label>Ek Dosya (İsteğe Bağlı):</label>
          <input type="file" onChange={(e) => setEkDosya(e.target.files[0])} />
        </div>
        <button type="submit" style={styles.submitButton}>Başvuru Yap</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '50px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px'
  },
  fileInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '20px',
    fontWeight: 'bold',
    color: 'green'
  }
};

export default BasvuruPage;
