import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import React from 'react';

const Home = React.lazy(() => import('../pages/home'));
const PdfComponent = React.lazy(() => import('../pages/pdf/concat'));
const PdfSplitPage = React.lazy(() => import('../pages/pdf/split'));
const ImageTransformPage = React.lazy(() => import('../pages/image/transform'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/pdf',
		element: <Layout />,
		children: [
			{ path: 'concat', element: <PdfComponent /> },
			{ path: 'split', element: <PdfSplitPage /> }
		]
	},
	{
		path: '/image',
		element: <Layout />,
		children: [{ path: 'transform', element: <ImageTransformPage /> }]
	}
]);
