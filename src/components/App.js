import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Signin/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
