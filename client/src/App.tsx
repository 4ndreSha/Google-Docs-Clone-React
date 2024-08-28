import './styles.css';
import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <header>
      <Link className='link' to=''>Home</Link>
    </header>
  );
};

export default App;
