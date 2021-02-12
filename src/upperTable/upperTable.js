import React, { useState } from 'react'
import { insertUser } from '../server/server'
import { serverEndpoint } from '../config/endpoints'

// upper table - to add new user
function UpperTable () {
  const [userID, setUserID] = useState('')
  const [dateRegistration, setDateRegistration] = useState('')
  const [dateLastActivity, setDateLastActivity] = useState('')
  return (
    <div>
      <table className='upperTable'>
        <caption>CURRENT</caption>
        <thead>
          <tr>
            <td>
              UserID
            </td>
            <td>
              Date Registration
            </td>
            <td>
              Date Last Activity
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input value={userID} onChange={e => setUserID(e.target.value)} type='text' /></td>
            <td><input value={dateRegistration} onChange={e => setDateRegistration(e.target.value)} type='text' /></td>
            <td><input value={dateLastActivity} onChange={e => setDateLastActivity(e.target.value)} type='text' /></td>
          </tr>
        </tbody>
      </table>
      <button type='submit' onClick={() => insertUser(serverEndpoint, { userID, dateRegistration, dateLastActivity })}>Save</button>
    </div>

  )
}

export default UpperTable
