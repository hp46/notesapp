import { useState, useEffect } from "react";
import './index.css'
import {
  Authenticator,
  TextAreaField,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  SelectField,
  Image,
  SearchField,
  Grid,
  PhoneNumberField,
  Divider,
  RadioGroupField,
  Radio,
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
  const [search, setSearch] = useState("");
  // const [value, setValue] = useState('');

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onClear = () => {
    setSearch('');
  };

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
      smoking: form.get("smoking"),
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
          width="100vw"
          margin="0 auto"
        >
          <View as="form" margin="3rem 0" onSubmit={createNote}>
          <Grid
            columnGap="0.5rem"
            rowGap="0.5rem"
            width="100vw"
            templateColumns=".5fr 2fr"
            templateRows="auto auto auto"
          >
            <Flex
              rowSpan={3}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading level={2}>Add Patients</Heading>
            </Flex>
            <View
            >
              <Flex
                height="auto"
                direction="row"
                gap="2rem"
                padding="2rem"
                wrap="wrap"
              >
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
                <RadioGroupField
                  legend="Gender / Sex"
                  name="sex"
                  options={['Male', 'Female']}
                  direction="column">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </RadioGroupField>
                <SelectField
                  width="200px"
                  label="Location"
                  name="location"
                  options={['Rabat', 'Tagier', 'Cassablanca']}
                  required
                  >
                </SelectField>
                <PhoneNumberField
                  defaultDialCode="+212"
                  label="Phone number"
                  placeholder="xxx-xxx-xxx"
                  name="phoneNumber"
                />
                <RadioGroupField
                  legend="Smoking"
                  name="smoking"
                  options={['Yes', 'No']}
                  direction="column">
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroupField>
              </Flex>
            </View>
            <View
            >
              <Flex
                direction="row"
                gap="2rem"
                padding="2rem"        
                wrap="wrap"                    
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
            </View>            
          <Flex
            direction="row"
            gap="2rem"
            padding="2rem"
            justifyContent="center"
            alignItems="center"
            wrap="wrap"
        
          >
            <Flex
              direction="column"
              gap="2rem"
            >
              <TextAreaField
                  width="200px"
                  name="description"
                  placeholder="Note Description"
                  label="Note Description"
                />
              <View
                  name="image"
                  as="input"
                  type="file"
                  alignSelf={"end"}
                  accept="image/png, image/jpeg"
                />
            </Flex>
            <Button type="submit" variation="primary" height="100px">
                Create Note
            </Button>
            </Flex>
            </Grid>
          </View>
          <Divider />
        <SearchField
          label="Search"
          placeholder="Search here..."
          onChange={onChange}
          onClear={onClear}
          value={search}
        />
        {/* <input type="text" placeholder='search here' onChange={(e)=>setSearch(e.target.value)} /> */}
        <div className="w-full p-10 border-2">
          {notes.filter((value)=>{
            if(value===""){
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
                width="90vw"
                autoFlow="row"
                justifyContent="center"
                rowGap="1rem"
                columnGap="1rem"
                alignContent="space-between"
              >
            {/* {notes.map((note) => ( */}
              <Flex
                key={value.id}
                width="90vw"
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
                  <Text fontWeight={900} fontSize="2em">{value.firstName} {value.lastName}</Text>
                </View>
                <Text fontStyle="italic">{value.sex}</Text>
                <Text fontStyle="italic"> Smoke: {value.smoking} </Text>
                <Text fontStyle="italic"> Center Location: {value.location}  </Text>
                <Text fontStyle="italic"> Phone Number:{value.phoneNumber}</Text>

                <Text fontStyle="italic"> Weight:{value.weight}kg</Text>
                <Text fontStyle="italic"> Blood Sugar Level:{value.bloodSugarLevel}mg/dL</Text>
                <Text fontStyle="italic"> HBA1C:{value.hba1c}mmol/mol </Text>
                <Text fontStyle="italic"> Hemoglobin:{value.hemoglobin}g/dL </Text>
                <Text fontStyle="italic"> Cholesterol:{value.cholesterol}mg/dL</Text>
                <Text fontStyle="italic"> BloodPressure: {value.systolicBloodPressure} / {value.diastolicBloodPressure} mmHg</Text>


                <Text fontStyle="italic">{value.description}</Text>
                {value.image && (
                  <Image
                    src={value.image}
                    alt={`visual aid for ${value.name}`}
                    style={{ width: 400 }}
                  />
                )}
                <Button
                  width="100px"
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