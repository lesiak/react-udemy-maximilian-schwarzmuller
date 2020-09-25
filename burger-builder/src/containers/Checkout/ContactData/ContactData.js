import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import cssClasses from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
  };

  render() {
    return (
      <div className={cssClasses.contactdata}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="street" placeholder="Street" />
          <input type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="success" onClick={() => {}}>
            ORDER
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
