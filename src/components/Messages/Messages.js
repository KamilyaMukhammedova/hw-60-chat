import React from 'react';
import Message from "../Message/Message";

const Messages = (props) => {
  return [...props.messages].reverse().map((obj) => (
    <Message
      key={obj._id}
      author={obj.author}
      datetime={obj.datetime}
      message={obj.message}
    />
  ));
};

export default Messages;