
import { Formik,} from 'formik';
import { Label, Button, Input, Forms, Error } from './ContactForm.styled';
import { useState } from "react";
import * as yup from 'yup';
import PropTypes from 'prop-types';


const scema = yup.object().shape({
    name: yup.string().required(),
    number: yup.string().min(7).max(7).required(),
})

export function ContactForm({onSubmit}) { 
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelSabmit = (values, { resetForm }) => { 
    onSubmit(values)
    setName(values.name)
    setNumber(values.number)
    resetForm();
  };
    
  return <Formik
          validationSchema={scema}
          initialValues={{number,name}}
          onSubmit={handelSabmit}
          >
          <Forms action="">
              <Error component='div' name='name'/>
              <Label htmlFor="text">Name
                  <Input
                      type="text"
                      name="name"
                      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      required
                  />
              </Label>
              <Error component='div' name='number'/>
              <Label htmlFor="number">Number
                  <Input
                    type="tel"
                    name="number"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    required
                  />
                    
              </Label>  
              <Button type='submit' >Add contact</Button>
          </Forms>
      </Formik> ;
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
