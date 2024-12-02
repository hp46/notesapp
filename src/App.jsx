import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  Fieldset,
  View,
  Image,
  Grid,
  Divider,
  CheckboxField,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data: notes } = await client.models.Note.list();
    await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${note.image}`,
          });
          console.log(linkToStorageFile.url);
          note.image = linkToStorageFile.url;
        }
        return note;
      })
    );
    console.log(notes);
    setNotes(notes);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form.get("image").name);

    const { data: newNote } = await client.models.Note.create({
      description: form.get("description"),
      image: form.get("image").name,
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      sex: form.get("sex"),
      location: form.get("location"),
      phoneNumber: form.get("phoneNumber"),
      bloodSugarLevel: form.get("bloodSugarLevel"),
      hba1c: form.get("hba1c"),
      weight: form.get("weight"),
      cholesterol: form.get("cholesterol"),
      hemoglobin: form.get("hemoglobin"),
      systolicBloodPressure: form.get("systolicBloodPressure"),
      diastolicBloodPressure: form.get("diastolicBloodPressure"),
    });



    console.log(newNote);
    if (newNote.image)
      if (newNote.image)
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newNote.image}`,

          data: form.get("image"),
        }).result;

    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const toBeDeletedNote = {
      id: id,
    };

    const { data: deletedNote } = await client.models.Note.delete(
      toBeDeletedNote
    );
    console.log(deletedNote);

    fetchNotes();
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="100%"
          margin="0 auto"
        >
          <Heading level={1}>Add Patients</Heading>
          <View as="form" margin="3rem 0" onSubmit={createNote}>
            <Flex
              direction="row"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                width="200px"
                name="description"
                placeholder="Note Description"
                label="Note Description"
                required
              />
              <TextField
                width="200px"
                name="firstName"
                placeholder="Insert first name"
                label="First name"
                required
              />
              <TextField
                width="200px"
                name="lastName"
                placeholder="Insert last name"
                label="Last name"
                required
              />
              <Fieldset
                legend="Gender / Sex"
                variation="outlined"
                direction="column">
                <CheckboxField
                  label="Male"
                  name="sex"
                />
                <CheckboxField
                  label="Female"
                  name=""
                />
              </Fieldset>
              <TextField
                width="200px"
                name="location"
                placeholder="Insert location"
                label="location"
                required
              />
              <TextField
                width="200px"
                name="phoneNumber"
                placeholder="XXX-XX-XXXX"
                label="Phone Number"
                required
              />
            </Flex>
            <Flex
              direction="row"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                width="200px"
                name="bloodSugarLevel"
                placeholder="Enter Blood Sugar level"
                label="Enter Blood Sugar level"
                required
              />
              <TextField
                width="200px"
                name="hba1c"
                placeholder="Insert hba1c"
                label="hba1c"
                required
              />
              <TextField
                width="200px"
                name="weight"
                placeholder="weight"
                label="weight"
                required
              />
              <TextField
                width="200px"
                name="cholesterol"
                placeholder="Insert cholesterol"
                label="cholesterol"
                required
              />
              <TextField
                width="200px"
                name="hemoglobin"
                placeholder="Insert Hemoglobin level"
                label="Hemoglobin level"
                required
              />
              <TextField
                width="200px"
                name="systolicBloodPressure"
                placeholder="Insert Systolic Blood Pressure"
                label="Systolic Blood Pressure"
                required
              />
              <TextField
                width="200px"
                name="diastolicBloodPressure"
                placeholder="Insert Diastolic Blood Pressure"
                label="Diastolic Blood Pressure"
                required
              />
            
          </Flex>
          <Flex
            direction="row"
            justifyContent="center"
            gap="2rem"
            padding="2rem"
          >
             <View
                name="image"
                as="input"
                type="file"
                alignSelf={"end"}
                accept="image/png, image/jpeg"
              />
            <Button type="submit" variation="primary">
                Create Note
            </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2}>Current Notes</Heading>
          <Heading level={2}>Search</Heading>
          <input type="text" placeholder='search here' onChange={(e)=>setSearch(e.target.value)} />
          <div className='block w-screen'>
            {notes.filter((value)=>{
              if(search===""){
                return value
              }
              else if(value.firstName.toLowerCase().includes(search.toLowerCase())){
                return value
              }
            })
            .map((value, key) => {
            return(
                <Grid
                  key={key}
                  width="100%"
                  margin="3rem 0"
                  autoFlow="row"
                  justifyContent="center"
                  gap="2rem"
                  alignContent="center"
                >
              {/* {notes.map((note) => ( */}
                <Flex
                  key={value.id}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap="2rem"
                  border="1px solid #ccc"
                  padding="2rem"
                  borderRadius="5%"
                  className="box"
                >
                  <View>
                    <Heading level="3">{value.firstName} {value.lastName}</Heading>
                  </View>
                  <Text fontStyle="italic">{value.description}</Text>
                  <Text fontStyle="italic">{value.sex} {value.location} {value.phoneNumber}</Text>
                  <Text fontStyle="italic">{value.bloodSugarLevel} {value.hba1c} {value.weight} {value.cholesterol}</Text>
                  <Text fontStyle="italic">{value.hemoglobin} {value.systolicBloodPressure} {value.diastolicBloodPressure}</Text>
                  {value.image && (
                    <Image
                      src={value.image}
                      alt={`visual aid for ${value.name}`}
                      style={{ width: 400 }}
                    />
                  )}
                  <Button
                    variation="destructive"
                    onClick={() => deleteNote(value)}
                  >
                    Delete note
                  </Button>
                </Flex>
              {/* ))} */}
              </Grid>
            )
            })}
          </div>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
        
      )}
    </Authenticator>
  );
}