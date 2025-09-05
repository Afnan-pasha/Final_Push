import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, Chip } from '@mui/material';
import { Assessment, TrendingUp, Schedule, CheckCircle, Cancel } from '@mui/icons-material';

const MakerReports = () => {
  // Placeholder content; expand with real analytics later
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Maker Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Assessment color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Overview</Typography>
              </Box>
              <Typography color="text.secondary">
                Summary of maker activity and application outcomes.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                <Chip icon={<Schedule />} label="Pending Reviews" />
                <Chip icon={<CheckCircle />} label="Approved" color="success" />
                <Chip icon={<Cancel />} label="Rejected" color="error" />
                <Chip icon={<TrendingUp />} label="Trends" color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TrendingUp color="secondary" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Performance</Typography>
              </Box>
              <Typography color="text.secondary">
                Charts and KPIs can be added here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MakerReports;