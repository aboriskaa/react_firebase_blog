import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import preloader from './preloader.svg'

let Preloader = () => {
    return <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className='preloader_wrapper'>
            <img className='preloader' src={preloader} alt="Loading..." />
        </div></>
}

export default Preloader