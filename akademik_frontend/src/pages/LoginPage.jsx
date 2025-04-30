import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password
      });
      const { access, username: fetchedUsername, role } = response.data;
      const userInfo = { username: fetchedUsername, role };
  
      login(userInfo, access);
  
      // Kullanıcı rolüne göre yönlendir
      if (role === 'aday') {
        navigate('/ilanlar');
      } else if (role === 'admin') {
        navigate('/adminpanel');
      } else if (role === 'juri') {
        navigate('/juripanel');
      }
    } catch (err) {
      setError('Giriş başarısız! Kullanıcı adı veya şifre hatalı.');
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Akademik Başvuru Sistemi - Giriş Yap</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Giriş Yap</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '100px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px'
  },
  input: {
    padding: '10px',
    width: '250px',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: '0.3s'
  },
  buttonHover: {
    backgroundColor: '#2980b9'
  },
  error: {
    marginTop: '10px',
    color: 'red'
  }
};

export default LoginPage;
