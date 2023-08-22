import Main from 'pages/Main';
import MainLayout from 'layouts/MainLayout';
import Autocomplete from 'pages/Autocomplete';
import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Main />,
            },
            {
                path: '/autocomplete',
                element: <Autocomplete />,
            },
        ],
    },
]);