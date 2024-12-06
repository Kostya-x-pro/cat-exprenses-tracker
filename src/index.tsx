import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { AuthProvider } from './store/AuthProvider';

import App from './App';
import store from './store';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AuthProvider>
      <App /> 
    </AuthProvider>
  </Provider>
);
