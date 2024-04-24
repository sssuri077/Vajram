import React from 'react'
import Table from './Components/Table'
import { Toaster } from "react-hot-toast";

const App = () => {
    
  return (
    <div>
        <Toaster
      containerClassName="toast_message"
      gutter={100}
      toastOptions={{
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#84d32a',
            secondary: 'white',
          },

          style: {
            background: '#4d9100',
            color: 'white',
            position: "relative",
            zIndex: 1
          },
        },

        error: {
          duration: 4000,
          zIndex: 1,
          iconTheme: {
            primary: 'red',
            secondary: 'white',
          },

          style: {
            background: '#c51818',
            color: 'rgb(241 241 241)',
            fontSize: '14px',
            position: "relative",
            zIndex: 1
          },
        },
      }}
    />
      <Table/>
    </div>
  )
}

export default App
