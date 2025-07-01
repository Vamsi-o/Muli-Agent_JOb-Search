import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress, Divider, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobSearchPage: React.FC = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/v1/job-search', { role });
      navigate('/results', { state: { jobs: res.data.jobs } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'linear-gradient(135deg, #fdf6e3 0%, #f5f7fa 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, minWidth: 340 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
            What job are you looking for?
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Job Role (e.g. Software Engineer)" fullWidth margin="normal" value={role} onChange={e => setRole(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, mb: 1 }} size="large" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Jobs'}
            </Button>
          </form>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default JobSearchPage; 