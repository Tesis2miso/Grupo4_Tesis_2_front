import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Schedule from './Schedule';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());

describe('Tests_Schedules', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Schedule loggedIn={true} setToken={() => { }} />);
  });

  test('show schedule', () => {
    expect(wrapper).toMatchSnapshot();
  })
})