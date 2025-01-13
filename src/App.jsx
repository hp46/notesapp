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
  import pin from "./assets/pin.png"
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
              <div className="absolute top-40 left-10 border-2 rounded-lg p-10 border-black text-black">
                <h1 className="text-2xl uppercase font-black">Choose a City</h1>
                <ReactRouterLink  className=" block w-20 hover:font-black hover:italic hover:w-30" to="/Rabat" component={Link}>  
                  <p className="text-xl text-black">Rabat</p>
                  <div className="flex justify-center items-center">
                    <div className="absolute top-[110%] left-[322%] w-20">
                      <Image
                        alt="pin"
                        src={pin}
                        objectPosition="50% 50%"
                        backgroundColor="initial"
                        width="100%"
                        opacity="100%"
                        objectFit="initial"
                      >
                        </Image>
                   </div>
                  </div>
                </ReactRouterLink>
                <ReactRouterLink to="/alhaouz" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Al Haouz</p>
                </ReactRouterLink>
                <ReactRouterLink to="/casablanca" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Casablanca</p>
                </ReactRouterLink>
                <ReactRouterLink to="/marrakech" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Marrakech</p>
                </ReactRouterLink>
                <ReactRouterLink to="/temara" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Temera</p>
                </ReactRouterLink>
                <ReactRouterLink to="/sale" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Sale</p>
                </ReactRouterLink>
                <ReactRouterLink to="/azour" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Azour</p>
                </ReactRouterLink>
                <ReactRouterLink to="/eljadida" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Eljadida</p>
                </ReactRouterLink>
                <ReactRouterLink to="/ouarzazate" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Ouarzazate</p>
                </ReactRouterLink>
                <ReactRouterLink to="/khemisset" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Khemisset</p>
                </ReactRouterLink>
                <ReactRouterLink to="/azour" component={Link}>  
                  <p className="text-xl text-black hover:font-black hover:italic">Azour</p>
                </ReactRouterLink>
              </div>
              {/* <div className="absolute top-[40%] left-[52%]">
                <div className="flex justify-center items-center">
                  <ReactRouterLink to="/Rabat" component={Link}>
                    <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                      <Image
                        alt="pin"
                        src={pin}
                        objectPosition="50% 50%"
                        backgroundColor="initial"
                        height="2%"
                        width="2%"
                        opacity="100%"
                        objectFit="initial"
                      >
                        </Image>
                          <p className=" text-[1rem] italic text-gray-600" >
                            Rabat 
                          </p>
                   </div>
                  </ReactRouterLink>
                  </div>
              </div>
              <div className="absolute top-[90%] left-[37%]">
                <ReactRouterLink to="/alhaouz" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[2rem] italic text-gray-600" >
                          Al Haouz
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[45%] left-[45%]">
                <ReactRouterLink to="/casablanca" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                          Casablanca
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[80%] left-[37%]">
                <ReactRouterLink to="/marrakech" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                          Marrakech
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[43%] left-[48%]">
                <ReactRouterLink to="/temara" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                          Temera
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[38%] left-[54%]">
                <ReactRouterLink to="/sale" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                          Sale
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[39%] left-[50%]">
                <ReactRouterLink to="/azour" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                        Azour
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[53%] left-[30%]">
                <ReactRouterLink to="/eljadida" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                        El Jadida
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[90%] left-[60%]">
                <ReactRouterLink to="/ouarzazate" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                        Ouarzazate
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[45%] left-[65%]">
                <ReactRouterLink to="/khemisset" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                        Khemisset
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="absolute top-[39%] left-[50%]">
                <ReactRouterLink to="/azour" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                        <p className=" text-[1rem] italic text-gray-600" >
                        Azour
                        </p>
                  </div>
                </ReactRouterLink>
              </div> */}
            </Flex>
          </div>
        </div>
      )}
    </Authenticator>
  );
}