import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [dark, setDark] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.className = dark ? 'dark' : 'light'
  }, [dark])

  async function handleLogin() {
    const res = await fetch('https://api-tarefas-production-0d8f.up.railway.app/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })

    const data = await res.json()

    if (!res.ok) {
      setErro('Email ou senha inválidos')
      return
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    navigate('/tarefas')
  }

  const bg = dark ? '#0f0f0f' : '#f5f5f5'
  const cardBg = dark ? '#1a1a1a' : '#ffffff'
  const cardBorder = dark ? '#2a2a2a' : '#e0e0e0'
  const text = dark ? '#f1f1f1' : '#111'
  const muted = dark ? '#888' : '#666'
  const inputBg = dark ? '#222' : '#fff'
  const inputBorder = dark ? '#333' : '#ddd'
  const inputText = dark ? '#f1f1f1' : '#111'
  const logoBg = dark ? '#1e2a3a' : '#e8f0fe'
  const logoColor = dark ? '#7aacf5' : '#3b6fd4'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg }}>
      <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '380px', position: 'relative' }}>

        <button
          onClick={() => setDark(!dark)}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: `1px solid ${inputBorder}`, borderRadius: '8px', padding: '4px 10px', fontSize: '13px', cursor: 'pointer', color: muted }}
        >
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div style={{ width: '36px', height: '36px', background: logoBg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '18px', color: logoColor }}>✓</div>

        <h2 style={{ fontSize: '20px', fontWeight: '600', color: text, marginBottom: '4px' }}>Bem vindo</h2>
        <p style={{ fontSize: '13px', color: muted, marginBottom: '1.5rem' }}>Entre na sua conta para continuar</p>

        {erro && <p style={{ color: '#e53935', fontSize: '13px', marginBottom: '12px' }}>{erro}</p>}

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: muted, marginBottom: '4px', fontWeight: '500' }}>email</label>
          <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', outline: 'none', background: inputBg, color: inputText }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: muted, marginBottom: '4px', fontWeight: '500' }}>senha</label>
          <input type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', border: `1px solid ${inputBorder}`, borderRadius: '8px', fontSize: '14px', outline: 'none', background: inputBg, color: inputText }} />
        </div>

        <button onClick={handleLogin}
          style={{ width: '100%', padding: '10px', background: dark ? '#f1f1f1' : '#111', color: dark ? '#111' : 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Login