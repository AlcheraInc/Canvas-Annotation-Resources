'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import theme from '../theme'
import { ThemeProvider } from '@mui/material/styles'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ ThemeProvider>
      </body>
    </html>
  )
}
