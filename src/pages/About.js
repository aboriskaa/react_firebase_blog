import {
	Grid,
	Container,
	Typography,
	Box,
	MobileStepper,
	Paper,
	Button,
} from '@mui/material';
import { useState } from 'react';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = [
	{
		label: 'React (on JavaScript)',
		description: `React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
        Declarative views make your code more predictable and easier to debug.
        Hooks are used: useState, useEffect`,
	},
	{
		label: 'Firebase',
		description: `Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world.`,
	},
	{
		label: 'MUI (Material UI)',
		description: `MUI offers a comprehensive suite of UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components.`,
	},
];

function About(theme) {
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = steps.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<>
			<Container fixed>
				<Grid
					container
					spacing={2}
					mt='20px'
					mb='20px'
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
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Typography
								variant='h4'
								component='div'
							>
								Hello, Dear friend!
							</Typography>
							<Typography
								variant='h5'
								component='div'
							>
								This is part of my React portfolio.
							</Typography>
							<Typography
								variant='h5'
								component='div'
							>
								Which stack is used here?
							</Typography>
							<Box sx={{ maxWidth: 375, flexGrow: 1 }}>
								<Paper
									square
									elevation={0}
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										height: 80,
										pl: 2,
										bgcolor: 'background.default',
									}}
								>
									<Typography
										sx={{
											color: 'primary.main',
										}}
										variant='h5'
										component='div'
									>
										{steps[activeStep].label}
									</Typography>
								</Paper>
								<Box sx={{ height: 260, maxWidth: 375, p: 2 }}>
									{steps[activeStep].description}
								</Box>
								<MobileStepper
									variant='text'
									steps={maxSteps}
									position='static'
									activeStep={activeStep}
									nextButton={
										<Button
											size='small'
											onClick={handleNext}
											disabled={activeStep === maxSteps - 1}
										>
											Next
											{theme.direction === 'rtl' ? (
												<KeyboardArrowLeft />
											) : (
												<KeyboardArrowRight />
											)}
										</Button>
									}
									backButton={
										<Button
											size='small'
											onClick={handleBack}
											disabled={activeStep === 0}
										>
											{theme.direction === 'rtl' ? (
												<KeyboardArrowRight />
											) : (
												<KeyboardArrowLeft />
											)}
											Back
										</Button>
									}
								/>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default About;
