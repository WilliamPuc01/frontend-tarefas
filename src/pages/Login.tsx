import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const navigate = useNavigate()

    async function handleLogin() {
        const res = await fetch('https://api-tarefas-production-0d8f.up.railway.app/auth/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({email, senha})

        }) 

        const data = await res.json()

        if(!res.ok){
            setErro('Email ou Senha Invalida')
            return
        }

        localStorage.setItem('token', data.token)
        navigate('/tarefas')

    }

    return(
        <div>
             <h1>Login</h1>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    )

}

export default Login

