import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import axios from "axios";
import Consults from './Consults';
import { act } from 'react-dom/test-utils';
import applyFilter  from './Consults'; 

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

describe('Tests_patients', () => {

  let wrapper = null;
  let Consults = [];

  beforeEach(() => {
    wrapper = shallow(<Consults />);
    Consults = [
      {
        "birth_day": "1997-04-19T00:00:00",
        "city": "Bogotá",
        "created_at": "2023-02-13T16:33:18.231963",
        "email": "drummerwilliam@gmail.com",
        "id": 1.0,
        "name": "William",
        "phone": "3013016284",
        "token": null
      }
    ]
  });

  test('show signup', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('load Consults with error', async () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<Consults {...prop} />));
  })

  test('load Consults', async () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: Consults }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => {
      mount(<Consults {...prop} />)
    });
  })
})
