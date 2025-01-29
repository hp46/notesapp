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
          alignItems="center"
          width="100vw"
          direction="column"
          backgroundColor="#9c9a9a"
          gap='0rem'
        >
          <Flex
            width="100vw"
            height="80px"
            backgroundColor="#f05829"
            justifyContent="space-between"
            alignContent="center"
            alignItems="center"
            marginBottom="20px"
            gap='0rem'
          >
            <ReactRouterLink to="/" component={Link}>
              <div className="w-10 h-10 grayscale-10 hover:grayscale-0 pl-20">
                <p>Home</p>
              </div>
            </ReactRouterLink>
            <div className="pr-10">
            <Button onClick={signOut}>Sign Out</Button>
            </div>
          </Flex>
          <View 
          as="form" 
          onSubmit={createNote}
          width="80vw"
          backgroundColor="#ffffff"
          marginBottom="20px"
          fontFamily="400"
          >
            <Grid
            width="100%"
            height="auto"
            templateColumns="auto auto "
            templateRows="auto auto auto"
            margin="20px"
            >
              <Flex
              width="100%"
              columnSpan={2}
              height="1/2"
              marginLeft="2rem"
              >
              <h className="text-4xl  text-black" >Add Patients</h>
              </Flex>
              <View
            >
              <Flex
                height="auto"
                direction="column"
                gap="2rem"
                margin="2rem"
                wrap="wrap"
              >
                <h className="text-black">Patient Information</h>
                <div className="flex flex-row w-[450px] justify-between">
                  <TextField
                    width="200px"
                    name="firstName"
                    placeholder="Insert first name"
                    label="First name"
                    required
                    weight="500px"
                  />
                  <TextField
                    width="200px"
                    name="lastName"
                    placeholder="Insert last name"
                    label="Last name"
                    required
                  />
                </div>
                <div className="flex flex-row w-[450px] justify-between">
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
                </div>
                <div className="flex flex-row w-[450px] justify-between">
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
                    width="200px"
                    defaultDialCode="+212"
                    label="Phone number"
                    placeholder="xxx-xxx-xxx"
                    name="phoneNumber"
                  />
                </div>
                <div className="flex flex-row w-[450px] justify-between">
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
                </div>
              </Flex>
            </View>
            <View
            >
              <Flex
                direction="column"
                gap="2rem"
                padding="2rem"        
                wrap="wrap"    

              >
              <h className=" text-black" >Medical Information</h>
              <div className="flex flex-row w-[450px] justify-between">
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
              </div>
              <div className="flex flex-row w-[450px] justify-between">
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
              </div>
              <div className="flex flex-row w-[450px] justify-between">
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
              </div>
              <div className="flex flex-row w-[450px] justify-between">
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
              </div>
              </Flex>
            </View>        
            <Flex
              width="100%"
              columnSpan={2}
              height="1/2"
            >
              <div className="flex flex-row w-full justify-center items-center">
                    <div>
                      <TextAreaField
                            width="400px"
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
                    </div>
                    <button 
                      type="submit"
                      className="py-2 ml-10 px-4 h-1/2 rounded bg-[#f05829] hover:bg-[#467380]"
                    >
                        Create Note
                    </button>
                </div>
            </Flex>   
            </Grid>
          </View>
          <div className="flex justify-center items-center item text-black w-full h-20 bg-[#467380]">
            <SearchField
              width="50%"
              backgroundColor="#ffffff"
              label="Search"
              placeholder="Search here..."
              onChange={onChange}
              onClear={onClear}
              value={search}
            /> 
          </div>
          <section className="w-full flex flex-col justify-center p-10 items-center bg-white">
          <div className="w-full flex ">
             <h className=" text-2xl text-black">Patient Result</h>
          </div>
          <div className="w-full h-20 text-black bg-gray-200 rounded">
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
                    <div className="flex flex-row w-full items-center justify-between h-10">
                      <div>
                        <h1 className="font-black font-3xl uppercase">{value.firstName} {value.lastName}</h1>
                        <p className="font-m">{value.sex} {value.age}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Location:</p>
                        <p>{value.sex} </p>
                      </div>
                      <div>
                        <p className="text-gray-800">Location:</p>
                        <p>{value.age}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Location:</p>
                        <p>{value.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-800">Phone Number:</p>
                        <p>+{value.phoneNumber}</p>
                      </div>
                    </div>
                    <Accordion.Icon />
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div className="flex flex-row w-full items-center justify-between  p-10">
                      <div>
                        <div>
                          <p className="font-light">Weight</p>
                          <p>{value.weight}kg</p>
                        </div>
                        <div>
                          <p className="font-light">height</p>
                          <p>{value.height}cm</p>
                        </div>
                        <div>
                          <p className="font-light">Bmi</p>
                          <p>{value.bmi} </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <p className="font-light">Smoke</p>
                          <p>{value.smoking} </p>
                        </div>
                        <div>
                          <p className="font-light">Diabetes</p>
                          <p>{value.diabetes} </p>
                        </div>
                        <div>
                          <p className="font-light">Blood Pressure Pill</p>
                          <p>{value.bloodPressurePill} </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <p className="font-light">Blood Sugar Level</p>
                          <p>{value.bloodSugarLevel}mg/dL</p>
                        </div>
                        <div>
                          <p className="font-light">HBA1C</p>
                          <p>{value.hba1c}mmol/mol</p>
                        </div>
                        <div>
                          <p className="font-light">Choleresterol</p>
                          <p>{value.cholesterol}mg/dL</p>
                        </div>
                        <div>
                          <p className="font-light">Hemoglobin</p>
                          <p>{value.hemoglobin}g/dL</p>
                        </div>
                        <div>
                          <p className="font-light">Blood Pressure</p>
                          <p>{value.systolicBloodPressure} /{value.diastolicBloodPressure}</p>
                        </div>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Container>
            )
            })}
          </div>
        </section>
        </Flex>
      )}
    </Authenticator>
  );
}