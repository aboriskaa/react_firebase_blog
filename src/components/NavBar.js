import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import {
	AppBar,
	Container,
	IconButton,
	Toolbar,
	Typography,
	Box,
	Menu,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Home', 'About'];
const settings = ['Create post', 'Logout'];

function NavBar(props) {
	// let location = useLocation();
	// let path = location.pathname;
	// console.log(path)

	let navigate = useNavigate();

	let logo = 'A. BORIS';

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handlePageNavigation = (page) => {
		if (page === 'Home') {
			navigate('/');
		} else if (page === 'About') {
			navigate('/about');
		}
	};

	const signUserOut = () => {
		signOut(auth).then((result) => {
			if (result !== null) {
				localStorage.clear();
				props.setIsAuth(false);
				navigate('/login');
			}
		});
	};

	//
	return (
		<>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						{/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
						<Typography
							variant='h6'
							noWrap
							component='a'
							// href="/"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							{logo}
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem
										key={page}
										onClick={() => {
											handleCloseNavMenu();
											handlePageNavigation(page);
										}}
									>
										<Typography textAlign='center'>{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
						<Typography
							variant='h5'
							noWrap
							component='a'
							href=''
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							{logo}
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={() => {
										handleCloseNavMenu();
										handlePageNavigation(page);
									}}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							{!props.isAuth ? (
								<Button
									onClick={() => {
										navigate('/login');
									}}
									color='inherit'
								>
									Login
								</Button>
							) : (
								<>
									<Tooltip title='Open settings'>
										<IconButton
											onClick={handleOpenUserMenu}
											sx={{ p: 0 }}
										>
											<Avatar
												alt={localStorage.getItem('displayName')}
												src={localStorage.getItem('photoURL')}
											/>
										</IconButton>
									</Tooltip>
								</>
							)}

							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={() => {
											handleCloseUserMenu();
											if (setting === 'Logout') {
												signUserOut();
											} else if (setting === 'Create post') {
												navigate('/createpost');
											}
										}}
									>
										<Typography textAlign='center'>{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
}

export default NavBar;
