import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Link from 'next/link';

function AppHeader() {
    return (
        <AppBar position="static">
            <Toolbar style={{justifyContent: 'space-between'}}>
                <Link href="/" passHref>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        GetMyStuff
                    </Typography>
                </Link>
                <Link href="/signup-login" passHref>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default AppHeader;
