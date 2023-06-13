import { StyledFilter } from './s-filter';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { filterContacts } from 'redux/slice';

import { StyledTitle } from 'components/styled-common';
import { StyledFlexColumn } from 'components/styled-common';

const Filter = () => {
    const filterValue = useSelector(getFilter);
    const dispatch = useDispatch();
    
    const handleFilterInput = (e) => {
        dispatch(filterContacts(e.currentTarget.value));
    };
    return (
        <StyledFlexColumn>
            <StyledTitle>Search contacts for: {filterValue}</StyledTitle>
            <StyledFilter
                type="text"
                value={filterValue}
                placeholder="search by name"
                onChange={handleFilterInput}
            />
        </StyledFlexColumn>
    );
};
export default Filter;