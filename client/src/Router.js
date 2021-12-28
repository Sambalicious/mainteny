import { Routes, Route } from 'react-router-dom';
import Courses from './components/Courses';
import StudentDetails from './components/StudentDetails';
import Students from './components/Students';
import Home from './components/Home';

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </div>
  );
};

export default Router;
