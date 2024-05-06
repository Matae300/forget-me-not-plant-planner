import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
    `;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
    `;

    export const ADD_PLANT = gql`
    mutation AddPlant($name: String!, $wateringTask: WateringTaskInput!, $description: String, $photoUrl: String, $sunExposure: String, $growingMonths: String, $bloomingMonths: String, $userNotes: String) {
      addPlant(name: $name, wateringTask: $wateringTask, description: $description, photoUrl: $photoUrl, sunExposure: $sunExposure, growingMonths: $growingMonths, bloomingMonths: $bloomingMonths, userNotes: $userNotes) {
        _id
        name
        description
        photoUrl
        sunExposure
        growingMonths
        bloomingMonths
        wateringTask {
          _id
          instructions
          frequencyCount
          frequencyUnit
          frequencyInterval
        }
        otherTasks {
          _id
          taskName
          instructions
          dates
        }
        userNotes
      }
    }
    `;

    export const REMOVE_PLANT = gql`
    mutation removePlant($plantId: ID!) {
      removePlant(plantID: $plantId) {
        _id
        name
      }
    }
    `;

    
    export const ADD_OTHERTASK = gql`
    mutation AddOtherTask($plantId: ID!, $name: String, $instructions: String, $dates: [String]) {
      addOtherTask(plantId: $plantId, taskName: $name, instructions: $instructions, dates: $dates) {
        taskName
        instructions
        dates
        _id
      }
    }
    `;

    export const REMOVE_TASK = gql`
    mutation RemoveOtherTask($otherTasksId: ID!) {
      removeOtherTask(otherTasksId: $otherTasksId) {
        _id
        taskName
        instructions
        dates
      }
    }
    `;