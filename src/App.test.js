import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import App  from './App';

describe('Tests_App', () => {
  let wrapper = shallow(<App />);

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('show_App', () => {
    expect(wrapper).toMatchSnapshot();
  });


})