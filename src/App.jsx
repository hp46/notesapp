import { useState, useEffect } from "react";
import './index.css'
import {
  Authenticator,
  Button,
  Image,
  Flex,
  Text,

} from "@aws-amplify/ui-react";
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
          <Text>Rabat</Text>
          <div className="absolute">
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        </Flex>
        
      )}
    </Authenticator>
  );
}