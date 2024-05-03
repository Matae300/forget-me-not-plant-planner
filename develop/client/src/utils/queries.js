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
      plants
    }
  }`;

  export const QUERY_PLANTS = gql`
  query Plants($username: String!) {
    plants(username: $username) {
      _id
      name
      description
      wateringFrequency
      wateringInstructions
      sunExposure
      growingMonths
      bloomSeason
      whenToPlant
      spacing
      fertilization
      tasks {
        _id
        planting
        fertilizing
        pruning
        watering
      }
    }
  }`;

  export const QUERY_SINGLE_PLANT = gql`
  query Plant($id: ID!) {
    plant(_id: $id) {
      _id
      name
      description
      wateringFrequency
      wateringInstructions
      sunExposure
      growingMonths
      bloomSeason
      whenToPlant
      spacing
      fertilization
      tasks {
        _id
        planting
        fertilizing
        pruning
        watering
      }
    }
  }`;

  export const QUERY_TASKS = gql`
  query Tasks($username: String!) {
    tasks(username: $username) {
      _id
      planting
      fertilizing
      pruning
      watering
    }
  }`;

  export const QUERY_SINGLE_TASK = gql`
  query Task($taskId: ID!) {
    task(taskId: $taskId) {
      _id
      planting
      fertilizing
      pruning
      watering
    }
  }`;

