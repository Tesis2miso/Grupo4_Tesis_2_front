import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Signup from './Signup';
import axios from "axios";
import { render } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Signup', () => {

  var wrapper = null;
  var non_logged_in_wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Signup loggedIn={true} setToken={() => { }} />);
    non_logged_in_wrapper = shallow(<Signup loggedIn={false} setToken={() => { }} />);
  });

  test('show signup', () => {
    render(<Signup loggedIn={true} setToken={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('show signup inputs if logged in', () => {
    expect(wrapper.find('#name').text()).toEqual("");
    expect(wrapper.find('#lastName').text()).toEqual("");
    expect(wrapper.find('#email').text()).toEqual("");
    expect(wrapper.find('#emailConfirmation').text()).toEqual("");
    expect(wrapper.find('#username').text()).toEqual("");
    expect(wrapper.find('#password').text()).toEqual("");
    expect(wrapper.find('#passwordConfirmation').text()).toEqual("");
    expect(wrapper.find('#submitbtn1').exists()).toBeTruthy()
  });

  test('inputs should not be shown if not logged in', () => {
    expect(non_logged_in_wrapper.find('#name').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#lastName').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#email').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#emailConfirmation').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#username').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#password').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#passwordConfirmation').text()).toEqual("");
    expect(non_logged_in_wrapper.find('#submitbtn1').exists()).toBeTruthy()
  });

  test('validate if passwords do not match', () => {
    wrapper.find('#name').simulate('change', { target: { value: 'William', name: 'name' } })
    wrapper.find('#lastName').simulate('change', { target: { value: 'Ravelo', name: 'lastName' } })
    wrapper.find('#email').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'email' } })
    wrapper.find('#emailConfirmation').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'emailConfirmation' } })
    wrapper.find('#username').simulate('change', { target: { value: 'ravelinx', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '1234567', name: 'password' } })
    wrapper.find('#passwordConfirmation').simulate('change', { target: { value: '123456', name: 'passwordConfirmation' } })
    wrapper.find('#termsAndConditions').simulate('change', { target: { checked: true, name: 'termsAndConditions' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => {}
    });
    expect(wrapper.find('#error').text()).not.toEqual("");
  })


  test('validate if emails do not match', () => {
    wrapper.find('#name').simulate('change', { target: { value: 'William', name: 'name' } })
    wrapper.find('#lastName').simulate('change', { target: { value: 'Ravelo', name: 'lastName' } })
    wrapper.find('#email').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'email' } })
    wrapper.find('#emailConfirmation').simulate('change', { target: { value: 'drummerwilliam2@gmail.com', name: 'emailConfirmation' } })
    wrapper.find('#username').simulate('change', { target: { value: 'ravelinx', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#passwordConfirmation').simulate('change', { target: { value: '123456', name: 'passwordConfirmation' } })
    wrapper.find('#termsAndConditions').simulate('change', { target: { checked: true, name: 'termsAndConditions' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
    expect(wrapper.find('#error').text()).not.toEqual("");
  })

  test('validate if terms and conditions not accepted', () => {
    wrapper.find('#name').simulate('change', { target: { value: 'William', name: 'name' } })
    wrapper.find('#lastName').simulate('change', { target: { value: 'Ravelo', name: 'lastName' } })
    wrapper.find('#email').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'email' } })
    wrapper.find('#emailConfirmation').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'emailConfirmation' } })
    wrapper.find('#username').simulate('change', { target: { value: 'ravelinx', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#passwordConfirmation').simulate('change', { target: { value: '123456', name: 'passwordConfirmation' } })
    wrapper.find('#termsAndConditions').simulate('change', { target: { checked: false, name: 'termsAndConditions' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
    expect(wrapper.find('#error').text()).not.toEqual("");
  })

  test('register specialist', () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: { token: '' }}));

    wrapper.find('#name').simulate('change', { target: { value: 'William', name: 'name' } })
    wrapper.find('#lastName').simulate('change', { target: { value: 'Ravelo', name: 'lastName' } })
    wrapper.find('#email').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'email' } })
    wrapper.find('#emailConfirmation').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'emailConfirmation' } })
    wrapper.find('#username').simulate('change', { target: { value: 'ravelinx', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#passwordConfirmation').simulate('change', { target: { value: '123456', name: 'passwordConfirmation' } })
    wrapper.find('#termsAndConditions').simulate('change', { target: { checked: true, name: 'termsAndConditions' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('register specialist with error', () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } }}));

    wrapper.find('#name').simulate('change', { target: { value: 'William', name: 'name' } })
    wrapper.find('#lastName').simulate('change', { target: { value: 'Ravelo', name: 'lastName' } })
    wrapper.find('#email').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'email' } })
    wrapper.find('#emailConfirmation').simulate('change', { target: { value: 'drummerwilliam@gmail.com', name: 'emailConfirmation' } })
    wrapper.find('#username').simulate('change', { target: { value: 'ravelinx', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#passwordConfirmation').simulate('change', { target: { value: '123456', name: 'passwordConfirmation' } })
    wrapper.find('#termsAndConditions').simulate('change', { target: { checked: true, name: 'termsAndConditions' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('go to login', () => {
    wrapper.find('#goToLogin').simulate('click', {
      preventDefault: () => { }
    });
  })
})