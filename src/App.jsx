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
            <ReactRouterLink to="/Rabat" component={Link}>Rabat</ReactRouterLink>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        </Flex>
        
      )}
    </Authenticator>
  );
}