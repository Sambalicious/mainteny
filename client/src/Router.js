import { Routes, Route } from 'react-router-dom';
import Courses from './components/Courses';
import StudentDetails from './components/StudentDetails';
import Students from './components/Students';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/students"
          element={
            <PrivateRoute redirectTo={'/'}>
              <Students />
            </PrivateRoute>
          }
        />

        <Route
          path="/students/:id"
          element={
            <PrivateRoute redirectTo={'/'}>
              <StudentDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute redirectTo={'/'}>
              <Courses />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
