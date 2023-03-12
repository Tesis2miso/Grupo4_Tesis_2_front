import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import axios from "axios";
import GridProfile from './GridProfile';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));
jest.mock('axios', () => jest.fn());
jest.mock('react-i18next', () => ({
    useTranslation: () => {
        return {
            t: (str) => str,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        };
    },
    initReactI18next: {
        type: '3rdParty',
        init: () => { },
    }
}));

describe('Tests_Profile', () => {
    let wrapper = null;
    let casesToTake = null;

    beforeEach(() => {
        casesToTake = {
            "id_consults": [
                "1"
            ]
        }
        wrapper = shallow(<GridProfile specialist={casesToTake} />);
    });

    test('show profile', () => {
        expect(wrapper).toMatchSnapshot();
    })

})