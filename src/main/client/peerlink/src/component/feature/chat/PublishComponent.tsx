import { useStompClient } from "react-stomp-hooks";

const PublishComponent = () => {
  const stompClient = useStompClient();

  const publishMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/handle/chat/boradcast",
        body: "Hello World",
      });
    }
  };
  return <div onClick={publishMessage}> Send message </div>;
};
export default PublishComponent;
