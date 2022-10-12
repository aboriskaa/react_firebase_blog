import { Grid, Container, Typography, Box } from '@mui/material';

function E404() {
	return (
		<>
			<Container fixed>
				<Grid
					container
					spacing={2}
					mt='20px'
					sx={{}}
				>
					<Grid
						item
						xs={12}
						md={12}
						sx={{}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Typography
								Typography
								variant='h3'
								gutterBottom
								component='div'
							>
								Upss))) 404
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default E404;
