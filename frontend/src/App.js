import { Provider } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import store from './utils/store';
import Layout from './components/Layout';

function App() {
  return (
   <Provider store={store}>

    <Layout/>
   </Provider>
  );
}

export default App;
