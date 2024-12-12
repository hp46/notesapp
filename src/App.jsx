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
  Routes,
  Route,
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
        <div className="relative">
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
            >
            </Image>
            <div className="absolute top-10 left-10">
              <Button
              colorTheme="overlay"
              onClick={signOut}
              >
                Sign Out
              </Button>
            </div>
            <div className="w-[80%] h-[80%] habsolute top-[40%] left-[50%] text-black hover:text-gray-600 p-10">
            <ReactRouterLink to="/Rabat" component={Link}>
              <div className="flex flex-row">
              <Image
                alt="pin"
                src={pin}
                backgroundColor="initial"
                height="70px"
                width="45px"
                opacity="100%"
                >
                </Image>
                <Text fontWeight={800} fontSize="3em" fontStyle="italic" textDecoration="underline">
                  RABAT 
                </Text>
              </div>
            </ReactRouterLink>
            </div>
          </Flex>
        </div>
      )}
    </Authenticator>
  );
}