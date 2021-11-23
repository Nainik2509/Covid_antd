import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { FallBackSpinner } from './components/FallBackSpinner'
import { persistor, store } from './redux/store'
import { Router } from './router/Router'
import 'antd/dist/antd.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './App.css'

function App() {
  return (
    <React.Suspense fallback={<FallBackSpinner />}>
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </Provider>
      </div>
    </React.Suspense>
  )
}

export default App
