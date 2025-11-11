import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StrictMode } from 'react'
import FavProvider from "./context/FavContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavProvider>
      <App />
    </FavProvider>
  </StrictMode>
)
