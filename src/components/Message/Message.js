import React from 'react';

const Message = (props) => {
  return (
    <div className="card mt-4">
      <div className="card-header text-primary">
        {props.author}
      </div>
      <div className="card-body">
        <h5 className="card-title">" {props.message} "</h5>
        <p className="card-text text-secondary">{props.datetime} </p>
      </div>
    </div>
  );
};

export default Message;