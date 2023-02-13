import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Home from './Home';
import axios from "axios";

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

describe('Tests_Home', () => {

  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Home removeToken={() => { }} />);
  });

  test('show signup', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('open options menu', () => {
    axios.mockResolvedValueOnce(Promise.resolve({ response: { data: {} } }));
    wrapper.find('#optionsMenu').simulate('click', {
      preventDefault: () => { }
    });
    wrapper.find('#menuLogout').simulate('click', {
      preventDefault: () => { }
    });    
  })

  test('error on logout', () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { data: { mssg: '' } } }));
    wrapper.find('#optionsMenu').simulate('click', {
      preventDefault: () => { }
    });
    wrapper.find('#menuLogout').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('change locale to spanish', () => {
    wrapper.find('#languageMenu').simulate('click', {
      preventDefault: () => { }
    });
    wrapper.find('#languageEs').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('change locale to english', () => {
    wrapper.find('#languageMenu').simulate('click', {
      preventDefault: () => { }
    });
    wrapper.find('#languageEn').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('go to patients', () => {
    wrapper.find('#drawerOption-patients').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('go to reports', () => {
    wrapper.find('#drawerOption-reports').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('go to schedule', () => {
    wrapper.find('#drawerOption-schedule').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('go to cases', () => {
    wrapper.find('#drawerOption-cases').simulate('click', {
      preventDefault: () => { }
    });
  })
})