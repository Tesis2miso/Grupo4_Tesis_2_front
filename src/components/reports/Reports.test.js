import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Reports from './Reports';
import axios from "axios";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Reports', () => {
  var wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Reports loggedIn={true} setToken={() => { }} />);
  });

  test('show reports', () => {
    expect(wrapper).toMatchSnapshot();
  })
})