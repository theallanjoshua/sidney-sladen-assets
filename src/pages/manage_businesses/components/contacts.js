import * as React from 'react';
import Contact from './contact';
import { Row, Col, Button } from 'antd';

export default class Contacts extends React.Component {
  onChange = (incomingContact, incomingIndex) => {
    const contacts = this.props.contacts.map((contact, index) => index === incomingIndex ? { ...incomingContact } : { ...contact })
    this.props.onChange(contacts);
  }
  addContact = (type = '', info = '') => this.props.onChange([ ...this.props.contacts, { type, info } ]);
  removeContact = indexToRemove => this.props.onChange([ ...this.props.contacts.filter((item, index) => index !== indexToRemove) ]);
  render = () => <>
    {this.props.contacts.map((contact, index) => <Row key={index} gutter={8}>
        <Col span={22}>
          <Contact
            showValidationErrors={this.props.showValidationErrors}
            contact={contact}
            onChange={contact => this.onChange(contact, index)}
          />
        </Col>
        <Col span={2}>
          {this.props.contacts.length > 1 ? <Button
            icon='delete'
            type='danger'
            onClick={() => this.removeContact(index)}
          /> : null }
        </Col>
      </Row>)}
    <Button
      icon='plus'
      children='Add'
      onClick={() => this.addContact()}
    />
  </>
};