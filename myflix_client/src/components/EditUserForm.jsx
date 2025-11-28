import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function EditUserForm({ user, onCancel, onSave }) {
    const [username, setUsername] = useState(user.Username || '')
    const [email, setEmail] = useState(user.Email || '')
    const [birthday, setBirthday] = useState(user.Birthday || '')
    const [status, setStatus] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('saving')
        try {
            await onSave(user._id, { Username: username, Email: email, Birthday: birthday })
            setStatus('saved')
        } catch (err) {
            setStatus(`error: ${err?.message || err}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 8, padding: 8, border: '1px solid #eee' }}>
            <div>
                <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <input placeholder="Birthday (YYYY-MM-DD)" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </div>
            <div style={{ marginTop: 8 }}>
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
            {status && <div style={{ marginTop: 8 }}>{status}</div>}
        </form>
    )
}

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
}
