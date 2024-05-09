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

  export const QUERY_MYPLANTS = gql`
  query MyPlants {
    myPlants {
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
        createdAt
      }
      userNotes {
        _id
        noteName
        noteText
      }
    }
  }`;

  export const QUERY_MYNOTES = gql`
  query MyNotes {
    myNotes {
      _id
      noteName
      noteText
    }
  }`;

  export const QUERY_USER = gql`
  query Query($username: String!) {
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
          _id
          instructions
          frequencyCount
          frequencyUnit
          frequencyInterval
          createdAt
        }
        userNotes {
          _id
          noteName
          noteText
        }
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
    userNotes {
      _id
      noteName
      noteText
    }
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