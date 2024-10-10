import React, { useState, useRef, useEffect } from 'react'
import { User, LogOut } from 'lucide-react'

const Header = ({ username, onDisconnect, userAvatar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside) // Add event listener for mouse clicks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // Cleanup event listener on component unmount
    }
  }, [menuRef])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="bg-discord-dark text-white p-4 flex justify-between items-center relative">
      <div className="flex items-center">
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="bg-discord-light hover:bg-discord-gray text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            {userAvatar || <User size={20} className="mr-2" />}
            <span style={{ marginLeft: '5px' }}>{username} 🔻</span>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 left-0 mt-2 py-2 w-48 bg-discord-light rounded-md shadow-xl z-20">
              <button
                onClick={() => {
                  onDisconnect()
                  setIsMenuOpen(false)
                }}
                className="px-4 py-2 text-sm capitalize text-white hover:bg-discord-gray w-full text-left inline-flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                <span style={{ marginLeft: '20px' }}>Disconnect</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
