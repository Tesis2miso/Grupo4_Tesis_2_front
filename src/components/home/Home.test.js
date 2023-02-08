import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Home from './Home';
import axios from "axios";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Tests_Home', () => {

  var wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Home removeToken={() => { }} />);
  });

  test('show signup', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('logout', () => {
    wrapper.find('#btnLogout').simulate('click', {
      preventDefault: () => { }
    });
  })
})