import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/pro-regular-svg-icons'

export default function ErrorAlert() {
  return (
    <div className="error-alert">
      <div><FontAwesomeIcon icon={faBan} style={{ color: '#EC4C47', marginRight: 10 }} /><span style={{ marginRight: 10, fontWeight: 'bold', fontFamily: '"Montserrat", sans-serif' }} >ERROR</span></div>
      <div>
        Some data may not be visible because the API server is currently unavailable. Please refresh the page or try again later.
      </div>
    </div>
  )
}
