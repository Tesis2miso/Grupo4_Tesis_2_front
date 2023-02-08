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

describe('Tests_Home', () => {

  var wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Home removeToken={() => { }} />);
  });

  test('show signup', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('logout', () => {
    axios.mockResolvedValueOnce(Promise.resolve({}));
    wrapper.find('#btnLogout').simulate('click', {
      preventDefault: () => { }
    });
  })

  test('logout with error', () => {
    axios.mockResolvedValueOnce(Promise.reject({ response: { status: 500, headers: {} } }));
    wrapper.find('#btnLogout').simulate('click', {
      preventDefault: () => { }
    });
  })
})