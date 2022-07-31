import { ChangeEvent, FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'

import { Layout } from '../components/layouts'

const ThemeChangerPage: FC = ({ theme, name }) => {
    const [currentThem, setCurrentThem] = useState('light')
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    /* La req es la solicitud del cliente, es decir, cuando la persona ingresa a la URL
    del sitio se realiza un request hacia el backend */
    const { theme = 'light', name = 'No name' } = req.cookies

    return {
        props: {
            theme,
            name,
        }
    }
}

export default ThemeChangerPage
