import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, TextField, 
  Select, MenuItem, FormControl, InputLabel, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { IconSend, IconUsers, IconMail, IconMessage, IconBell } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const BroadcastMain = () => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('all');
  const [type, setType] = useState('push');
  
  const [broadcasts] = useState([
    { id: 1, title: 'New Feature Release', message: 'Check out our new dashboard features!', type: 'Push', audience: 'All Users', sent: '2024-01-20 10:30', status: 'Delivered', recipients: 1250 },
    { id: 2, title: 'Maintenance Notice', message: 'System maintenance scheduled for tonight', type: 'Email', audience: 'Active Users', sent: '2024-01-19 15:45', status: 'Delivered', recipients: 890 },
    { id: 3, title: 'Welcome Message', message: 'Welcome to our mobile app!', type: 'SMS', audience: 'New Users', sent: '2024-01-18 09:15', status: 'Pending', recipients: 45 }
  ]);

  const handleSend = () => {
    console.log('Sending broadcast:', { title, message, audience, type });
    // Reset form
    setTitle('');
    setMessage('');
    setAudience('all');
    setType('push');
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'push': return 'primary';
      case 'email': return 'info';
      case 'sms': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <PageContainer title="Broadcast" description="Message Broadcasting System">
      <Box>
        <Typography variant="h4" mb={3}>Broadcast Center</Typography>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconUsers />
                  <Typography variant="h6">Total Recipients</Typography>
                </Box>
                <Typography variant="h4" color="primary">2,185</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconSend />
                  <Typography variant="h6">Messages Sent</Typography>
                </Box>
                <Typography variant="h4" color="success.main">
                  {broadcasts.filter(b => b.status === 'Delivered').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h4" color="warning.main">
                  {broadcasts.filter(b => b.status === 'Pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Rate</Typography>
                <Typography variant="h4" color="info.main">68%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={3}>Send New Broadcast</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Message Content"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      placeholder="Enter your message here..."
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Message Type</InputLabel>
                      <Select value={type} label="Message Type" onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="push">Push Notification</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="sms">SMS</MenuItem>
                        <MenuItem value="in-app">In-App Message</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Target Audience</InputLabel>
                      <Select value={audience} label="Target Audience" onChange={(e) => setAudience(e.target.value)}>
                        <MenuItem value="all">All Users</MenuItem>
                        <MenuItem value="active">Active Users</MenuItem>
                        <MenuItem value="new">New Users</MenuItem>
                        <MenuItem value="premium">Premium Users</MenuItem>
                        <MenuItem value="inactive">Inactive Users</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" gap={2} mt={2}>
                      <Button variant="outlined" fullWidth>
                        Save Draft
                      </Button>
                      <Button 
                        variant="contained" 
                        fullWidth 
                        startIcon={<IconSend />}
                        onClick={handleSend}
                        disabled={!title || !message}
                      >
                        Send Now
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>Broadcast History</Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Recipients</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sent</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {broadcasts.map((broadcast, index) => (
                        <TableRow key={broadcast.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                                {broadcast.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {broadcast.message}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={broadcast.type} color={getTypeColor(broadcast.type)} size="small" />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {broadcast.recipients.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Chip label={broadcast.status} color={getStatusColor(broadcast.status)} size="small" />
                          </TableCell>
                          <TableCell sx={{ color: 'text.secondary' }}>{broadcast.sent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default BroadcastMain;