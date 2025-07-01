import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const sources = [
  { name: 'FlexJobs', url: 'https://flexjobs.com' },
  { name: 'We Work Remotely', url: 'https://weworkremotely.com' },
  { name: 'Arc', url: 'https://arc.dev' },
  { name: 'Jobspresso', url: 'https://jobspresso.co' },
  { name: 'RemoteCo', url: 'https://remote.co' },
  { name: 'JustRemote', url: 'https://justremote.co' },
  { name: 'Virtual Vocations', url: 'https://virtualvocations.com' },
  { name: 'Remotive', url: 'https://remotive.io' },
  { name: 'Skip the Drive', url: 'https://skipthedrive.com' },
  { name: 'Pangian', url: 'https://pangian.com' },
  { name: 'Working Nomads', url: 'https://workingnomads.co' },
  { name: 'PowerToFly', url: 'https://powertofly.com' },
  { name: 'Dribbble', url: 'https://dribbble.com' },
  { name: 'Remote OK', url: 'https://remoteok.com' },
  { name: 'Landing.Jobs', url: 'https://landing.jobs' },
  { name: 'Career Vault', url: 'https://careervault.io' },
  { name: 'Authentic Jobs', url: 'https://authenticjobs.com' },
  { name: 'Wellfound', url: 'https://wellfound.com' },
  { name: 'Upwork', url: 'https://upwork.com' },
  { name: 'Fiverr', url: 'https://fiverr.com' },
  { name: 'Designhill', url: 'https://designhill.com' },
  { name: 'Toptal Business', url: 'https://toptal.com' },
  { name: 'Freelancer', url: 'https://freelancer.com' },
  { name: 'FreelancerMap', url: 'https://freelancermap.com' },
  { name: 'Gun', url: 'https://gun.io' },
  { name: 'Behance', url: 'https://behance.net' },
];

const FeaturedSources: React.FC = () => (
  <Box sx={{ maxWidth: 400, mx: 'auto', my: 4 }}>
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Featured Remote Job Sources
        </Typography>
        <List sx={{ maxHeight: 350, overflow: 'auto' }}>
          {sources.map((src) => (
            <ListItem key={src.url}>
              <ListItemText primary={<Link href={src.url} target="_blank" rel="noopener noreferrer">{src.name}</Link>} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default FeaturedSources; 