import React from 'react';
import { connect } from 'react-redux';

import Alert from 'elemental/lib/components/Alert';
import Modal from 'elemental/lib/components/Modal';
import ModalBody from 'elemental/lib/components/ModalBody';
import ModalFooter from 'elemental/lib/components/ModalFooter';
import Button from 'elemental/lib/components/Button';
import Form from 'elemental/lib/components/Form';
import FormField from 'elemental/lib/components/FormField';
import FormInput from 'elemental/lib/components/FormInput';

import 'elemental/less/elemental.less';

import { closeLoginModal, editCredential, login } from '../actions/auth';

const LoginAlert = ({ err }) => {
  if (err) {
    return (
      <Alert type="danger">
        <strong>Error: </strong>{err}
      </Alert>
    );
  }
  return null;
};

const LoginModalView = ({ isOpen, username, password, err, onInput, onCancel, onSubmit }) => (
  <Modal isOpen={isOpen} onCancel={onCancel} backdropClosesModal>
    <ModalBody>
      <LoginAlert err={err} />
      <Form>
        <FormField label="Username" htmlFor="username">
          <FormInput
            autoFocus
            type="text"
            name="username"
            value={username}
            onInput={onInput}
          />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <FormInput
            type="password"
            name="password"
            value={password}
            onInput={onInput}
          />
        </FormField>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button type="primary" onClick={onSubmit}>Login</Button>
      <Button type="link-cancel" onClick={onCancel}>Cancel</Button>
    </ModalFooter>
  </Modal>
);

const mapStateToProps = ({ auth }) => ({
  isOpen: auth.isModalOpen,
  username: auth.username,
  password: auth.password,
  err: auth.err,
});

const mapDispatchToProps = dispatch => ({
  onInput: e => dispatch(editCredential(e.target.name, e.target.value)),
  onCancel: () => dispatch(closeLoginModal),
  onSubmit: () => dispatch(login),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalView);
