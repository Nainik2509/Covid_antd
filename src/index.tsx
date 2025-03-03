import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
// React Flatpickr CSS
import 'flatpickr/dist/themes/material_blue.css'
import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
