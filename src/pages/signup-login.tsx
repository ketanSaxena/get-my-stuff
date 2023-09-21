// pages/signup-login.tsx

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  CssBaseline,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppHeader from '@/components/AppHeader';
import RootLayout from './layout';
import { useRouter } from 'next/router';
import error from 'next/error';

export default function SignupLogin() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  }

  return (
    <RootLayout>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6C5B7B, #165281)'
      }}>
        <CssBaseline />
        <AppHeader />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card style={{ padding: 20, width: '30%' }}>
            <CardContent>
              {isSignUp ? <SignUpForm /> : <LoginForm />}
              {isSignUp ? (
                <Typography variant="subtitle1" style={{padding: '1rem 0 0'}}>
                  Already a member? <Link onClick={toggleSignUp}>Login</Link>
                </Typography>
              ) : (
                <Typography variant="subtitle1" style={{padding: '1rem 0 0'}}>
                  Not a member yet? <Link onClick={toggleSignUp}>Sign up</Link>
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </RootLayout>
  );
}

function LoginForm() {
  return (
    <div>
      <Typography variant="h6">Login</Typography>
      <TextField label="Username/Email" type="text" variant="outlined" fullWidth margin="normal" />
      <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button variant="contained" color="primary" fullWidth style={{ marginTop: 16 }}>Login</Button>
      <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
        <Link>Forgot Password?</Link>
      </Typography>
    </div>
  );
}

function SignUpForm() {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
    
  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
  });

  const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = (password: string) => password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
  
  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isEmailValid(formData.email) || !isPasswordValid(formData.password)) {
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        localStorage.setItem('token', data.token);        
        router.push('/');

    } catch (err: any) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
    } finally {
        setIsSubmitting(false);
    }
};

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError('Password must be at least 8 characters long, contain a number and an uppercase letter.');
    } else {
      setPasswordError('');
    }
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <Typography variant="h6">Sign Up</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Username" type="text" variant="outlined" fullWidth margin="normal" />
        <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" onChange={handleEmailChange} error={Boolean(emailError)} helperText={emailError} />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" onChange={handlePasswordChange} error={Boolean(passwordError)} helperText={passwordError} />
        <TextField label="Repeat Password" type="password" variant="outlined" fullWidth margin="normal" />
        <Button type="submit" disabled={isSubmitting || !isEmailValid(formData.email) || !isPasswordValid(formData.password)}>
            Sign Up
        </Button>
      </form>

      {/* Separator */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
        <hr style={{ flex: 1 }} />
        <Typography variant="body2" style={{ margin: '0 8px' }}>OR</Typography>
        <hr style={{ flex: 1 }} />
      </div>

      {/* Social login buttons */}
      <Button
        variant="outlined"
        style={{ marginTop: 16, background: '#fff', borderColor: '#ccc' }}
        fullWidth
        startIcon={<GoogleIcon />}
      >
        Login with Google
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 16, background: '#1877F2' }}
        fullWidth
        startIcon={<FacebookIcon />}
      >
        Login with Facebook
      </Button>
    </div>
  );
}
