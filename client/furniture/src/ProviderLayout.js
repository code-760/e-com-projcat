 "use client";
 import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redex/store/store'

export default function ProviderLayout({children}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
