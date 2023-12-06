import mqtt from 'mqtt';
import React from 'react';
import {Text } from 'react-native';

function connectToPythonApp(): void {
    /**
     * This function connects to a Python app using MQTT Vue Hook.
     * 
     * Returns:
     * void
     */
  console.log("asdasd ")
    const client = mqtt.connect('broker.emqx.io', {port: 1883, protocol: "mqtt", host: "asddsad "});
    client.on('connect', () => {
      console.log('Connected to Python app using MQTT Vue Hook');
      client.subscribe('test/abc/#', function (err) {
      if (!err) {
        // Publish a message to a topic
        client.publish('test/abc/asdas', 'Hello mqtt')
      }
    })
    });
    client.on('error', (error) => {
        console.error(`Error: ${error}`);
    });
        // Receive messages
    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })

}
const screandasd = () => {
  React.useEffect(() => {
    connectToPythonApp();
  })
  return (
    <Text>
      screandasd
  </Text>
  )
}
export default screandasd;