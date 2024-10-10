import React, { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'
import LoginForm from './LoginForm'
import UserList from './UserList'
import ChannelList from './ChannelList'
import ChatArea from './ChatArea'
import Header from './Header'
import UserAvatar from './UserAvatar'

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [session, setSession] = useState(null)
  const [users, setUsers] = useState([])
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState('welcome')
  const [messages, setMessages] = useState({})

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onSession(newSession) {
      setSession(newSession)
    }

    function onUsers(updatedUsers) {
      setUsers(updatedUsers)
    }

    function onChannels(channelList) {
      setChannels(channelList)
    }

    function onChannelMessage(channel, message) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [channel]: [...(prevMessages[channel] || []), message],
      }))
    }

    function onUserDisconnect(user) {
      setUsers(prevUsers =>
        prevUsers.map(u => (u.userId === user.userId ? { ...u, connected: false } : u)),
      )
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('session', onSession)
    socket.on('users', onUsers)
    socket.on('channels', onChannels)
    socket.on('message:channel', onChannelMessage)
    socket.on('user:disconnect', onUserDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('session', onSession)
      socket.off('users', onUsers)
      socket.off('channels', onChannels)
      socket.off('message:channel', onChannelMessage)
      socket.off('user:disconnect', onUserDisconnect)
    }
  }, [])

  const handleLogin = username => {
    socket.auth = { username }
    socket.connect()
  }

  const handleDisconnect = () => {
    socket.emit('user:leave')
    socket.disconnect()
    setSession(null)
    setIsConnected(false)
  }

  const handleSendMessage = (channel, message) => {
    socket.emit('message:channel:send', channel, message)
  }

  if (!isConnected || !session) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="flex flex-col h-screen bg-discord-gray">
      <Header
        username={session.username}
        onDisconnect={handleDisconnect}
        userAvatar={
          <UserAvatar
            userId={session.userId}
            username={session.username}
            size={32}
            onDisconnect={handleDisconnect}
          />
        }
      />
      <div className="flex-grow flex">
        <ChannelList
          channels={channels}
          activeChannel={activeChannel}
          onChannelSelect={setActiveChannel}
        />
        <div className="flex-grow flex flex-col">
          <ChatArea
            messages={messages[activeChannel] || []}
            onSendMessage={handleSendMessage}
            activeChannel={activeChannel}
            currentUser={session}
            onDisconnect={handleDisconnect}
          />
        </div>
        <UserList users={users} />
      </div>
    </div>
  )
}

export default App
