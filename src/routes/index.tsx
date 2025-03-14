import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/Layout';
import DappTest from '@/pages/DappTest';
import Home from '@/pages/Home';
import Web3ReactTest from '@/pages/Web3ReactTest';
import { RouteObject } from 'react-router-dom';

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/dapp', element: <DappTest /> },
    { path: '/web3-react', element: <Web3ReactTest /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
