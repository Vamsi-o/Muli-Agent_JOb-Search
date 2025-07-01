import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme, Button, Box, AppBar, Toolbar, Typography, Link } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import JobSearchPage from './pages/JobSearchPage';
import ResultsPage from './pages/ResultsPage';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/auth" replace />;
};

const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <Button color="secondary" variant="outlined" onClick={onLogout} sx={{ ml: 2 }}>
      Logout
    </Button>
  );
};

const TopNav: React.FC = () => {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setAuthed(!!localStorage.getItem('token'));
    };
    
    // Listen for storage changes (when user logs in/out)
    window.addEventListener('storage', checkAuth);
    // Also check on focus (in case of same-tab logout)
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthed(false);
    navigate('/auth');
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{
      top: 0,
      left: 0,
      right: 0,
      mx: 'auto',
      mt: 2,
      width: { xs: '95vw', md: '80vw' },
      borderRadius: 5,
      background: 'rgba(255,255,255,0.85)',
      boxShadow: '0 4px 24px 0 rgba(30, 34, 90, 0.08)',
      backdropFilter: 'blur(8px)',
      zIndex: 1201,
      px: { xs: 2, md: 6 },
      py: 1.5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Toolbar disableGutters sx={{ width: '100%', minHeight: 0, px: 0 }}>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 1, color: 'primary.main', ml: 2 }}>
          <Link component={RouterLink} to="/" underline="none" color="inherit">
            🚀 DevHire
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mr: 2 }}>
          <Button component={RouterLink} to="/" color="primary" sx={{ fontWeight: 700, fontSize: 16, px: 2, borderRadius: 2 }}>Home</Button>
          {authed ? (
            <>
              <Button component={RouterLink} to="/search" color="primary" sx={{ fontWeight: 700, fontSize: 16, px: 2, borderRadius: 2 }}>Search</Button>
              <LogoutButton onLogout={handleLogout} />
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/auth" color="primary" sx={{ fontWeight: 700, fontSize: 16, px: 2, borderRadius: 2 }}>Login</Button>
              <Button component={RouterLink} to="/auth" variant="contained" color="primary" sx={{ fontWeight: 700, fontSize: 16, px: 3, borderRadius: 2 }}>Get Started</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><LandingPage /></motion.div>} />
        <Route path="/auth" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><AuthPage /></motion.div>} />
        <Route path="/search" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><JobSearchPage /></motion.div></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}><ResultsPage /></motion.div></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', position: 'fixed', top: 0, left: 0, zIndex: 0 }} />
    <Router>
      <TopNav />
      <Box sx={{ pt: 10, position: 'relative', zIndex: 1 }}>
        <AnimatedRoutes />
      </Box>
    </Router>
  </ThemeProvider>
);

export default App; 