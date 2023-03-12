import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import Login from './Login';
import axios from "axios";
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());
jest.mock('react-i18next', () => ({
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
  let wrapper = null;
  var non_logged_in_wrapper = null;
  let credentials = null;


  beforeEach(() => {
    wrapper = shallow(<Login loggedIn={true} setToken={() => { }} />);
    non_logged_in_wrapper = shallow(<Login loggedIn={false} setToken={() => { }} />);
    credentials = {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODU5ODM0OSwianRpIjoiNDBjZTBmMmMtMWIwYy00NDg4LThkZjktOTNjZTVlNTQ4MWYyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImUucXVpbnRlcm9wQHVuaWFuZGVzLmVkdS5jbyIsIm5iZiI6MTY3ODU5ODM0OSwiZXhwIjoxNjc4NTk5MjQ5fQ.tVe4Y1KnZQMbamBsiKXrBYhW-frLH4xfjMv9OnnPjIw",
      "message": "Access granted",
      "username": {
        "id": 1,
        "last_name": "Quintero Pinto",
        "name": "Emilson D",
        "username": "quinteroe"
      }
    }
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

  test('input mayus credentials', () => {
    const event = new KeyboardEvent('keydown', { 'keyCode': 20 });
    document.dispatchEvent(event);
    expect(wrapper.find('#label_error')).toHaveLength(0);
  });

  test('load consults', async () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: credentials }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => {
      mount(<Login {...prop} />)
    });
  })

  test('go to signup', () => {
    wrapper.find('#goToSignup').simulate('click', {
      preventDefault: () => { }
    });
  })
})