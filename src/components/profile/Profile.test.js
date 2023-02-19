import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Profile from './Profile';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Profile', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Profile loggedIn={true} setToken={() => { }} />);
  });

  test('show profile', () => {
    expect(wrapper).toMatchSnapshot();
  })
})