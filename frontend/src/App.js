import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Diets from './components/Diets';
import UserState from './components/context/nutrition/UserState';
import Workout from './components/Workout';
import Water from './components/Water';
import Chatbot from './components/Chatbot';

function AppWrapper() {
  const location = useLocation();
  const showChatbot = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/diets" element={<Diets />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/water" element={<Water />} />
      </Routes>

      {showChatbot && <Chatbot />}
    </>
  );
}

function App() {
  return (
    <UserState>
      <Router>
        <AppWrapper />
      </Router>
    </UserState>
  );
}

export default App;
