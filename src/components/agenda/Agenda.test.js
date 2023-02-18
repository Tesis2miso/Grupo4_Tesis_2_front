import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Agenda from './Agenda';

jest.mock('axios');

describe('Agenda component', () => {
  beforeEach(() => {
    localStorage.setItem('userName', 'John Doe');
    localStorage.setItem('token', 'mockToken');
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render the component', async () => {
    const mockScheduleData = [
      {
        created_at: '2022-02-19T10:00:00.000Z',
        injury_type: 'Acne',
        shape: 'Redonda',
        injuries_count: 3,
        user_name: 'Jane Doe',
        user_email: 'jane@example.com'
      }
    ];
    axios.get.mockResolvedValueOnce({
      data: mockScheduleData
    });
    render(<Agenda />);
    expect(screen.getByText('John Doe, tus compromisos mas proximos son:')).toBeInTheDocument();
    expect(screen.getByText('Acne con forma Redonda. El número de lesiones aproximado es 3')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('2022-02-19')).toBeInTheDocument();
  });

});
