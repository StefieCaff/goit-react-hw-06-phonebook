import { node, string }from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from "notiflix";

import { getContactInfo, getFilter } from 'redux/selectors.js';
import { removeContact } from 'redux/slice.js';

import { SVG } from '../Icons/Icons.jsx';
import { StyledButton } from 'components/Button/s-button.js';
import {
    StyledTitle,
    StyledFlexColumn,
    StyledFlex
} from 'components/styled-common.js';
import {
    StyledListWrapper,
    StyledList,
    StyledItem,
    StyledInfo,
    StyledName,
} from './s-contact-list.js';
import "./contact-list.css"

export const ContactList = () => {

    const contacts = useSelector(getContactInfo);
    const filterValue = useSelector(getFilter);
    const dispatch = useDispatch();
    const handleRemoveContact = contactId => {
        dispatch(removeContact(contactId));
        Notify.success('Success! Contact deleted.')
    };
    
    return (
        <StyledFlexColumn>
            <StyledFlex>
                <StyledTitle>Contact List</StyledTitle>
            </StyledFlex>
            <div>
            </div>
            <StyledListWrapper>
                <StyledList>
                    {
                       contacts
                        .filter(({ name }) => name.toLowerCase().includes(filterValue.trim()))
                        //.filter(({number})=> number.trim().includes(filterValue.trim()))
                        .map(({ id, name, number }) => {
                        return (
                            <StyledItem key={id}>
                                <StyledButton
                                    type="button"
                                    onClick={() => {
                                        handleRemoveContact(id);
                                    }}
                                >
                                    <SVG
                                        width="20"
                                        height="20"
                                        name="remove"
                                    />
                                </StyledButton>
                                <StyledInfo>
                                    <StyledName>{name}</StyledName>
                                    <CallTo phone={number}>{number}</CallTo>
                                </StyledInfo>
                                
                            </StyledItem>
                        );
                        })
                        //: Notify.failure("Hmm, that name does not match any contact in the phone book")
                    }
                </StyledList>
            </StyledListWrapper>
        </StyledFlexColumn>
    );
};

const CallTo = ({ phone, children }) => {
  return <a className="call-to" href={`tel:${phone}`}>{children}</a>;
};

CallTo.propTypes = {
    phone: string.isRequired,
    children: node  
};  
    