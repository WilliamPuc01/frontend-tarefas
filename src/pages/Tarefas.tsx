import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface TarefaProps {
  id: number
  titulo: string
  descricao: string
  concluido: boolean
  onConcluir: (id: number) => void
}

function Tarefa({ id, titulo, descricao, concluido, onConcluir }: TarefaProps) {
  return (
    <div>
      <h2>{concluido ? '✅' : '⏳'} {titulo}</h2>
      <p>{descricao}</p>
      {!concluido && (
        <button onClick={() => onConcluir(id)}>Concluir</button>
      )}
    </div>
  )
}

function Tarefas() {
  const [tarefas, setTarefas] = useState<TarefaProps[]>([])
  const [carregando, setCarregando] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

   function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
  fetch('https://api-tarefas-production-0d8f.up.railway.app/tarefas', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      setTarefas(data.map((t: any) => ({ ...t, onConcluir: () => {} })))
      setCarregando(false)
    })
}, [])

  if (carregando) return <p>Carregando...</p>

  async function adicionar() {
        if (!titulo || !descricao) return

        const res = await fetch('https://api-tarefas-production-0d8f.up.railway.app/tarefas', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, descricao })
        })

        const novaTarefa = await res.json()
        setTarefas([...tarefas, { ...novaTarefa, onConcluir: () => {} }])
        setTitulo('')
        setDescricao('')
}

  function concluir(id: number) {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, concluido: true } : t
    ))
  }

  return (
    <div>
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
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <button onClick={() => adicionar()}>Adicionar</button>
      <button onClick={logout}>Sair</button>
    </div>
  )
}



export default Tarefas