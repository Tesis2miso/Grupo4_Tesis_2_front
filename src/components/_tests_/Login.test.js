import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Login from '../login/Login';


describe('Tests_Login', () => {
  let wrapper = shallow(<Login />);
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  test('show_Login', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('show_Login_elements', () => {
    expect(wrapper.find('h1').text()).toEqual('DermoApp');
    expect(wrapper.find('#username')).toHaveLength(1);
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#submitbtn1').text()).toEqual('Submit');
  });

  test('show_empty_inputs', () => {
    expect(wrapper.find('#username').text()).toEqual("");
    expect(wrapper.find('#password').text()).toEqual("");
  });

})