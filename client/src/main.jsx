import React from 'react'
import ReactDOM from 'react-dom/client'
import {store, persistor} from './redux/store.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       <GoogleOAuthProvider clientId="333887742538-fsu59o3vfjtnd8rer3s444pjjc1grf3p.apps.googleusercontent.com">
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
       </GoogleOAuthProvider>
    </React.StrictMode>
)

