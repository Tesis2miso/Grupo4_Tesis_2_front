import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import ConsultListItem from './ConsultListItem';

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

describe('Tests_patient_list_item', () => {

  let wrapper = null;
  let user = null;

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
    wrapper = shallow(<ConsultListItem user={user} />);
  });

  test('show patient list item', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('go to patient detail', async () => {
    wrapper.find('.ConsultListItem').simulate('click', {
      preventDefault: () => { }
    });
  })
})