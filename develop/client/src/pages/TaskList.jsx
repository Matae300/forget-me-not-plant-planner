import Calendar from '../components/Calendar/Calendar';
import TaskList from '../components/TaskList/taskList';
import Navbar from '../components/Navbar';
import Auth from '../utils/auth';



export default function TaskPage() {
    return (
        <>
        <Navbar />
        <div style={{display: "flex"}} className="myTasksStyle">
        <Calendar />
        <TaskList />
        </div>
        </>
    )
}