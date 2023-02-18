import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import Agenda from './Agenda';
import axios from "axios";
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
describe('Tests_Agenda', () => {
  let wrapper = null;
  let consults = [];

  beforeEach(() => {
    wrapper = shallow(<Agenda loggedIn={true} setToken={() => { }} />);
    consults = [ {
        created_at: '2022-02-19T10:00:00.000Z',
        injury_type: 'Acne',
        shape: 'Redonda',
        injuries_count: 3,
        user_name: 'Jane Doe',
        user_email: 'jane@example.com'
      }]
  });

  test('show agenda', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('load agenda', async () => {
    axios.mockResolvedValueOnce(Promise.resolve({ data: consults }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => {
      mount(<Agenda {...prop} />)
    });
  })

  test('load agenda with error', async () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    const prop = {
      OnValChange: jest.fn()
    }
    await act(async () => mount(<Agenda {...prop} />));
  })
})