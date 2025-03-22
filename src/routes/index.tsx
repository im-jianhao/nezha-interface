import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/Layout';
import DappTest from '@/pages/DappTest';
import Home from '@/pages/Home';
import Web3ReactTest from '@/pages/Web3ReactTest';
import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '@/components/common/Loading';

// 使用React.lazy异步加载Test组件
const Test = lazy(() => import('@/pages/Test'));

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/dapp', element: <DappTest /> },
    { path: '/web3-react', element: <Web3ReactTest /> },
    { path: '/', element: <Home /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};

// 异步加载的路由单独配置
const asyncRoutes = {
  path: '/jh',
  element: <Layout />,
  children: [{ path: 'test', element: <Test /> }],
};

Routes.push(mainRoutes);
Routes.push(asyncRoutes);

export default Routes;
