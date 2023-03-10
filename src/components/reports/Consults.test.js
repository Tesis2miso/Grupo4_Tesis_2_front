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
    PDFViewer: jest.fn().mockReturnValue('<div />'),
    Document: jest.fn().mockReturnValue('<div />'),
    Page: jest.fn().mockReturnValue('<div />'),
    View: jest.fn().mockReturnValue('<div />'),
    Text: jest.fn().mockReturnValue('<div />'),
}));

describe('Tests_Consults', () => {
    let wrapper = null;
    let consults = [];

    beforeEach(() => {
        consults = [
            {
                "automatic": false,
                "city": "Bogota",
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
        wrapper = shallow(<Consults consults={consults} />);
    });

    test('load consults with error', async () => {
        axios.mockResolvedValueOnce(Promise.resolve({ response: { data: { mssg: '' } } }));
        const prop = {
            OnValChange: jest.fn()
        }
        await act(async () => mount(<Consults {...prop} />));
    })

    test('load consults', async () => {
        axios.mockResolvedValueOnce(Promise.resolve({ data: consults }));
        const prop = {
            OnValChange: jest.fn()
        }
        await act(async () => {
            mount(<Consults {...prop} />)
        });
    })

    test('clikc button', async () => {
        wrapper.find('#datepicker').simulate('change', { target: { value: '02/27/2023' } })
        wrapper.find('#injuryType').simulate('change', { target: { value: 'injury' } })
        wrapper.find('#btnApplyFilter').simulate('click', {
            preventDefault: () => { },
            target: {
                consults: { value: consults }
            }
        });
    });

    test('show reports', () => {
        expect(wrapper).toMatchSnapshot();
    })
})