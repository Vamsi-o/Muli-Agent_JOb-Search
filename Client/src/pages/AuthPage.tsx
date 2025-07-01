import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Switch, FormControlLabel, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = isLogin
        ? 'https://muli-agent-job-search.onrender.com/api/v1/auth/login'
        : 'https://muli-agent-job-search.onrender.com/api/v1/auth/register';
      const res = await axios.post(url, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/search');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 340 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }} size="large" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (isLogin ? 'Login' : 'Register')}
            </Button>
          </form>
          <FormControlLabel
            control={<Switch checked={!isLogin} onChange={() => setIsLogin(v => !v)} color="primary" />}
            label={isLogin ? 'Switch to Register' : 'Switch to Login'}
            sx={{ display: 'block', mt: 2 }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AuthPage; 