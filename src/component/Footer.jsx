import React from 'react'

function Footer() {
    const backward = (e) => {
        e.preventDefault();
        window.history.back();
    }
    return (
        <div className='w3-bottom footer'>
           
        </div>
    )
}

export default Footer
