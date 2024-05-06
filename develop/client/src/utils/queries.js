import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      plants
    }
  }`;

  export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      plants {
        _id
        name
        description
        photoUrl
        sunExposure
        growingMonths
        bloomingMonths
        wateringTask {
          instructions
          frequencyCount
          frequencyUnit
          frequencyInterval
          _id
        }
        otherTasks {
          taskName
          instructions
          dates
          _id
        }
        userNotes
      }
    }
  }`;

  export const QUERY_PLANTS = gql`
  query plants($username: String!) {
    user(username: $username) {
    plants {
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
}`;

  export const QUERY_SINGLE_PLANT = gql`
  query singlePlant($id: ID!) {
    plant(_id: $id) {
    _id
    name
    description
    photoUrl
    sunExposure
    growingMonths
    bloomingMonths
    wateringTask {
      instructions
      frequencyCount
      frequencyUnit
      frequencyInterval
      _id
    }
    otherTasks {
      taskName
      instructions
      dates
      _id
    }
    userNotes
  }
}`;

  export const QUERY_TASKS = gql`
  query AllOtherTasksByUsername($username: String!) {
    allOtherTasksByUsername(username: $username) {
      taskName
      instructions
      dates
      _id
    }
  }`;

  export const QUERY_SINGLE_TASK = gql`
  query SingleOtherTask($otherTasksId: ID!) {
    singleOtherTask(otherTasksId: $otherTasksId) {
      taskName
      dates
      instructions
      _id
    }
  }`;

  export const QUERY_WATERINGTASK = gql`
  query WateringTask($wateringTaskId: ID!) {
    wateringTask(wateringTaskId: $wateringTaskId) {
      _id
      instructions
      frequencyCount
      frequencyUnit
      frequencyInterval
    }
  }`;