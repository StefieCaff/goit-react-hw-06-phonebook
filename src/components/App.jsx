/* Libraries */
import { useSelector } from 'react-redux';
/* Local JS*/
import { getContactInfo } from 'redux/selectors.js';
/* Components */ 
import ContactForm from './ContactForm/ContactForm.jsx'
import { ContactList } from './ContactList/ContactList.jsx'
import Filter from './Filter/Filter.jsx'
/* Styled Components*/
import {
  StyledContainer,
  StyledHeader,
  StyledSection
} from "./styled-common.js";


/*App*/

export const App = () => {
  const contacts = useSelector(getContactInfo);

// normalize filter and look for matching name in contacts  
  // const searchContact = () => {
  //   const normalizedFilter = filter.toLowerCase();
  //   const searchName = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  //   const searchTel = contacts.filter(contact =>
  //     contact.number.includes(normalizedFilter)
  //   );
    
  //   if (searchName.length >= 1) {
  //     if (normalizedFilter !== "" && searchName.length === 0) {
  //       Notify.failure("Hmm, that name does not match any contact in the phone book");
  //     }
  //     return searchName;
  //   };
  //   if (searchTel){
  //     if (normalizedFilter !== "" && searchTel.length === 0) {
  //       Notify.failure("Hmm, that number does not match any contact in the phone book");
  //     }
  //     return searchTel;
  //   };
  // };
/*markup*/
  return (
    <>
      <StyledContainer className='container'>
        <StyledHeader>Phone Book</StyledHeader>
      </StyledContainer>
      <StyledSection>
      <StyledContainer>
      
          <ContactForm />
        </StyledContainer>
      </StyledSection>
      {contacts.length > 0 && (
      <>
        <StyledSection>
          <StyledContainer>
            <Filter />
          </StyledContainer>
        </StyledSection>
        <StyledSection>
          <StyledContainer>
            <ContactList
              // contacts={searchContact()}
            />
          </StyledContainer>
        </StyledSection>
        </>
       )}
    </>
  );
};
