import '@testing-library/jest-dom';
import PatientMedicalHistory from './PatientMedicalHistory';
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

describe('Tests_Patient_Medical_History', () => {

  var wrapper = null;
  var consults = null;

  beforeEach(() => {
    consults = [
      {
        "color": "rojo",
        "created_at": "2023-02-13T16:51:04.932372",
        "distribution": "brazo",
        "id": 1.0,
        "injuries_count": 1.0,
        "injury_type": "test",
        "photo_url": "https://google.com/",
        "shape": "circular",
        "user_id": 1.0
      }
    ]
    wrapper = shallow(<PatientMedicalHistory />);
  });

  test('show patient detail', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('load data with error', async () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<PatientMedicalHistory {...prop} />));
  })

  test('load data', async () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: consults }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<PatientMedicalHistory {...prop} />));
  })
})