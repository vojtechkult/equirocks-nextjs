import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const errorMessage = useRef(null);

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/protected');
    } else {
      console.error('Login error:', data);
      message(data.message);
    }
  };

  function message(message) {
    errorMessage.current.style.display = "block";
    errorMessage.current.textContent = message;
  }


  return (
    <div className="page-wrapper">
      <div className="login-wrapper">
        <h2>EquiRocks konfigurátor</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Heslo" />
        <p ref={errorMessage}>ERROR</p>
        <button onClick={handleLogin}>Přihlásit se</button>
      </div>
    </div>
  );
}

