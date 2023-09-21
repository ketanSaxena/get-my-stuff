import { AppBar, Toolbar, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Card, IconButton, Pagination } from '@mui/material';
import { Flight, Facebook, LinkedIn, Instagram, AccountCircle } from '@mui/icons-material';
import RootLayout from './layout';
import AppHeader from '@/components/AppHeader';

function Trips() {
  return (
    <RootLayout>
      <AppHeader />

      {/* Search Form */}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Card sx={{ padding: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <TextField label="Send from" variant="outlined" size="small" sx={{ marginRight: 1 }} />
            <TextField label="Send to" variant="outlined" size="small" sx={{ marginRight: 1 }} />
            <TextField
              id="date"
              label="Trip Date"
              type="date"
              defaultValue="2023-01-01"
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              sx={{ marginRight: 1 }}
            />
            <Button variant="contained" color="primary">Search</Button>
          </Box>
        </Card>
      </Box>

      {/* Table */}
      <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 1, width: '80%', margin: '1rem auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><h4>Traveller</h4></TableCell>
              <TableCell><h4>Leaving on</h4></TableCell>
              <TableCell><h4>Travelling via</h4></TableCell>
              <TableCell><h4>Spare weight</h4></TableCell>
              <TableCell><h4>Social Links</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Ajay P.</TableCell>
              <TableCell>01 Sept, 10:30 AM</TableCell>
              <TableCell><Flight /> AI-353</TableCell>
              <TableCell>2 kgs</TableCell>
              <TableCell>
                <Facebook sx={{ marginRight: 1 }} />
                <LinkedIn />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jaya Bacchan</TableCell>
              <TableCell>01 Sept, 02:45 PM</TableCell>
              <TableCell><Flight /> IX-267</TableCell>
              <TableCell>3.5 kgs</TableCell>
              <TableCell>
                <Facebook sx={{ marginRight: 1 }} />
                <Instagram sx={{ marginRight: 1 }} />
                <LinkedIn />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </RootLayout>
  );
}

export default Trips;
