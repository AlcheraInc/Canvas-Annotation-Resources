import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import { StyledEngineProvider } from '@mui/material/styles';


export default function App({ Component, pageProps }: AppProps) {
  return (<StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </StyledEngineProvider>)

}
