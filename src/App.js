import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Content from './components/content/Content';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', position: 'absolute', top: '0px' }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ marginTop: '-21px' }}>
          <Content />
        </div>
      </div>
    </BrowserRouter>
  );
};


export default App;









