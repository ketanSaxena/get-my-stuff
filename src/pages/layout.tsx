import { CssBaseline } from '@mui/material'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #6C5B7B, #165281)'
    }}>
      <CssBaseline />
      {children}
    </div>
  )
}
