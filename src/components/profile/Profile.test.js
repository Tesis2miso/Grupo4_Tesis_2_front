import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import axios from "axios";
import Profile from './Profile';
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

describe('Tests_Profile', () => {
  let wrapper = null;
  let specialist = null;

  beforeEach(() => {
    wrapper = shallow(<Profile />);
    specialist = {
        "name": "Emilson D",
        "email": "e.quinterop@uniandes.edu.co",
        "last_name": "Quintero Pinto",
        "username": "quinteroe",
        "password": "",
        "re_password": ""
      }      
  });

  test('load data with error', async () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<Profile {...prop} />));
  })

  test('load data', async () => {
    axios.mockImplementation((httpData) => {
      const { url } = httpData;
      if (url.toString().includes('profile')) {
        return Promise.resolve({ data: [] });
      } else {
        return Promise.resolve({ data: specialist });
      }
    });
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<Profile {...prop} />));
  })

  test('show profile', () => {
    expect(wrapper).toMatchSnapshot();
  })
})