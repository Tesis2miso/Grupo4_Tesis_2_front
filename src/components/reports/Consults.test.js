import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import axios from "axios";
import Consults from './Consults';
import { act } from 'react-dom/test-utils';

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

jest.mock('@react-pdf/renderer', () => ({
    StyleSheet: {
        create: () => ({}),
    },
    Document: jest.fn().mockReturnValue('<div />'),
    Page: jest.fn().mockReturnValue('<div />'),
}));

describe('Tests_consults', () => {
    let wrapper = null;
    let confirmedconsults = [];

    beforeEach(() => {
        confirmedconsults = [
            {
                "automatic": false,
                "city": "Bogotá",
                "color": "yellow",
                "created_at": "2022-06-03T00:00:00",
                "diagnosis": "tinta de ropa en la piel",
                "distribution": "general",
                "id": 2.0,
                "injuries_count": 2.0,
                "injury_type": "injury2",
                "photo_url": null,
                "shape": "shape2",
                "status": 1,
                "updated_at": "2023-05-03T00:00:00",
                "user_email": "juana@gmail.com",
                "user_name": "juanita"
            }
        ]
        wrapper = shallow(<Consults consults={confirmedconsults} />);
    });

    test('load consults with error', async () => {
        axios.mockResolvedValueOnce(Promise.resolve({ response: { data: { mssg: '' } } }));
        const prop = {
            OnValChange: jest.fn()
        }
        await act(async () => mount(<Consults {...prop} />));
    })

    test('load consults', async () => {
        axios.mockResolvedValueOnce(Promise.resolve({ data: confirmedconsults }));
        const prop = {
            OnValChange: jest.fn()
        }
        await act(async () => {
            mount(<Consults {...prop} />)
        });
    })

    test('apply filter', async () => {
        wrapper.find('#datepicker').simulate('change', { target: { value: '02/27/2023' } })
        wrapper.find('#injuryType').simulate('change', { target: { value: 'injury' } })
        wrapper.find('#btnApplyFilter').simulate('click', {
            preventDefault: () => { },
            target: {
                consults: { value: confirmedconsults }
            }
        });
    });

    test('show reports', () => {
        expect(wrapper).toMatchSnapshot();
    })
})