import { useRoutes } from 'react-router-dom';
import { Web3Provider } from './Web3Provider';
import routes from '@routes/index';

const App = () => {
  const routing = useRoutes(routes);

  // return <Web3Provider>{routing}</Web3Provider>;
  return routing;
};
export default App;
