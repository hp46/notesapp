import { useState, useEffect } from "react";
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
  SearchField,
  Grid,
  PhoneNumberField,
  Divider,
  Table,
  TableCell,
  TableBody,
  TableHead,
  Link,
  Image,
  TableRow,
  RadioGroupField,
  Radio,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import pin from "../assets/pin.png"
import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
} from 'react-router-dom';
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function AlHaouz() {
  const [rabat, setAlHaouz] = useState([]);
  const [search, setSearch] = useState("");
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  // const [value, setValue] = useState('');

  const BmiCalculator = () => {
    return new Promise((resolve) => {
      const bmiValue = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1);
      resolve(bmiValue);
    });
  }
  

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onClear = () => {
    setSearch('');
  };

  useEffect(() => {
    fetchAlHaouz();
  }, []);

  async function fetchAlHaouz() {
    const { data: alhaouz } = await client.models.AlHaouz.list();
    await Promise.all(
        alhaouz.map(async (alhaouzinfo) => {
        if (alhaouzinfo.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${alhaouzinfo.image}`,
          });
          console.log(linkToStorageFile.url);
          alhaouzinfo.image = linkToStorageFile.url;
        }
        return alhaouzinfo;
      })
    );
    console.log(alhaouz);
    setAlHaouz(alhaouz);
  }
  async function createNote(event) {
    event.preventDefault();
    const bmi = await BmiCalculator();
    console.log("bmi is at create", bmi);
    const form = new FormData(event.target);
    console.log(form.get("image").name);

    const { data: newAlHaouz } = await client.models.AlHaouz.create({
      description: form.get("description"),
      image: form.get("image").name,
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      sex: form.get("sex"),
      location: form.get("location"),
      phoneNumber: form.get("phoneNumber"),
      smoking: form.get("smoking"),
      bloodSugarLevel: form.get("bloodSugarLevel"),
      height: height,
      bmi: bmi,
      hba1c: form.get("hba1c"),
      weight: weight,
      cholesterol: form.get("cholesterol"),
      hemoglobin: form.get("hemoglobin"),
      systolicBloodPressure: form.get("systolicBloodPressure"),
      diastolicBloodPressure: form.get("diastolicBloodPressure"),
    });



    console.log(newAlHaouz);
    if (newAlHaouz.image)
      if (newAlHaouz.image)
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newAlHaouz.image}`,

          data: form.get("image"),
        }).result;

    fetchAlHaouz();
    event.target.reset();
  }

  async function deleteAlHaouz({ id }) {
    const tobeDeletedAlHaouz = {
      id: id,
    };

    const { data: deleteAlHaouz } = await client.models.AlHaouz.delete(
        tobeDeletedAlHaouz
    );
    console.log(deleteAlHaouz);

    fetchAlHaouz();
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
          <ReactRouterLink to="/" component={Link}>
            <div className="absolute top-10 left-10 w-9 h-9">
            <Image
              alt="pin"
              src={pin}
              height="100%"
              backgroundColor="initial"
              opacity="100%"
              objectFit="none"
              >
              </Image>
            </div>
          </ReactRouterLink>
          <View as="form" onSubmit={createNote}>
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
                  options={['Al Haouz']}
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
                // name="weight"
                placeholder="weight"
                label="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <TextField
                width="200px"
                // name="height"
                placeholder="height"
                label="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
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
        <Table
          highlightOnHover={true}
          variation="striped"
          width="90vw"
        >
          <TableHead>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Sex</TableCell>
            <TableCell as="th">Smoke</TableCell>
            <TableCell as="th">Location</TableCell>
            <TableCell as="th">Phone Number</TableCell>
            <TableCell as="th">Weight</TableCell>
            <TableCell as="th">Height</TableCell>
            <TableCell as="th">BMI</TableCell>
            <TableCell as="th">B.S.L Glucose</TableCell>
            <TableCell as="th">HBA1C</TableCell>
            <TableCell as="th">Hemoglobin</TableCell>
            <TableCell as="th">Cholesterol</TableCell>
            <TableCell as="th">Blood Pressure</TableCell>
            <TableCell as="th"></TableCell>
          </TableHead>
          <TableBody>
            {rabat.filter((value)=>{
              if(value===""){
                return value
              }
              else if(value.firstName.toLowerCase().includes(search.toLowerCase())){
                return value
              }
            })
            .map((value, key) => {
            return(
              <TableRow key={key}>
                <TableCell> <Text fontWeight={500} fontSize="1em">{value.firstName} {value.lastName}</Text></TableCell>
                <TableCell>{value.sex}</TableCell>
                <TableCell>{value.smoking}</TableCell>
                <TableCell>{value.location}</TableCell>
                <TableCell>+{value.phoneNumber}</TableCell>
                <TableCell>{value.weight} <span className="italic"> kg</span></TableCell>
                <TableCell>{value.height} <span className="italic"> cm</span></TableCell>
                <TableCell>{value.bmi} <span className="italic"></span></TableCell>
                <TableCell>{value.bloodSugarLevel} <span className="italic">mg/dL</span></TableCell>
                <TableCell>{value.hba1c} <span className="italic"> mmol/mol</span></TableCell>
                <TableCell>{value.hemoglobin}<span className="italic"> g/dL</span></TableCell>
                <TableCell>{value.cholesterol}<span className="italic"> mg/dL</span></TableCell>
                <TableCell>{value.systolicBloodPressure} /{value.diastolicBloodPressure}<span className="italic"> mmHg</span></TableCell>
                <TableCell>
                  <Button
                    width="40px"
                    variation="destructive"
                    onClick={() => deleteAlHaouz(value)}
                  >
                    Delete 
                  </Button>
                </TableCell>
              </TableRow>
            )
            })}
          </TableBody>
        </Table>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
        
      )}
    </Authenticator>
  );
}