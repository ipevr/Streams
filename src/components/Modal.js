import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Modal test button
      </button>
      <div
        onClick={props.onDismiss}
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div onClick={(e) => e.stopPropagation()} className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {props.title}
              </h5>
              <button
                onClick={props.onDismiss}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{props.content}</div>
            <div className="modal-footer">{props.actions}</div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
