import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'role', headerName: 'Job Role', width: 180 },
  { field: 'companyName', headerName: 'Company', width: 180 },
  { field: 'salary', headerName: 'Salary', width: 120 },
  { field: 'applicationLink', headerName: 'Job Link', width: 180, renderCell: (params) => <a href={params.value} target="_blank" rel="noopener noreferrer">Apply</a> },
  { field: 'location', headerName: 'Location', width: 140 },
  { field: 'jobType', headerName: 'Job Type', width: 120 },
];

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [locationFilter, setLocationFilter] = useState('All');
  useEffect(() => {
    fetch('https://muli-agent-job-search.onrender.com/api/v1/job-search/all')
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []));
  }, []);
  const filteredJobs = locationFilter === 'All'
    ? jobs
    : jobs.filter((j: any) => (j.location || '').toLowerCase().includes(locationFilter.toLowerCase()));

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', pt: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ width: '100%', maxWidth: 1100 }}>
        <Paper elevation={8} sx={{ p: { xs: 3, md: 6 }, borderRadius: 6, background: 'rgba(255,255,255,0.85)', boxShadow: 6, mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={900} color="primary" sx={{ mb: 4 }}>
            Job Results
          </Typography>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl sx={{ minWidth: 180 }} size="small">
              <InputLabel id="location-filter-label">Location</InputLabel>
              <Select
                labelId="location-filter-label"
                value={locationFilter}
                label="Location"
                onChange={e => setLocationFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {filteredJobs.length > 0 ? (
            <Box sx={{ height: 520, width: '100%' }}>
              <DataGrid rows={filteredJobs.map((j: any, i: number) => ({ id: i, ...j }))} columns={columns} pageSizeOptions={[10]} sx={{ borderRadius: 4, background: 'rgba(255,255,255,0.92)' }} />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No jobs found for your search.
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/search')} sx={{ mt: 2 }}>
                  Back to Search
                </Button>
              </motion.div>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ResultsPage; 