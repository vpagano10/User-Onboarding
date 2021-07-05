import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';


const Title = styled.h1`
    background-color: lightslategrey;
    color: navy;
`;
const UserForm = styled(Form)`
    background-color: khaki;
    color: dodgreblue;
    padding: 2%;
    width: 85%;
    margin: 0 auto;
`;
const UserCards = styled.div`
    background-color: khaki;
    color: navy;
    width: 25%;
    padding: 2%;
    margin: 0 auto;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 2px solid navy;
`;
const Button = styled.button`
    background-color: transparent;
    color: navy
    border: 2px solid navy;
    padding: 1%;
    margin: 1%;
    font-size: 1.2rem;
    font-weight: bold;
    &:hover {
        background-color: navy;
        color: khaki;
        border: 2px solid lightseagreen;
    }
`;

const UserOnboarding = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
    return (
        <div>
            <Title>Create a New User!</Title>
            <UserForm>
                <Field
                type='text'
                name='name'
                placeholder='name'
                />
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}<br />
                <Field 
                type='text'
                name='email'
                placeholder='email'
                />
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}<br />
                <Field 
                type='password'
                name='password'
                placeholder='password'
                />
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}<br />
                <Field 
                type='checkbox'
                name='termsOfService'
                checked={values.termsOfService}
                /><br />
                <Button type='submit'>Submit</Button>
            </UserForm>
            {users.map(user => (
                <UserCards key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Password Length: {user.password.length}</p>
                </UserCards>
            ))}
        </div>
    );
};


const FormikUserOnboarding = withFormik({
    mapPropsToValues({name, email, password, termsOfService}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit(values, {setStatus}) {
        axios
            .post('https://reqres.in/api/users', values)
            .then(res => { setStatus(res.data); })
            .catch(err => console.log(err.response));

    }
})(UserOnboarding);
export default FormikUserOnboarding;