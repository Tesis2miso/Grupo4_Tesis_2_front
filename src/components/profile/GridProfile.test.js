import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import axios from "axios";
import GridProfile from './GridProfile';

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

describe('Tests_Profile', () => {
  let wrapper = null;
  let specialist = null;

  beforeEach(() => {
    specialist = {
      "email": "e.quinterop@uniandes.edu.co",
      "id": 3.0,
      "last_name": "Quintero Pinto",
      "name": "Emilson Doo",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3Njc3MTMxNywianRpIjoiMzI1ZmMwNTUtMGZlYy00ZjhmLWJhNGEtZDMzNDc1MTU5Yjc5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImUucXVpbnRlcm9wQHVuaWFuZGVzLmVkdS5jbyIsIm5iZiI6MTY3Njc3MTMxNywiZXhwIjoxNjc2NzcyMjE3fQ.3g_FTuT5s6IT3eictmoSxdE_pLaYN7rbtKu2Qu3nFGY",
      "username": "quinteroe"
    }
    wrapper = shallow(<GridProfile specialist={specialist} />);
  });

  test('show profile', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('valid update profile', () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: specialist }));
    let button = wrapper.find('#updatebutton');
    button.simulate('click', {
      preventDefault: () => { },
      target: {
        name: { value: 'Emilson' },
        last_name: { value: 'Quintero' },
        email: { value: 'e.quinterop@uniandes.edu.co' },
        username: { value: 'e.quintero' },
        password: { value: '123456' },
        re_password: { value: '123456' }
      }
    });
  });

  test('valid update profile password not match', () => {
    axios.mockResolvedValueOnce(Promise.resolve({ response: { data: { mssg: '' } } }));
    wrapper.find('#password').simulate('change', { target: { value: '12345', name: 'password' } })
    wrapper.find('#re_password').simulate('change', { target: { value: '123456', name: 're_password' } })
    wrapper.find('#updatebutton').simulate('click', {
      preventDefault: () => { }
    });
  });

})