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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSendMsg, setIsLoadingSendMsg] = useState(false);

  const apiUrl = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    let date;
    let interval = null;
    setError(null);

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await axios(apiUrl);
        const messages = response.data;

        if (messages.length !== 0) {
          date = messages[messages.length - 1].datetime;
          setMessages(messages);
          setIsLoading(false);
        }

        if (interval) return;

        interval = setInterval(async () => {
          try {
            const responseInInterval = await axios(apiUrl + `?datetime=${date}`);
            const messagesInInterval = responseInInterval.data;

            if (messagesInInterval.length !== 0) {
              const messagesCopy = [...messages];
              const allMessages = messagesCopy.concat(messagesInInterval);
              setMessages(allMessages);
              date = messages[messages.length - 1].datetime;
            }
          } catch (e) {
            console.error(e);
          }
        }, 2000);
      } catch (e) {
        setIsLoading(true);
        setError(e.message);
      }
    };

    fetchMessages().catch(e => console.error(e));

    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, []);


  const onChangeNewMsgData = (name, value) => {
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendNewMessage = async (e) => {
    e.preventDefault();

    if (newMessage.userMsg === '' || newMessage.userDisplayName === '') {
      alert('Fill all the fields to send the message on chat.');
    }

    setIsLoadingSendMsg(true);

    const data = new URLSearchParams();
    data.set('message', newMessage.userMsg);
    data.set('author', newMessage.userDisplayName);

    try {
      await axios.post(apiUrl, data)
        .then(() => {
          setNewMessage({userDisplayName: '', userMsg: ''});
          setIsLoadingSendMsg(false);
        })
        .catch((error) => {
          setError('Impossible to implement POST request: ' + error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {
        error ?
          <div className="alert alert-danger h-10 text-center">{error}</div>
          : null
      }
      <div className="container bgColor">
        <div className="row pt-5">
          <div className="col-7">
            <h1 className="greenColor text-center">Messages</h1>
            {isLoading ?
              <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div> :
              <Messages messages={messages}/>
            }
          </div>
          <div className="col-5">
            <h1 className="greenColor">Send your message</h1>
            <NewMsgForm
              newMessage={newMessage}
              onChange={onChangeNewMsgData}
              onSending={sendNewMessage}
              error={error}
              isLoadingSendMsg={isLoadingSendMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;