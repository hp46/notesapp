import { useState, useEffect } from "react";
import {
  Authenticator,
  TextAreaField,
  Button,
  TextField,
  Heading,
  Flex,
  View,
  SelectField,
  SearchField,
  Grid,
  PhoneNumberField,
  Table,
  Card,
  Accordion,
  Link,
  Image,
  RadioGroupField,
  Radio,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import pin from "../assets/back.png"
import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
} from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function Rabat() {
  const [rabat, setRabat] = useState([]);
  const [search, setSearch] = useState("");
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [location, setLocation] = useState('Sale Cabinet')
  // const [value, setValue] = useState('');

  const BmiCalculator = () => {
    return new Promise((resolve) => {
      const bmiValue = (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(1);
      resolve(bmiValue);
    });
  }
  
  const primaryIdGenerator = () => {
    return new Promise((resolve) => {
      const uniqueId = uuidv4();
      const charcater = "_";
      const string = location.replaceAll(" ", "");
      const finalString = string.concat(charcater);
      console.log(finalString);
      const primaryId = finalString.toUpperCase().concat(uniqueId.substring(0,4));
      console.log(primaryId)
      resolve(primaryId)
    });
  }



  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onClear = () => {
    setSearch('');
  };

  useEffect(() => {
    fetchRabat();
  }, []);

  async function fetchRabat() {
    const { data: rabat } = await client.models.Rabat.list();
    await Promise.all(
      rabat.map(async (rabatinfo) => {
        if (rabatinfo.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${rabatinfo.image}`,
          });
          console.log(linkToStorageFile.url);
          rabatinfo.image = linkToStorageFile.url;
        }
        return rabatinfo;
      })
    );
    console.log(rabat);
    setRabat(rabat);
  }
  async function createNote(event) {
    event.preventDefault();
    const bmi = await BmiCalculator();
    const primaryid = await primaryIdGenerator();
    console.log("bmi is at create", bmi);
    const form = new FormData(event.target);
    console.log(form.get("image").name);

    const { data: newRabat } = await client.models.Rabat.create({
      patientId: primaryid,
      description: form.get("description"),
      image: form.get("image").name,
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      sex: form.get("sex"),
      age: form.get("age"),
      diabetes: form.get("diabetes"),
      bloodPressurePill: form.get("bloodPressurePill"),
      location: location,
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



    console.log(newRabat);
    if (newRabat.image)
      if (newRabat.image)
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newRabat.image}`,

          data: form.get("image"),
        }).result;

    fetchRabat();
    event.target.reset();
  }

  // async function deleteRabat({ primaryId }) {
  //   const tobeDeletedRabat = {
  //     id: primaryId,
  //   };

  //   const { data: deletedRabat } = await client.models.Rabat.delete(
  //       tobeDeletedRabat
  //   );
  //   console.log(deletedRabat);

  //   fetchRabat();
  // }

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
            <div className="absolute top-10 left-10 w-10 h-10 grayscale hover:grayscale-0">
            <Image
              alt="pin"
              src={pin}
              width="2.5rem"
              backgroundColor="initial"
              opacity="100%"
              objectFit="cover"
              >
              </Image>
            </div>
          </ReactRouterLink>
          <View as="form" onSubmit={createNote}>
          <Grid
            className="bg-slate-300"
            columnGap="0.5rem"
            rowGap="0.5rem"
            width="100vw"
            templateColumns=".35fr 2fr"
            templateRows="auto auto auto"
          >
            <Flex
              rowSpan={3}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Heading level={2}>Add <br></br> Patients</Heading>
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
                <TextField
                  width="200px"
                  name="age"
                  placeholder="Insert Age"
                  label="Age"
                  required
                />
                <SelectField
                  width="200px"
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  >
                   <option value="Sale Cabinent">Sale Cabient</option>
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
                <RadioGroupField
                  legend="Diabetes"
                  name="diabetes"
                  options={['Yes', 'No']}
                  direction="column">
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </RadioGroupField>
                <RadioGroupField
                  legend="Blood Pressure Pill"
                  name="bloodPressurePill"
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
            <button type="submit"
            className="py-2 px-4 rounded bg-[#f05829] hover:bg-[#467380]">
                Create Note
            </button>
            </Flex>py-2 px-4
            </Grid>
          </View>
        <section className="w-screen flex flex-col justify-center items-center">
          <div className="text-black pb-10 w-1/2 h-auto">
            <SearchField
              label="Search"
              placeholder="Search here..."
              onChange={onChange}
              onClear={onClear}
              value={search}
            /> 
          </div>
          <div className="flex text-black w-3/4  flex-row items-center justify-between h-10">
            <p>Name</p> <p>Sex</p> <p>Age</p> <p>Location</p> <p>PhoneNumber</p>
          </div>
          <div className="w-3/4 text-black">
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
              <Accordion.Container key={key}>
                <Accordion.Item>
                  <Accordion.Trigger>
                    <div className="flex flex-row items-center justify-between w-full h-10">
                      <h1 className="font-black font-xl">{value.firstName} {value.lastName}</h1>
                      <p>{value.sex}</p> <p>{value.age}</p> <p>{value.location}</p>
                      <p>{value.phoneNumber}</p>
                    </div>
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div className="flex flex-row">
                      <p>{value.sex} {value.smoking} {value.diabetes} {value.bloodPressurePill}</p>
                      <p>{value.bloodSugarLevel} {value.hba1c} {value.weight} {value.height}</p>
                      <p>{value.bmi} {value.cholesterol} {value.hemoglobin} {value.systolicBloodPressure} {value.diastolicBloodPressure}</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Container>
            )
            })}
          </div>
        </section>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
        
      )}
    </Authenticator>
  );
}