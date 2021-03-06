

import PropTypes from 'prop-types';

import React, { Component } from 'react';
import Modal from '../../../components/Modal';
import { createSaveBtn, createCancelBtn } from '../../../components/Modal/buttons';
import ConfirmModal from '../../dialogs/ConfirmModal';

export default class extends React.Component {
  static displayName = 'EditEquipmentContainer';

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

  state = {
    confirmCancel: false,
    dirty: false,
  };

  makeDirty = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true });
    }
  };

  handleSave = () => {
    let name = this.nameInput.value.trim();

    if (name === '') return;
    if (name === this.props.name) {
      this.setState({ dirty: false });
      return this.props.onDismiss();
    }

    this.props.onChange({
      type: 'EQUIPMENT_CONTAINER_EDIT',
      data: {
        id: this.props.id,
        name,
      },
    });
    this.props.onDismiss();
  };

  handleCancel = () => {
    if (this.state.dirty) {
      this.setState({ confirmCancel: true });
    }

    this.setState({ dirty: false });
    this.props.onDismiss();
  };

  handleConfirm = (answer) => {
    switch (answer) {
      case 'no':
        return this.setState({ confirmCancel: false });
      case 'yes':
        this.setState({ dirty: false });
        this.props.onDismiss();
    }
  };

  renderEditContent = () => {
    return <section>
      <div className='modal-header'>
        <h3>
          <input
            type='text'
            ref={ref => this.nameInput = ref}
            placehodler={this.props.name}
            defaultValue={this.props.name}
            onChange={this.makeDirty}
          />
        </h3>
      </div>
      <div className='modal-footer'>
        { createSaveBtn(this.handleSave) }
        { createCancelBtn(this.handleCancel) }
      </div>
    </section>
  };

  render() {
    return <Modal
      id={`edit-${this.props.id}`}
      active={this.props.active}
      onDismiss={this.handleCancel}
      content={this.renderEditContent()}
    >
      <ConfirmModal
        active={this.state.confirmCancel}
        onConfirm={this.handleConfirm}
      />
    </Modal>
  }
}
