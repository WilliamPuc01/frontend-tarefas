import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Tarefas.module.css'

interface TarefaProps {
  id: number
  titulo: string
  descricao: string
  concluido: boolean
  onConcluir: (id: number) => void
}

function Tarefa({ id, titulo, descricao, concluido, onConcluir }: TarefaProps) {
  return (
    <div className={styles.tarefa} style={{ borderColor: concluido ? 'transparent' : undefined }}>
      <div className={styles.check} onClick={() => !concluido && onConcluir(id)}
        style={{ background: concluido ? '#e8f5e9' : 'transparent', borderColor: concluido ? '#81c784' : '#ccc', color: '#4caf50' }}>
        {concluido ? '✓' : ''}
      </div>
      <div className={styles.tarefaInfo}>
        <p className={concluido ? styles.tarefaTituloConcluido : styles.tarefaTitulo}>{titulo}</p>
        <p className={styles.tarefaDesc}>{descricao}</p>
      </div>
      {concluido
        ? <span className={styles.badge} style={{ background: '#e8f5e9', color: '#388e3c' }}>concluída</span>
        : <button className={styles.btnConcluir} onClick={() => onConcluir(id)}>Concluir</button>
      }
    </div>
  )
}

function Tarefas() {
  const [tarefas, setTarefas] = useState<TarefaProps[]>([])
  const [carregando, setCarregando] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.className = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    fetch('https://api-tarefas-production-0d8f.up.railway.app/tarefas', {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTarefas(data.map((t: any) => ({ ...t, onConcluir: () => {} })))
        setCarregando(false)
      })
  }, [])

  if (carregando) return <p style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</p>

  async function adicionar() {
    if (!titulo || !descricao) return
    const res = await fetch('https://api-tarefas-production-0d8f.up.railway.app/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
      body: JSON.stringify({ titulo, descricao })
    })
    const novaTarefa = await res.json()
    setTarefas([...tarefas, { ...novaTarefa, onConcluir: () => {} }])
    setTitulo('')
    setDescricao('')
  }

  function concluir(id: number) {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluido: true } : t))
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  const bg = dark ? '#0f0f0f' : '#f5f5f5'
  const cardBg = dark ? '#1a1a1a' : '#ffffff'
  const cardBorder = dark ? '#2a2a2a' : '#e0e0e0'
  const text = dark ? '#f1f1f1' : '#111'
  const muted = dark ? '#888' : '#666'
  const inputBg = dark ? '#222' : '#fff'
  const inputBorder = dark ? '#333' : '#ddd'
  const concluidas = tarefas.filter(t => t.concluido).length

  return (
    <div className={styles.container} style={{ background: bg }}>
      <div className={styles.card} style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>

        <button className={styles.toggleTheme}
          onClick={() => setDark(!dark)}
          style={{ color: muted, borderColor: inputBorder }}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>

        <div className={styles.header}>
          <div>
            <h2 className={styles.titulo} style={{ color: text }}>Minhas tarefas</h2>
            <p className={styles.contador} style={{ color: muted }}>{tarefas.length} tarefas · {concluidas} concluídas</p>
          </div>
          <button className={styles.btnLogout} onClick={logout}
            style={{ color: muted, borderColor: inputBorder, border: `1px solid ${inputBorder}` }}>
            Sair
          </button>
        </div>

        {tarefas.map(tarefa => (
          <Tarefa
            key={tarefa.id}
            id={tarefa.id}
            titulo={tarefa.titulo}
            descricao={tarefa.descricao}
            concluido={tarefa.concluido}
            onConcluir={concluir}
          />
        ))}

        <div className={styles.addForm} style={{ borderColor: inputBorder }}>
          <input placeholder="Nova tarefa..." value={titulo} onChange={e => setTitulo(e.target.value)}
            style={{ background: inputBg, borderColor: inputBorder, color: text }} />
          <input placeholder="Descrição..." value={descricao} onChange={e => setDescricao(e.target.value)}
            style={{ background: inputBg, borderColor: inputBorder, color: text }} />
          <button className={styles.btnAdicionar} onClick={adicionar}
            style={{ background: dark ? '#f1f1f1' : '#111', color: dark ? '#111' : 'white' }}>
            + Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tarefas