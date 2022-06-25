import React, {useEffect, useState} from 'react';
import axios from "axios";
import Messages from "../../components/Messages/Messages";
import NewMsgForm from "../../components/NewMsgForm/NewMsgForm";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState({
    userDisplayName: '',
    userMsg: '',
  });

  const apiUrl = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    let date;
    let interval = null;

    const fetchPrevMessages = async () => {
      try {
        const response = await axios(apiUrl);
        const messages = response.data;

        if (messages.length !== 0) {
          date = messages[messages.length - 1].datetime;
          setMessages(messages);
        }

        console.log('start');
        if (interval) return;

        interval = setInterval(async () => {
          // console.log('in interval');
          // console.log(date);

          const responseInInterval = await axios(apiUrl + `?datetime=${date}`);
          const messagesInInterval = responseInInterval.data;

          if (messagesInInterval.length !== 0) {
            date = messagesInInterval[messagesInInterval.length - 1].datetime;
            // console.log(date);
            // console.log(messagesInInterval);

            const messagesCopy = [...messages];
            const allMessages = messagesCopy.concat(messagesInInterval);
            setMessages(allMessages);
          }

        }, 2000);


      } catch (e) {
        setError(e.message);
      }
    };

    fetchPrevMessages().catch(e => console.error(e));
  }, []);

  const onChangeNewMsgData = (name, value) => {
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendNewMessage = async (e) => {
    e.preventDefault();

    const data = new URLSearchParams();
    data.set('message', newMessage.userMsg);
    data.set('author', newMessage.userDisplayName);

    if (newMessage.userMsg === '' || newMessage.userDisplayName === '') {
      alert('Fill all the fields to send the message on chat');
    }

    try {
      await axios.post(apiUrl, data)
        .then(() => {
          setNewMessage({userDisplayName: '', userMsg: ''});
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-7">
          <h1>Messages</h1>
          <Messages messages={messages}/>
        </div>
        <div className="col-5">
          <h1>Send your message</h1>
          <NewMsgForm
            newMessage={newMessage}
            onChange={onChangeNewMsgData}
            onSending={sendNewMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;