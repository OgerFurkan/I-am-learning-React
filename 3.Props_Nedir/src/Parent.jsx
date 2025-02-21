import React from 'react'

function Parent({ children }) { // Parent componentine children propsu ekliyoruz.
    return (
        // Parent componentinin içinde children propsunu yazdırıyoruz.
        <div>
            <div>Parent Çalıştı....</div>
            {children}
        </div>
    )
}

export default Parent