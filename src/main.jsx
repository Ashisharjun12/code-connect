import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
 
    <div>
    <Toaster position='top-right' toastOptions={{
      success:{
        theme:{
          primary:"#4aed88"
        }
      }
    }}>



</Toaster>

    </div>
   
  <RouterProvider router={router}/>
  </>
  
)
