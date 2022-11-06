import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import MetamaskLogo from "./metamasklogo";
const Popup = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Wanna Participate?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center">Install Metamask</h4>
        <MetamaskLogo />
        <p>
          As this is a decentalized website you would need to setup a
          cryptowallet like metamask to Interact with the website and pay for
          services.
        </p>
        <p>
          This will also act as your login to the game (no extra password
          needed).
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          tag={Link}
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          target="_blank"
        >
          Get from Chrome Store
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
