import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { store } from './core/store/store';
import { Provider } from 'react-redux';


function App() {
  return (
    <BrowserRouter basename='/artwork-frontend'>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;