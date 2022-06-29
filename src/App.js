import Login from "./pages/Login";
// import { Dashboard } from './pages/teacher/Dashboard';
import { Exams } from "./pages/teacher/Exams";
import { MonitorStartedExam } from "./pages/teacher/MonitorStartedExam";
// import { Exams } from './pages/student/Exams';
import { AddNewExam } from "./pages/teacher/AddNewExam";
import {ExamResults} from './pages/student/ExamResults'
import {SingleExam} from './pages/student/SingleExam'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        {/* <Login/> */}
        {/* <Dashboard/> */}
        {/* <Exams/> */}
        {/* <AddNewExam /> */}
        {/* <MonitorStartedExam/> */}
        {/* <ExamResults/> */}
        <SingleExam/>
      </div>
      </MuiPickersUtilsProvider>
  );
}

export default App;
