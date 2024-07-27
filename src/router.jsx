
import {  createBrowserRouter } from 'react-router-dom';


import Home from './pages/Home.jsx';
import Editor from './pages/Editor.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element:<Home/>,
    },
    {
        path: '/Editor/:roomId',
        element:<Editor/>,
    },
]);



export default router;
