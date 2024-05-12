import Calendar from '../components/Calendar/Calendar';
import TaskList from '../components/TaskList/taskList';
import Auth from '../utils/auth';



export default function TaskPage() {
    return (
        <>
        <div style={{display: "flex"}}>
        <Calendar />
        <TaskList />
        </div>
        </>
    )
}