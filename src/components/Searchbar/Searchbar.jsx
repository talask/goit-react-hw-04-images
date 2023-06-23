import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { FiSearch } from 'react-icons/fi';
import { SearchbarHeader, SearchFormBtn } from './Searchbar.styled';
import styled from 'styled-components';

const SearchForm = styled(Form)`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  `;

  const SearchFormInput = styled(Field)`
    display: inline-block;
    width: 100%;
    font: inherit;
    font-size: 20px;
    border: none;
    outline: none;
    padding-left: 4px;
    padding-right: 4px;

    &input::placeholder {
        font: inherit;
        font-size: 18px;
      }
`;

const initialValues = {
    search: '',
};

const schema = yup.object().shape({
    search: yup.string().required(),
});

export const Searchbar = ({onSubmit}) => {
         
    return (
        <SearchbarHeader>
            <Formik
                initialValues = {initialValues}
                validationSchema = {schema}
                onSubmit = {(values, {resetForm}) => {
                    onSubmit(values.search, 1);
                    resetForm();
                }}
            >
                <SearchForm>
                    <SearchFormBtn type="submit">
                        <FiSearch size="16px"/>
                    </SearchFormBtn>

                    <SearchFormInput
                        type="text"
                        name="search"
                        placeholder="Search images and photos"
                    />
                    <ErrorMessage name='search' component="div" />
                </SearchForm>
            </Formik>
        </SearchbarHeader>)
    
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};