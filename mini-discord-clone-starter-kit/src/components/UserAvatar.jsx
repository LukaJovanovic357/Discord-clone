import React, { useState } from 'react'
import { LogOut } from 'lucide-react'

const UserAvatar = ({ userId, username, size = 32, onDisconnect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <img
          src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userId}`}
          alt={username}
          width={size}
          height={size}
        />
      </button>
      {isMenuOpen && onDisconnect && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-discord-light rounded-md shadow-xl z-20">
          <button
            onClick={() => {
              onDisconnect()
              setIsMenuOpen(false)
            }}
            className="px-4 py-2 text-sm capitalize text-white hover:bg-discord-gray w-full text-left inline-flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            <span>Disconnect</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
