import React from 'react'

const UserList = ({ users }) => {
  const onlineUsers = users.filter(user => user.connected)
  const offlineUsers = users.filter(user => !user.connected)

  return (
    <div className="bg-discord-dark text-white w-60 p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-400">Users</h2>

      {/* Online users */}
      {onlineUsers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2">Online</h3>
          <ul>
            {onlineUsers.map(user => (
              <li key={user.userId} className="mb-2 flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                {user.username}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Offline users */}
      {offlineUsers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-4 mb-2">Offline</h3>
          <ul>
            {offlineUsers.map(user => (
              <li key={user.userId} className="mb-2 flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-gray-500"></div>
                {user.username}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default UserList
