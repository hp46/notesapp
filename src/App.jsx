import {  } from "react";
import './index.css'
import {
  Authenticator,
  Button,
  Image,
  Flex,
  Text,
  Link,
  Grid,
} from "@aws-amplify/ui-react";
import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
} from 'react-router-dom';
  import "@aws-amplify/ui-react/styles.css";
  import image from "./assets/morooco_final.png"
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */


export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <div>
          <div className="relative w-1vw h-1vh overflow-hidden">
            <Flex
              direction="column"
            >
              <Image
              alt="Morocco Map"
              src={image}
              objectPosition="50% 50%"
              backgroundColor="initial"
              height="100%"
              width="100%"
              opacity="100%"
              objectFit="initial"
              >
              </Image>
              <div className="absolute top-10 left-10">
                <Button
                colorTheme="overlay"
                onClick={signOut}
                objectFit="cover"
                >
                  Sign Out
                </Button>
              </div>
              <div className="absolute top-40 left-10 border-2 rounded-lg ">
                <ReactRouterLink to="/Rabat" component={Link}>  
                  <p className="text-xl font-black hover:text-xxl">Rabat</p>
                </ReactRouterLink>
                <ReactRouterLink to="/alhaouz" component={Link}>  
                  <p>Al Haouz</p>
                </ReactRouterLink>
                <ReactRouterLink to="/casablanca" component={Link}>  
                  <p>Casablanca</p>
                </ReactRouterLink>
                <ReactRouterLink to="/marrakech" component={Link}>  
                  <p>Marrakech</p>
                </ReactRouterLink>
                <ReactRouterLink to="/temara" component={Link}>  
                  <p>Temera</p>
                </ReactRouterLink>
                <ReactRouterLink to="/sale" component={Link}>  
                  <p>Sale</p>
                </ReactRouterLink>
                <ReactRouterLink to="/azour" component={Link}>  
                  <p>Azour</p>
                </ReactRouterLink>
                <ReactRouterLink to="/eljadida" component={Link}>  
                  <p>Eljadida</p>
                </ReactRouterLink>
                <ReactRouterLink to="/ouarzazate" component={Link}>  
                  <p>Ouarzazate</p>
                </ReactRouterLink>
                <ReactRouterLink to="/khemisset" component={Link}>  
                  <p>Khemisset</p>
                </ReactRouterLink>
                <ReactRouterLink to="/azour" component={Link}>  
                  <p>Azour</p>
                </ReactRouterLink>
              </div>
              <div className="w-[20%] h-[7%] absolute top-[40%] left-[52%]">
                <div className="flex justify-center items-center">
                  <ReactRouterLink to="/Rabat" component={Link}>
                    <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                          <p className=" uppercase text-[1rem] italic text-black font-black hover:text-[3rem]" >
                            Rabat 
                          </p>
                   </div>
                  </ReactRouterLink>
                  </div>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[90%] left-[37%]">
                <ReactRouterLink to="/alhaouz" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                          AL HAOUZ 
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[45%] left-[45%]">
                <ReactRouterLink to="/casablanca" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                          CASABLANCA
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[80%] left-[37%]">
                <ReactRouterLink to="/marrakech" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                          MARRAKECH
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[43%] left-[48%]">
                <ReactRouterLink to="/temara" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                          TEMARA
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[38%] left-[54%]">
                <ReactRouterLink to="/sale" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                          Sale
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[39%] left-[50%]">
                <ReactRouterLink to="/azour" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                        Azour
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[53%] left-[30%]">
                <ReactRouterLink to="/eljadida" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                        El Jadida
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[90%] left-[60%]">
                <ReactRouterLink to="/ouarzazate" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                        Ouarzazate
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[45%] left-[65%]">
                <ReactRouterLink to="/khemisset" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                        Khemisset
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[39%] left-[50%]">
                <ReactRouterLink to="/azour" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-black font-black hover:text-gray-300" >
                        Azour
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
            </Flex>
          </div>
        </div>
      )}
    </Authenticator>
  );
}