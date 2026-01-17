import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import './utils/i18n.ts'
import App from './App.tsx'

const queryClient = new QueryClient()

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
