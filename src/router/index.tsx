import Main from 'pages/Main';
import MainLayout from 'layouts/MainLayout';
import Autocomplete from 'pages/Autocomplete';
import Breadcrumbs from 'pages/Breadcrumbs';
import Checkbox from 'pages/Checkbox';
import Button from 'pages/Button';
import Datepicker from 'pages/Datepicker';
import FileInput from 'pages/FileInput';
import Modal from 'pages/Modal';
import Pagination from 'pages/Pagination';
import RadioButton from 'pages/RadioButton';
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
            {
                path: '/breadcrumbs',
                element: <Breadcrumbs />,
            },
            {
                path: '/button',
                element: <Button />,
            },
            {
                path: '/checkbox',
                element: <Checkbox />,
            },
            {
                path: '/datepicker',
                element: <Datepicker />,
            },
            {
                path: '/file-input',
                element: <FileInput />,
            },
            {
                path: '/modal',
                element: <Modal />,
            },
            {
                path: '/pagination',
                element: <Pagination />,
            },
            {
                path: '/radio-button',
                element: <RadioButton />,
            },
        ],
    },
]);