import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { PrimaryKey } from 'aws-cdk-lib/aws-appsync';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
    Rabat: a
    .model({
      patientId: a.id(),
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    AlHaouz: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Marrakech: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Temara: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Sale: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Azour: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    ElJadida: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Ouarzazate: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Khemisset: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    Casablanca: a
    .model({
      description: a.string(),
      image: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      sex: a.string(),
      age: a.integer(),
      smoking: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      bloodSugarLevel: a.float(),
      hba1c: a.float(),
      weight: a.float(),
      height: a.float(),
      bmi:  a.float(),
      cholesterol: a.float(),
      hemoglobin: a.float(),
      systolicBloodPressure: a.float(),
      diastolicBloodPressure: a.float(),
      
    })
    .authorization((allow) => [allow.owner()]),

    

    


});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
