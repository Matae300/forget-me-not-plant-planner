import { useQuery } from "@apollo/client";

import { QUERY_MYPLANTS } from "../../utils/queries";
import { checkDueDate } from '../../utils/helpers';
import TaskItem from "../TaskItem/TaskItem";
import Auth from "../../utils/auth";

import './taskList.css';

export default function TaskList() {
  const { loading, error, data } = useQuery(QUERY_MYPLANTS);

  const myPlants = data?.myPlants || [];
  console.log("These are my plants", myPlants);
  const wateringTasks = myPlants.flatMap((plant) => {
    const wateringTask = plant?.wateringTask;
    const createdDates = wateringTask?.createdDates;
    const instructions = wateringTask?.instructions;

    return createdDates.map(date => {      
      return {
        taskId: date._id,
        plantName: plant.name,
        instructions: instructions,
        date: date.date,
        due: checkDueDate(date.date),
        checked: date.isChecked
      }
    })
  })
console.log("These are my watering tasks", wateringTasks);

  const overDueTasks = wateringTasks.filter(task => task.due === "overdue")
  const todayTasks = wateringTasks.filter(task => task.due === "today")
  const tomorrowTasks = wateringTasks.filter(task => task.due === "tomorrow")
  const weekTasks = wateringTasks.filter(task => task.due === "this week")
  const restTasks = wateringTasks.filter(task => task.due === "rest");


  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <>
      {Auth.loggedIn() ? (
        <div className="taskList">
          <div className="taskHeader">
            <h2>My Plant Care Tasks</h2>
              <>
              <div id="overdue">
                <h3>Overdue!</h3>
                <ul>
                {overDueTasks && overDueTasks.map((task, index) => {
                  return (
                  <TaskItem
                    key={index}
                    taskId={task.taskId}
                    plantName={task.plantName}
                    instructions={task.instructions}
                    checked={task.checked}
                  />
                )
              })}
                </ul>
              </div>
              <div id="today">
                <h3>Today!</h3>
                <ul>
                {todayTasks && todayTasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskId={task.taskId}
                    plantName={task.plantName}
                    instructions={task.instructions}
                    checked={task.checked}
                  />
                ))}
                </ul>
              </div>
              <div id="tomorrow">
                <h3>Tomorrow</h3>
                <ul>
                {tomorrowTasks && tomorrowTasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskId={task.taskId}
                    plantName={task.plantName}
                    instructions={task.instructions}
                    checked={task.isChecked}
                  />
                ))}
                </ul>
              </div>
              <div id="week">
                <h3>This Week</h3>
                <ul>
                {weekTasks && weekTasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskId={task.taskId}
                    plantName={task.plantName}
                    instructions={task.instructions}
                    checked={task.isChecked}
                  />
                ))}
                </ul>
              </div>
              <div id="Rest">
                <h3>Rest</h3>
                <ul>
                {restTasks && restTasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskId={task.taskId}
                    plantName={task.plantName}
                    instructions={task.instructions}
                    checked={task.isChecked}
                  />
                ))}
                </ul>
              </div>
            </>
          </div>
        </div>
      ) : (
        <p>
          You need to be logged in to add your plant. Please login or signup.
        </p>
      )}
    </>
  );
}
