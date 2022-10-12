import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import About from './pages/About';
import NavBar from './components/NavBar';
import Article from './pages/Article';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import E404 from './pages/E404';

function App() {
	const theme = createTheme();

	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [viewPost, setViewPost] = useState(localStorage.getItem('viewId'));

	return (
		<ThemeProvider theme={theme}>
			<NavBar
				isAuth={isAuth}
				setIsAuth={setIsAuth}
			/>
			<main>
				<Routes>
					<Route
						path='*'
						element={<E404 />}
					/>
					<Route
						path='/'
						element={<Home isAuth={isAuth} />}
					/>
					<Route
						path='/createpost'
						element={<CreatePost isAuth={isAuth} />}
					/>
					<Route
						path='/login'
						element={
							<Login
								isAuth={isAuth}
								setIsAuth={setIsAuth}
							/>
						}
					/>
					<Route
						path='/about'
						element={
							<About
								isAuth={isAuth}
								setIsAuth={setIsAuth}
							/>
						}
					/>
					<Route
						path='/article'
						element={
							<Article
								viewPost={viewPost}
								setViewPost={setViewPost}
								isAuth={isAuth}
								setIsAuth={setIsAuth}
							/>
						}
					/>
				</Routes>
			</main>
		</ThemeProvider>
	);
}

export default App;
