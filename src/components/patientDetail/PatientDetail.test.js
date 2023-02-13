import '@testing-library/jest-dom';
import PatientDetail from './PatientDetail';
import axios from "axios";
import { mount, shallow } from 'enzyme';
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

describe('Tests_Patient_Detail', () => {

  var wrapper = null;
  var user = null;

  beforeEach(() => {
    user = {
      "birth_day": "1997-04-19T00:00:00",
      "city": "Bogotá",
      "created_at": "2023-02-13T16:33:18.231963",
      "email": "drummerwilliam@gmail.com",
      "id": 1.0,
      "name": "William",
      "phone": "3013016284",
      "token": null
    }
    wrapper = shallow(<PatientDetail />);
  });

  test('show patient detail', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('load data with error', async () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<PatientDetail {...prop} />));
  })

  test('load data', async () => {
    axios.mockImplementation((httpData) => {
      const { url } = httpData;
      if (url.toString().includes('consults')) {
        return Promise.resolve({ data: [] });
      } else {
        return Promise.resolve({ data: user });
      }
    });
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<PatientDetail {...prop} />));
  })
})