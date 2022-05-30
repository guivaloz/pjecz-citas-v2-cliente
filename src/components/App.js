import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import CitClienteState from '../context/citcliente/CitClienteState'

import InstitutionalTheme from '../theme/InstitutionalTheme'

import Footer from './ui/Footer'
import Navigation from './ui/Navigation'

import CancelCitaScreen from './citas/CancelCitaScreen'
import ListCitasScreen from './citas/ListCitasScreen'
import NewCitaScreen from './citas/NewCitaScreen'

import LogInScreen from './auth/LogInScreen'
import LogOutScreen from './auth/LogOutScreen'
import NewAccountScreen from './auth/NewAccountScreen'
import NewAccountConfirmScreen from './auth/NewAccountConfirmScreen'
import ProfileScreen from './auth/ProfileScreen'
import RecoverAccountScreen from './auth/RecoverAccountScreen'
import RecoverAccountConfirmScreen from './auth/RecoverAccountConfirmScreen'

import PrivacyTermsScreen from './static/PrivacyTermsScreen'
import UseTermsScreen from './static/UseTermsScreen'


const Layout = () => {
    return(
        <ThemeProvider theme={InstitutionalTheme}>
            <CitClienteState>
                <Navigation />
                <Outlet />
            </CitClienteState>
            <Footer />
        </ThemeProvider>
    )
}

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<ListCitasScreen />} />
                    <Route path='/new' element={<NewCitaScreen />} />
                    <Route path='/cancel' element={<CancelCitaScreen />} />
                    <Route path='/login' element={<LogInScreen />} />
                    <Route path='/logout' element={<LogOutScreen />} />
                    <Route path='/new_account' element={<NewAccountScreen />} />
                    <Route path='/new_account_confirm' element={<NewAccountConfirmScreen />} />
                    <Route path='/profile' element={<ProfileScreen />} />
                    <Route path='/recover_account' element={<RecoverAccountScreen />} />
                    <Route path='/recover_account_confirm' element={<RecoverAccountConfirmScreen />} />
                    <Route path='/privacy_terms' element={<PrivacyTermsScreen />} />
                    <Route path='/use_terms' element={<UseTermsScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
