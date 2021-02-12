import React from "react";
import { Modal as BSModal } from "react-bootstrap";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <BSModal show={true} onHide={props.onDismiss}>
      <BSModal.Header closeButton>
        <BSModal.Title>{props.title}</BSModal.Title>
      </BSModal.Header>
      <BSModal.Body>{props.content}</BSModal.Body>
      <BSModal.Footer>{props.actions}</BSModal.Footer>
    </BSModal>,
    document.getElementById("modal")
  );
};

export default Modal;
