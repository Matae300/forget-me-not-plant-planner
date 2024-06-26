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
    mutation AddPlant($name: String!, $wateringTask: WateringTaskInput!, $description: String, $photoUrl: String, $sunExposure: String, $growingMonths: String, $bloomingMonths: String) {
      addPlant(name: $name, wateringTask: $wateringTask, description: $description, photoUrl: $photoUrl, sunExposure: $sunExposure, growingMonths: $growingMonths, bloomingMonths: $bloomingMonths) {
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
          createdDates {
            _id
            date
            due
            isChecked
          }
        }
        userNotes {
          _id
          noteName
          noteText
        }
      }
    }
    `;

    export const ADD_PLANT_TO_USER = gql`
  mutation AddPlantToUser(
    $userId: ID!,
    $plantId: ID!,
  ) {
    addPlantToUser(
      userId: $userId,
      plantId: $plantId,
    ) {
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
      userNotes {
        _id
        noteName
        noteText
      }
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

    
    export const UPDATE_WATERINGTASK = gql`
    mutation updateWateringTask($taskId: ID!, $isChecked: Boolean!) {
      updateWateringTask(taskId: $taskId, isChecked: $isChecked) {
       createdDates {
        _id
        date
        due
        isChecked
       }
      }
          
    }
    `

    export const ADD_USERNOTES = gql`
    mutation AddUserNotes($plantId: ID!, $noteName: String!, $noteText: String!) {
      addUserNotes(plantId: $plantId, noteName: $noteName, noteText: $noteText) {
        _id
        noteText
        noteName
      }
    }
    `;

    export const REMOVE_NOTE = gql`
    mutation RemoveUserNotes($userNotesId: ID!) {
      removeUserNotes(userNotesId: $userNotesId) {
        _id
        noteName
        noteText
      }
    }
    `;