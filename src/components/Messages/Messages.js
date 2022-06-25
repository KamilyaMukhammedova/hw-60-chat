import React from 'react';
import Message from "../Message/Message";

const Messages = (props) => {


  return props.messages.map((obj, index) => (
    <Message
      key={obj._id}
      index={index}
      author={obj.author}
      datetime={obj.datetime}
      message={obj.message}
    />
  ));
};

export default Messages;