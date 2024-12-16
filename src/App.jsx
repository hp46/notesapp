import {  } from "react";
import './index.css'
import {
  Authenticator,
  Button,
  Image,
  Flex,
  Text,
  Link,
} from "@aws-amplify/ui-react";
import {
  BrowserRouter as Router,
  Link as ReactRouterLink,
} from 'react-router-dom';
  import "@aws-amplify/ui-react/styles.css";
  import image from "./assets/morocco1.png"
  import pin from "./assets/pin.png"
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */


export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
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
            objectFit="cover"
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
            <div className="flex w-[30%] h-[7%] absolute top-[40%] left-[50%]">
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
                    <p className=" text-4xl text-black font-black hover:text-gray-700 hover:italic" >
                      RABAT 
                    </p>
              </div>
            </ReactRouterLink>
            </div>
          </Flex>
        </div>
      )}
    </Authenticator>
  );
}