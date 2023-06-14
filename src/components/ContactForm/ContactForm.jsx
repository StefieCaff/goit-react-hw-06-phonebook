import { useState } from "react"
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import { addContact, filterContacts } from 'redux/slice';
/* styled components*/
import { SVG } from 'components/Icons/Icons'; 
import { StyledButton } from 'components/Button/s-button.js';
import { StyledForm, StyledInput } from './s-contact-form';
import { StyledFlexColumn, StyledFlex } from 'components/styled-common';
import { StyledTitle } from 'components/styled-common';
import { getContactInfo, getFilter } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';




const ContactForm = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
   
    const contacts = useSelector(getContactInfo);
    const filterValue = useSelector(getFilter);
    const dispatch = useDispatch();

    //handler to add data to store
    const handleContactData = () => {
        const data = { id: nanoid(6), name: name, number: number };
        dispatch(addContact(data));
        if (filterValue !== " ") {
            dispatch(filterContacts(''));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
            if (filterValue !== '') {
                dispatch(filterContacts(''));
            };
            return Notify.info(` Eeep, ${name} is already a contact. Please use a unique name.`)
        }
        handleContactData();
        Notify.success(`Got it, ${name} has been added to your phone book.`)
        formReset();
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number': {
                setNumber(value);
                break;
            }
            default:
                return;
        };
        
    };
    
// helper functions  
    const formReset = () => {
        setName('');
        setNumber('');
    };

    // const isNameValid = (name) => {
    // const re = /^[a-zA-Zа-яА-Я]+( ?([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    // return re.test(name);
    // };
    
    // const isTelValid = (number) => {
    // const re = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
       
    // return re.test(number);
    // };

    return (
        
        <StyledFlexColumn>
            <StyledTitle>Add a contact</StyledTitle>
            <StyledFlex>
                <StyledForm onSubmit={handleSubmit}>
                    
                    <StyledButton
                        style={{padding:5}}
                        type="submit"
                        aria-label="add a contact"
                    >
                        <SVG
                            width="25"
                            height="25"
                            name="add"
                        />
                    </StyledButton>
                    <StyledFlex> 
                        <label id="name">   
                            <StyledInput
                               type="text"
                                name='name'
                                pattern="[A-Za-z\- ]{1,30}"
                                title="Name must contain minimum 1, maximum 30 characters. In this case characters include Upper and lowercase letters, apostrophe with following letter, and a max of two spaces between characters. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                                placeholder="contact name"
                                required
                                autoFocus={true}
                                onChange={handleChangeInput}
                                value={name} 
                                maxLength="30"
                            />
                        </label>
                        <label id="tel">
                            <StyledInput
                                type="tel"
                                name='number'
                                pattern="[0-9\s+\-]{6,19}"
                                title="Phone number must be at least 6 digits max 19 digits. In this case digits include single spaces between numbers, dashes, parentheses and number can start with +"
                                required
                                placeholder="contact telephone"
                                onChange={handleChangeInput}
                                value={number}
                                maxLength="19"
                            />
                        </label>
                    </StyledFlex>
                </StyledForm>
            </StyledFlex>
        </StyledFlexColumn>
    );
};

export default ContactForm;