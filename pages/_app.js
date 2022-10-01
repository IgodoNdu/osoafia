import React from 'react'
import '../styles/globals.css'

//implementing the layout on the App (over all the components)
import { Layout } from '../components'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
