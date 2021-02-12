import React, { useState } from 'react'
import { getRollingRetentionX, getRollingRetentionY, useAsyncHook } from '../server/server'

function MainTable () {
  const [query, setQuery] = useState('')
  const [result, loading] = useAsyncHook(query)

  const countRollingRetention = () => {
    (async () => {
      const x = await getRollingRetentionX()
      const y = await getRollingRetentionY()
      alert(`Rolling Retention 7 day: ${x[0].count / y[0].count / 100 * 100}%`)
    })()
  }

  return (
    <div>
      <table className='mainTable'>
        <caption>OTHER</caption>
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
          {loading === 'false' ? (
            <tr><td>Loading users</td></tr>
          ) : loading === 'null' ? (
            <tr><td>Sorry</td></tr>
          ) : (
            result.map(item => {
              return (
                <tr key={item.id + 1}>
                  <td>{item.id}</td>
                  <td>{item.date_registration}</td>
                  <td>{item.date_last_activity}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      <button type='submit' onClick={() => countRollingRetention()}>Calculate</button>
    </div>
  )
}

export default MainTable
