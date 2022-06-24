import React, {useEffect, useState} from 'react';
import axios from "axios";
import Messages from "../../components/Messages/Messages";

const Chat = () => {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    let date;

    const fetchPrevMessages = async () => {
      try {
        const response = await axios(apiUrl);
        const messages = response.data;


        if (messages.length !== 0) {
          setMessages(messages);
        }


      } catch (e) {
        setError(e.message);
      }
    };

    fetchPrevMessages().catch(e => console.error(e));
  }, []);


  return (
    <div className="container">
      <div className="row">
        <div className="col-7">
          <h1>Messages</h1>
          <Messages messages={messages}/>
        </div>
        <div className="col-5">

        </div>
      </div>
    </div>
  );
};

export default Chat;