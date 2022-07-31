import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import Cookies from 'js-cookie'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'

import { customTheme, darkTheme, lightTheme } from '../themes'
import '../styles/globals.css'

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const [currentTheme, setcurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
        ? darkTheme
        : customTheme

    setcurrentTheme(selectedTheme)
  }, [])
  

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

/* getInitialProps no es recomendado usarlo. Es mas recomendado
  usar getServerSideProps y getStaticProps en lugar de getInitialProps.
  Cuando implementamos getInitialProps en el archivo _app.tsx se desactiva
  la optimizacion automatica de static generation
*/

/* MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
  const validThemes = ['light', 'dark', 'custom']

  return {
    theme: validThemes.includes(theme) ? theme : 'dark',
  }
} */

export default MyApp
