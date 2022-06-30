import * as React from 'react';
import preloader from './preloader.svg'
import { Box, CircularProgress, Container, Grid } from '@mui/material';

let Preloader = () => {
    return <>
        <Container fixed>
            <Grid container spacing={2} mt='20px' sx={{}}>
                <Grid item xs={12} md={12} sx={{}}>
                    <Box
                        sx={{
                            display: 'flex',

                            justifyContent: 'center'
                        }}
                    >
                        <CircularProgress />

                    </Box>

                </Grid>
            </Grid>
        </Container>
    </>
}

export default Preloader