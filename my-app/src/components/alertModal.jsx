import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function AlertModal(props) {
    return (
      <Modal
        {...props}
        // size="lg"
        aria-labelledby="AlertModal"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="AlertModal">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>{props.title}</h4> */}
          <p id="dataBox" className="para">
           {props.desc}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }