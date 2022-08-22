import Login from "./pages/Login";
// import { Dashboard } from './pages/teacher/Dashboard';
import { Exams as TeacherExams } from "./pages/teacher/Exams";
import { MonitorStartedExam } from "./pages/teacher/MonitorStartedExam";
import { Exams as StudentExam } from "./pages/student/Exams";
import { AddNewExam } from "./pages/teacher/AddNewExam";
import { ExamResults } from "./pages/student/ExamResults";
import SingleExam from "./pages/student/SingleExam";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ToastContainer } from "react-toastify";
import Timer from "./components/Timer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import StudentSingleExamView from "./StudentSingleExamView";

function App() {
  return (
    <Router>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/teacher-exams" element={<TeacherExams />} />
            <Route path="/student-exams" element={<StudentExam />} />
            <Route path="/student-exam-result" element={<ExamResults />} />
            <Route path="/add-new-exam" element={<AddNewExam />} />
            <Route path="/Monitor-Started-Exam" element={<MonitorStartedExam />} />
            <Route path="/student-single-exam" element={<SingleExam />} />
          </Routes>
          <ToastContainer />
        </div>
      </MuiPickersUtilsProvider>
    </Router>
    // <>
    //  <Timer/>

    // </>
  );
}

export default App;

