import { Routes, Route } from 'react-router-dom';
import DriversList from './DriversList';
import DriverDetail from './DriverDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DriversList />} />
      <Route path="/drivers/:id" element={<DriverDetail />} />
    </Routes>
  );
}

export default App;
