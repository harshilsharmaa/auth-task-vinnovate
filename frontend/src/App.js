import { Provider } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import store from './utils/store';

function App() {
  return (
   <Provider store={store}>
    <Auth/>
   </Provider>
  );
}

export default App;
