import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { darkTheme } from '../themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  console.log({ rest })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

/* getInitialProps no es recomendado usarlo. Es mas recomendado
  usar getServerSideProps y getStaticProps en lugar de getInitialProps
*/

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' }
  const validThemes = ['light', 'dark', 'custom']

  return {
    theme: validThemes.includes(theme) ? theme : 'dark',
  }
}

export default MyApp
