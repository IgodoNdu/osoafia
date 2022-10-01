import React from 'react'
import '../styles/globals.css'
//for state notification pop-up
import { Toaster } from 'react-hot-toast'

//implementing the layout on the App (over all the components)
import { Layout } from '../components'

//implementing Context for all components of the App
import { StateContext } from '../context/StateContext'


function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
