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
  import pin from "./assets/bluepin.png"
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
              <div className="w-[20%] h-[7%] absolute top-[38%] left-[52%]">
                <div className="flex justify-center items-center">
                  <ReactRouterLink to="/Rabat" component={Link}>
                    <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                      <Image
                        alt="pin"
                        src={pin}
                        backgroundColor="initial"
                        opacity="100%"
                        objectFit="contain" 
                        width="10%"
                        height="100%"
                        >
                        </Image>
                          <p className=" uppercase text-[2rem] italic text-black font-black hover:text-[3rem]" >
                            Rabat 
                          </p>
                   </div>
                  </ReactRouterLink>
                  </div>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[83%] left-[37%]">
                <ReactRouterLink to="/alhaouz" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                    <Image
                      alt="pin"
                      src={pin}
                      backgroundColor="initial"
                      opacity="100%"
                      objectFit="contain" 
                      width="10%"
                      height="100%"
                      >
                      </Image>
                        <p className=" text-[2rem] italic text-black font-black hover:text-gray-300" >
                          AL HAOUZ 
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              <div className="flex w-[30%] h-[7%] absolute top-[45%] left-[45%]">
                <ReactRouterLink to="/alhaouz" component={Link}>
                  <div className="flex flex-row h-full items-center justify-start overflow-hidden">
                    <Image
                      alt="pin"
                      src={pin}
                      backgroundColor="initial"
                      opacity="100%"
                      objectFit="contain" 
                      width="10%"
                      height="100%"
                      >
                      </Image>
                        <p className=" text-[2rem] italic text-black font-black hover:text-gray-300" >
                          CASABLANCA
                        </p>
                  </div>
                </ReactRouterLink>
              </div>
              {/* <div>
                <ReactRouterLink to="/Rabat" component={Link}>
                    <div className="flex flex-row h-full justify-start ">
                          <p className=" text-3xl italic text-black font-black hover:text-gray-300 uppercase" >
                            Rabat 
                          </p>
                    </div>
                  </ReactRouterLink>
                  <ReactRouterLink to="/alhaouz" component={Link}>
                  <div className="flex flex-row h-full justify-start ">
                        <p className=" text-3xl italic text-black font-black hover:text-gray-300 uppercase" >
                          Al Haouz 
                        </p>
                  </div>
                  </ReactRouterLink>
                  <ReactRouterLink to="/casablanca" component={Link}>
                  <div className="flex flex-row h-full justify-start ">
                        <p className=" text-3xl italic text-black font-black hover:text-gray-300 uppercase" >
                          Casablanca
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