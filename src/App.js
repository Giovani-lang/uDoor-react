import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Content from './components/content/Content';
import Sidebar from './components/sidebar/Sidebar';
import Navibar from './components/navibar/Navibar';

const App = () => {
  return (
    <BrowserRouter>
    
          <Navibar />
        <div style={{display: 'flex', flexDirection:'row'}}>
        <Sidebar />
        
        <Content />
        </div>
          
    
    </BrowserRouter>
  );
};


export default App;









