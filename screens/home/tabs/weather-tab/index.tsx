import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { AppStyles } from "../../../../global";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const WeatherTab: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://your-esp8266-ip-address");

    socket.onmessage = (event) => {
      const receivedMessage: IMessage[] = JSON.parse(event.data);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, receivedMessage)
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    const socket = new WebSocket("ws://your-esp8266-ip-address");
    socket.onopen = () => {
      socket.send(JSON.stringify(newMessages[0]));
      socket.close();
    };
  };

  return (
    <SafeAreaView style={[AppStyles.appContainer]}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{ _id: 1 }}
      />
    </SafeAreaView>
  );
};

export default WeatherTab;
