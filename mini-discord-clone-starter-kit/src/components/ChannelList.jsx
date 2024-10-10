import React from 'react'

const ChannelList = ({ channels, activeChannel, onChannelSelect }) => {
  return (
    <div className="bg-discord-dark text-white w-60 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-400">Channels</h2>
      <ul>
        {channels.map(channel => (
          <li
            key={channel.name}
            className={`mb-2 cursor-pointer hover:bg-discord-light p-2 rounded ${
              activeChannel === channel.name ? 'bg-discord-light' : ''
            }`}
            onClick={() => onChannelSelect(channel.name)}
          >
            # {channel.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChannelList
