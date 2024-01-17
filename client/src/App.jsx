import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navbar from './components/Navbar'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Menu from './components/Menu'
// import ToastMessage from './components/ToastMessage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { darkTheme, lightTheme } from './utils/Themes'
import { closeSignin } from './redux/setSigninSlice.jsx'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import PodcastDetails from "./pages/PodcastDetails.jsx";
import DisplayPodcasts from './pages/DisplayPodcasts.jsx';
import Favourites from './pages/Favourites'
import Profile from './pages/Profile'

const Frame = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
`

const Casting = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.bgLight};
    overflow-y: hidden;
    overflow-x: hidden;
`
function App() {
    const [darkMode, setDarkMode] = useState(true)
    const [menuOpen, setMenuOpen] = useState(true)
    // const { open, message, severity } = useSelector((state) => state.snackbar);
    const { opensi } = useSelector((state) => state.signin)
    const [SignUpOpen, setSignUpOpen] = useState(false)
    const [SignInOpen, setSignInOpen] = useState(false)
    const [count, setCount] = useState(0)

    const dispatch = useDispatch()
    //set the menuOpen state to false if the screen size is less than 768px
    useEffect(() => {
        const resize = () => {
            if (window.innerWidth < 1110) {
                setMenuOpen(false)
            } else {
                setMenuOpen(true)
            }
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth < 1110) {
                setMenuOpen(false)
            } else {
                setMenuOpen(true)
            }
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    useEffect(() => {
        dispatch(closeSignin())
    }, [])
    return (
        <>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <BrowserRouter>
                    {opensi && (
                        <Signin
                            setSignInOpen={setSignInOpen}
                            setSignUpOpen={setSignUpOpen}
                        />
                    )}
                    {SignUpOpen && (
                        <Signup
                            setSignInOpen={setSignInOpen}
                            setSignUpOpen={setSignUpOpen}
                        />
                    )}
                    <Casting>
                        {menuOpen && (
                            <Menu
                                darkMode={darkMode}
                                setMenuOpen={setMenuOpen}
                                setDarkMode={setDarkMode}
                            />
                        )}
                        <Frame>
                            <Navbar setMenuOpen={setMenuOpen} />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="search" element={<Search />} />
                                <Route
                                    path="/favourites"
                                    element={<Favourites />}
                                />
                                <Route path="/profile" element={<Profile />} />
                                <Route path='/podcast/:id' exact element={<PodcastDetails />} />
                                <Route path='/showpodcasts/:type' exact element={<DisplayPodcasts/>} />
                            </Routes>
                        </Frame>
                        {/* {open && <ToastMessage open={open} message={message} severity={severity} />} */}
                    </Casting>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
