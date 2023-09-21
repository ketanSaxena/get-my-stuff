import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Tooltip,
  InputAdornment,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import RootLayout from './layout';
import { useRouter } from 'next/router';
import AppHeader from '@/components/AppHeader';

export default function Home() {
  // Sample data for autocomplete input. Replace with your own data or API call.
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia"];

  const categories = ["Electronics", "Furniture", "Clothes", "Books", "Toys"];

  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/trips');
  };

  return (
    <RootLayout>
      <AppHeader />
      <Container component="main" maxWidth="xs">
        <Box sx={{ mt: 8, mb: 2 }}>
          <Card sx={{ padding: '1rem', backgroundColor: '#fff' }}>
            <CardHeader title="Search Trip" titleTypographyProps={{ align: 'center', variant: 'h5' }} />
            <CardContent>
              <Box
                component="form"
                noValidate
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem', // This provides the spacing between the elements
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      options={cities}
                      renderInput={(params) => (
                        <TextField {...params} label="Send from" required />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      options={cities}
                      renderInput={(params) => (
                        <TextField {...params} label="Send to" required />
                      )}
                    />
                  </Grid>
                </Grid>
                <TextField
                  id="date"
                  label="Trip Date"
                  type="date"
                  defaultValue="2023-01-01"
                  sx={{ width: '100%', marginTop: 2 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="I am flexible with dates"
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Tooltip title="Estimated weight of total stuff you want to send (kg)" arrow>
                      <TextField
                        fullWidth
                        label="Weight"
                        type="number"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">
                            <Typography variant="caption" color="gray">KG</Typography>
                          </InputAdornment>,
                          inputProps: { step: 0.1 }
                        }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      fullWidth
                      multiple
                      options={categories}
                      renderInput={(params) => (
                        <TextField {...params} label="Category" fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SearchIcon />}
                  style={{ marginTop: 20, width: '100%' }}
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </RootLayout>
  );
}
