import '@/style/app.scss';
import { HashRouter } from 'react-router-dom';
import createRouter from '@/router';
import routers from '@/router/routers';
import { KeepAliveProvider } from 'keepalive-react-component';

function App() {
  return (
    <HashRouter>
      <KeepAliveProvider>
        {createRouter(routers)}
      </KeepAliveProvider>
    </HashRouter>
  );
}

export default App;
