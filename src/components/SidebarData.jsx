import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const SidebarData = [
    {
        icon:<HomeIcon/>,
        titile:"Home",
        path: "/home"
    },
    {
        icon:<EventNoteIcon/>,
        titile:"Exams",
        path: "/exams"
    },
    {
        icon:<MenuBookIcon/>,
        titile:"Single Exam",
        path: "/singleexam"
    },
    {
        icon:<PersonSearchIcon/>,
        titile:"Monitor Started Exam",
        path: "/monitorstartedexam"
    },
] 