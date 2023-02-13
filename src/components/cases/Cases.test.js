import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Cases from './Cases';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Cases', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Cases loggedIn={true} setToken={() => { }} />);
  });

  test('show cases', () => {
    expect(wrapper).toMatchSnapshot();
  })
})