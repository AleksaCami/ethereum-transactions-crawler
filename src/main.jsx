import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import AppRouter from './Router';

// Styles
import './index.css'
import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <AppRouter />
    </ChakraProvider>
  </React.StrictMode>
)
