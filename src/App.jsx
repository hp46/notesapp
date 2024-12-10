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
  import image from "./assets/morocco.png"
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
            <div className="absolute top-[40%] left-[50%]">
            <ReactRouterLink to="/Rabat" component={Link}>
              <Text fontWeight={500} fontSize="1em">
                RABAT 
              </Text>
            </ReactRouterLink>
            </div>
          </Flex>
        </div>
      )}
    </Authenticator>
  );
}