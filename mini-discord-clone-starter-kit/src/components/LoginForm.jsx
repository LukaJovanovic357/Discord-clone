import React, { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username)
      setError('')
    } else {
      setError('Username is required')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-discord-dark">
      <form onSubmit={handleSubmit} className="bg-discord-gray p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Enter your username</h2>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-discord-light text-white"
          placeholder="Username"
          autoComplete="off"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
        >
          Join
        </button>
      </form>
    </div>
  )
}

export default LoginForm
