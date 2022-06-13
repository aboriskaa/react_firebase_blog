import preloader from './preloader.svg'

let Preloader = () => {
    return <div className='preloader_wrapper'>
        <img className='preloader' src={preloader} alt="Loading..." />
    </div>
}

export default Preloader