import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
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
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="firstName"
                placeholder="Insert first name"
                label="First name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="lastName"
                placeholder="Insert last name"
                label="Last name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="sex"
                placeholder="Male or Female"
                label="Male or Female"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="location"
                placeholder="Insert location"
                label="location"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="phoneNumber"
                placeholder="XXX-XX-XXXX"
                label="Phone Number"
                labelHidden
                variation="quiet"
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
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="hba1c"
                placeholder="Insert hba1c"
                label="hba1c"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="weight"
                placeholder="weight"
                label="weight"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="cholesterol"
                placeholder="Insert cholesterol"
                label="cholesterol"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="hemoglobin"
                placeholder="Insert Hemoglobin level"
                label="Last name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="systolicBloodPressure"
                placeholder="Insert Systolic Blood Pressure"
                label="Systolic Blood Pressure"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                width="200px"
                name="diastolicBloodPressure"
                placeholder="Insert Diastolic Blood Pressure"
                label="Diastolic Blood Pressure"
                labelHidden
                variation="quiet"
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
              else if(value.name.toLowerCase().includes(search.toLowerCase())){
                return value
              }
            })
            .map((value, key) => {
            return(
                <Grid
                  key={key}
                  margin="3rem 0"
                  autoFlow="column"
                  justifyContent="center"
                  gap="2rem"
                  alignContent="center"
                >
              {notes.map((note) => (
                <Flex
                  key={note.id || note.name}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="2rem"
                  border="1px solid #ccc"
                  padding="2rem"
                  borderRadius="5%"
                  className="box"
                >
                  <View>
                    <Heading level="3">{note.firstName} {note.lastName}</Heading>
                  </View>
                  <Text fontStyle="italic">{note.description}</Text>
                  <Text fontStyle="italic">{note.sex} {note.location} {note.phoneNumber}</Text>
                  <Text fontStyle="italic">{note.bloodSugarLevel} {note.hba1c} {note.weight} {note.cholesterol}</Text>
                  <Text fontStyle="italic">{note.hemoglobin} {note.systolicBloodPressure} {note.diastolicBloodPressure}</Text>
                  {note.image && (
                    <Image
                      src={note.image}
                      alt={`visual aid for ${notes.name}`}
                      style={{ width: 400 }}
                    />
                  )}
                  <Button
                    variation="destructive"
                    onClick={() => deleteNote(note)}
                  >
                    Delete note
                  </Button>
                </Flex>
              ))}
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