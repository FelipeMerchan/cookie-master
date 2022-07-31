import { ChangeEvent, useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'

import { Layout } from '../components/layouts'

type ThemeChangerProps = {
    theme: string;
    name: string;
  }

const ThemeChangerPage = ({ theme, name }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [currentThem, setCurrentThem] = useState(theme)

    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value
        setCurrentThem(selectedTheme)
        localStorage.setItem('theme', selectedTheme)
        Cookies.set('theme', selectedTheme)
    }

    const handleClick = async () => {
        const { data } = await axios.get('/api/hello')
        console.log({ data })
    }

    useEffect(() => {
      console.log('LocalStorage: ', localStorage.getItem('theme'))
      console.log('Cookies: ', Cookies.get('theme'))
    }, [])
    

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>
                            Tema
                        </FormLabel>
                        <RadioGroup
                            value={currentThem}
                            onChange={onThemeChange}
                        >
                            <FormControlLabel value='light' control={<Radio />} label='Light' />
                            <FormControlLabel value='dark' control={<Radio />} label='Dark' />
                            <FormControlLabel value='custom' control={<Radio />} label='Custom' />
                        </RadioGroup>
                    </FormControl>
                    <Button
                        onClick={handleClick}
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<ThemeChangerProps> = async ({ req }) => {
    /* La req es la solicitud del cliente, es decir, cuando la persona ingresa a la URL
    del sitio se realiza un request hacia el backend */
    const { theme = 'light', name = 'No name' } = req.cookies
    const validThemes = ['light', 'dark', 'custom']

    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark',
            name,
        }
    }
}

export default ThemeChangerPage
