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
    mutation addPlant($name: String!, $description: String!, $wateringFrequency: Int!, $wateringInstructions: String!, $sunExposure: String!, $growingMonths: String!, $bloomSeason: String!, $whenToPlant: String!, $spacing: String!, $fertilization: String!, $tasks: [TaskInput]!) {
      addPlant(name: $name, description: $description, wateringFrequency: $wateringFrequency, wateringInstructions: $wateringInstructions, sunExposure: $sunExposure, growingMonths: $growingMonths, bloomSeason: $bloomSeason, whenToPlant: $whenToPlant, spacing: $spacing, fertilization: $fertilization, tasks: $tasks) {
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

    
    export const ADD_TASK = gql`
    mutation addTask($planting: String!, $fertilizing: String!, $pruning: String!, $watering: String!) {
      addTask(planting: $planting, fertilizing: $fertilizing, pruning: $pruning, watering: $watering) {
        planting
        fertilizing
        pruning
        watering
      }
    }
    `;

    export const REMOVE_TASK = gql`
    mutation removeTask($taskId: ID!) {
      removeTask(taskId: $taskId) {
        planting
        fertilizing
        pruning
        watering
      }
    }
    `;