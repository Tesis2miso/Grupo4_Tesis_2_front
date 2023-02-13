import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Reports from './Reports';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Reports', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Reports loggedIn={true} setToken={() => { }} />);
  });

  test('show reports', () => {
    expect(wrapper).toMatchSnapshot();
  })
})