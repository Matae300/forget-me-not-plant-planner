import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      password
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
        planting
        fertilizing
        pruning
        watering
      }
    }
  }`;

  export const QUERY_SINGLE_PLANT = gql`
  query Plant($plantId: ID!) {
    plant(plantID: $plantId) {
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
      planting
      fertilizing
      pruning
      watering
    }
  }`;

  export const QUERY_SINGLE_TASK = gql`
  query Task($plantId: ID!) {
    task(plantID: $plantId) {
      planting
      fertilizing
      pruning
      watering
    }
  }`;

