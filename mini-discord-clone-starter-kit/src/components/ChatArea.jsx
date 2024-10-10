import React, { useState, useEffect, useRef } from 'react'
import UserAvatar from './UserAvatar'
import { generateRandomId } from '@/utils/functions'

const ChatArea = ({ messages, onSendMessage, activeChannel, currentUser, onDisconnect }) => {
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    inputRef.current?.focus()
    setNewMessage('')
  }, [activeChannel])

  const handleSubmit = e => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(activeChannel, newMessage)
      setNewMessage('')
    }
  }

  const formatDate = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex flex-col h-full bg-discord-gray text-white">
      <div className="flex-grow overflow-y-auto max-h-[calc(100vh-200px)] p-4">
        {messages.map(msg => (
          <div key={msg.id || generateRandomId()} className="mb-4 flex items-start">
            <UserAvatar
              userId={msg.userId || generateRandomId()}
              username={msg.username}
              size={40}
              onDisconnect={msg.userId === currentUser.userId ? onDisconnect : undefined}
            />
            <div className="ml-3 flex-grow">
              <div className="flex items-baseline">
                <span className="font-bold mr-2">{msg.username}</span>
                <span className="text-xs text-gray-400">{formatDate(msg.timestamp)}</span>
              </div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-discord-light">
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="w-full p-2 rounded bg-discord-gray text-white"
          placeholder={`Message #${activeChannel}`}
          ref={inputRef}
        />
      </form>
    </div>
  )
}

export default ChatArea
