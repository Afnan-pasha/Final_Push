import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, Chip } from '@mui/material';
import { Assessment, VerifiedUser, CheckCircle, Cancel, Schedule } from '@mui/icons-material';

const CheckerReports = () => {
  // Placeholder content; expand with final-approval analytics later
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Checker Reports
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
                Final review outcomes and throughput.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                <Chip icon={<Schedule />} label="Under Review" />
                <Chip icon={<CheckCircle />} label="Final Approved" color="success" />
                <Chip icon={<Cancel />} label="Final Rejected" color="error" />
                <Chip icon={<VerifiedUser />} label="Compliance" color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <VerifiedUser color="secondary" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quality</Typography>
              </Box>
              <Typography color="text.secondary">
                Add SLA and audit metrics here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckerReports;