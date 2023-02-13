import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import Login from './Login';
import axios from "axios";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());
jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => { },
  }
}));

describe('Tests_Login', () => {
  var wrapper = null;
  var non_logged_in_wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Login loggedIn={true} setToken={() => { }} />);
    non_logged_in_wrapper = shallow(<Login loggedIn={false} setToken={() => { }} />);
  });

  test('show_Login', () => {
    render(<Login loggedIn={true} setToken={() => { }} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('login if logged in', () => {
    expect(wrapper.find('h1').text()).toEqual('DermoApp');
    expect(wrapper.find('#username')).toHaveLength(1);
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#submitbtn1').text()).toEqual('submit');
  });

  test('login if not logged in', () => {
    expect(non_logged_in_wrapper.find('h1').text()).toEqual('DermoApp');
    expect(non_logged_in_wrapper.find('#username')).toHaveLength(1);
    expect(non_logged_in_wrapper.find('#password')).toHaveLength(1);
    expect(non_logged_in_wrapper.find('#submitbtn1').text()).toEqual('submit');
  });

  test('input valid credentials', () => {
    axios.mockResolvedValueOnce(Promise.resolve({ response: { data: { access_token: '' } } }));
    wrapper.find('#username').simulate('change', { target: { value: 'test@gmail.com', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
  });

  test('input invalid credentials', () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    wrapper.find('#username').simulate('change', { target: { value: 'test@gmail.com', name: 'username' } })
    wrapper.find('#password').simulate('change', { target: { value: '123456', name: 'password' } })
    wrapper.find('#submitbtn1').simulate('click', {
      preventDefault: () => { }
    });
  });

  test('go to signup', () => {
    wrapper.find('#goToSignup').simulate('click', {
      preventDefault: () => { }
    });
  })
})