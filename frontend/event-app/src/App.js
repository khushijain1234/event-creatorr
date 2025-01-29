import './App.css';
import Event from './pages/Event';
import EventDisplay from './pages/EventDisplay';
import EventList from './pages/EventList';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path='/create-event' element={<Event />} />
      {/* <Route path='/event' element={<EventDisplay />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
