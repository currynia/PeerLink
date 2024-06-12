import { useStompClient } from "react-stomp-hooks";

const PublishComponent = () => {
  const stompClient = useStompClient();

  const publishMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/handle/broadcast",
        body: "Hello World",
      });
    }
  };
  return <button onClick={publishMessage}> Send message </button>;
};
export default PublishComponent;
