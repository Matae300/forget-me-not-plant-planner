import Calendar from '../components/Calendar/Calendar';
import TaskList from '../components/TaskList/taskList';
import Navbar from '../components/Navbar';
import Auth from '../utils/auth';



export default function TaskPage() {
    return (
        <>
        <div style={{display: "flex"}} className="myTasksStyle">
        <Navbar />
        <Calendar />
        <TaskList />
        </div>
        </>
    )
}