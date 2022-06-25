import React from 'react';

const NewMsgForm = (props) => {
  return (
    <form className="mt-4" onSubmit={props.onSending}>
      <div className="form-group row">
        <label htmlFor="userDisplayName" className="col-sm-2 col-form-label">Display name</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="userDisplayName"
            name="userDisplayName"
            value={props.newMessage.userDisplayName}
            placeholder="Enter your name"
            onChange={(e) => props.onChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="userMsg" className="col-sm-2 col-form-label">Message</label>
        <div className="col-sm-10">
          <textarea
            className="form-control"
            name="userMsg"
            id="userMsg"
            value={props.newMessage.userMsg}
            onChange={(e) => props.onChange(e.target.name, e.target.value)}
            rows="3"
            placeholder="Here your message"
          />
        </div>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="btn btn-primary"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default NewMsgForm;