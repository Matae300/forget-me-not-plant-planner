import { useMutation } from "@apollo/client";
import { useState } from "react"
import { UPDATE_WATERINGTASK } from "../../utils/mutations";

export default function TaskItem(props) {
    const { taskId, checked, instructions, plantName } = props;
    
    const [updateWateringTask, { error }] = useMutation(UPDATE_WATERINGTASK);

    const onChange = async (e) => {
        try {
            let isChecked = e.target.checked;

            const { data } = await updateWateringTask({
                variables: { taskId, isChecked }
            });
        } catch (err) {
            console.error(err);
        }
    }

    if (checked) {
        return;
    }
    return (
        <li key={taskId} style={{listStyle:"none"}}>
            <h4>{plantName}</h4>
            <div style={{display:"flex"}}>
            <label htmlFor={taskId}>
                <input
                 type="checkbox"
                 onChange={onChange}
                 ></input>
            </label>
            <p id={taskId}>{instructions}</p>
            </div>
        </li>
    )
}