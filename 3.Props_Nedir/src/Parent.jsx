import React from 'react'

function Parent({ children }) {
    return (
        <div>
            <div>Parent Çalıştı....</div>
            {children}
        </div>
    )
}

export default Parent