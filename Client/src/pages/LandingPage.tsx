import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = () => !!localStorage.getItem('token');
  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate('/search');
    } else {
      navigate('/auth');
    }
  };
  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', overflowX: 'hidden', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 8, px: 4, pt: 10, position: 'relative' }}>
        {/* Left: Headline and CTA */}
        <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ flex: 1, zIndex: 2 }}>
          <Typography variant="h2" fontWeight={900} color="primary" gutterBottom sx={{ fontSize: { xs: 36, md: 56 }, lineHeight: 1.1 }}>
            Find Your Next Developer Job Instantly
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
            AI-powered search across top startups, accelerators, and job boards. No spam. No noise. Just real opportunities.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ px: 6, py: 2, fontWeight: 700, fontSize: 22, borderRadius: 3, boxShadow: 4 }} onClick={handleGetStarted}>
            Get Started
          </Button>
        </motion.div>
        {/* Right: Illustration or animated gradient blob */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <Box sx={{ width: 360, height: 360, borderRadius: '50%', background: 'linear-gradient(135deg, #1976d2 0%, #f50057 100%)', filter: 'blur(16px)', opacity: 0.25, position: 'absolute', right: { md: 80, xs: 0 }, top: { md: 120, xs: 0 } }} />
          <Box sx={{ width: 320, height: 320, borderRadius: '50%', background: 'linear-gradient(135deg, #f50057 0%, #1976d2 100%)', filter: 'blur(24px)', opacity: 0.18, position: 'absolute', right: { md: 120, xs: 0 }, top: { md: 180, xs: 0 } }} />
          <Box sx={{ width: 320, height: 320, borderRadius: '50%', background: 'linear-gradient(135deg, #fff 0%, #e0eafc 100%)', opacity: 0.12, position: 'relative' }} />
        </motion.div>
      </Box>
      {/* Feature Cards Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'center', mt: 2, mb: 8, px: 2 }}>
          {[
            { title: 'AI-Powered Search', desc: 'Instantly find jobs across startups, accelerators, and job boards.' },
            { title: 'Real-Time Validation', desc: 'Only see jobs with working application links and recent postings.' },
            { title: 'Advanced Filtering', desc: 'Filter by remote, onsite, hybrid, and more.' },
          ].map((f, i) => (
            <Paper key={f.title} elevation={6} sx={{ p: 4, borderRadius: 4, minWidth: 260, maxWidth: 320, textAlign: 'center', background: 'rgba(255,255,255,0.97)', boxShadow: 4 }}>
              <Typography variant="h6" fontWeight={800} color="primary" gutterBottom>
                {f.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {f.desc}
              </Typography>
            </Paper>
          ))}
        </Box>
      </motion.div>
      {/* How It Works Section */}
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <Box sx={{ py: 8, px: 2, maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900} color="secondary" gutterBottom>
            How It Works
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', mt: 4 }}>
            {[
              { step: 1, title: 'Tell Us What You Want', desc: 'Sign up and specify your ideal job, skills, and preferences.' },
              { step: 2, title: 'AI Finds the Best Jobs', desc: 'Our agent scours the web, startups, and job boards in real time.' },
              { step: 3, title: 'Apply Instantly', desc: 'See curated jobs and apply with one click.' },
            ].map((s, i) => (
              <Paper key={s.title} elevation={4} sx={{ p: 4, borderRadius: 4, minWidth: 240, maxWidth: 340, textAlign: 'center', background: 'rgba(255,255,255,0.98)', boxShadow: 2 }}>
                <Typography variant="h2" color="primary" fontWeight={900} sx={{ fontSize: 48, mb: 1 }}>{s.step}</Typography>
                <Typography variant="h6" fontWeight={700} color="secondary" gutterBottom>{s.title}</Typography>
                <Typography variant="body1" color="text.secondary">{s.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </motion.div>
      {/* Value Props Section */}
      <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
        <Box sx={{ py: 8, px: 2, maxWidth: 1100, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={900} color="primary" gutterBottom>
            Why Choose Us?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4, mt: 4 }}>
            {[
              'Curated by AI, not spam.',
              'Accelerator-backed startups only.',
              'No outdated or fake jobs.',
              'Modern, beautiful, animated UI.',
              'Remote, onsite, and hybrid roles.',
              'Apply with one click.',
            ].map((v, i) => (
              <Paper key={v} elevation={2} sx={{ p: 3, borderRadius: 3, background: 'rgba(255,255,255,0.96)', fontWeight: 600, fontSize: 18, color: 'text.secondary', boxShadow: 1 }}>
                {v}
              </Paper>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default LandingPage; 