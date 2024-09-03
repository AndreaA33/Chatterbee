import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider, ChatContextProvider, SearchContextProvider, MessagesContextProvider } from './context/context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SocketContextProvider } from './context/socketcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChatContextProvider>
          <MessagesContextProvider>
            <SearchContextProvider>
              <SocketContextProvider>
                <App />
              </SocketContextProvider>
            </SearchContextProvider>
          </MessagesContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
