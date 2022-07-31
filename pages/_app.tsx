import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'

import { customTheme, darkTheme, lightTheme } from '../themes'
import '../styles/globals.css'

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const currentTheme: Theme = theme === 'light'
    ? lightTheme
    : (theme === 'dark')
      ? darkTheme
      : customTheme

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
