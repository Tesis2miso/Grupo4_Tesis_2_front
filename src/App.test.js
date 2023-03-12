import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import App  from './App';

jest.mock('@react-pdf/renderer', () => ({
  StyleSheet: {
      create: () => ({}),
  },
  Document: jest.fn().mockReturnValue('<div />'),
  Page: jest.fn().mockReturnValue('<div />'),
}));


describe('Tests_App', () => {
  let wrapper = shallow(<App />);

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test('show_App', () => {
    expect(wrapper).toMatchSnapshot();
  });


})