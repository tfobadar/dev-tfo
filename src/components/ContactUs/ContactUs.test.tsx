import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactUs from './ContactUs';
import { BASIC, WITH_IMAGE } from './constants';
import { Provider } from '@tfo/mytfo-components';
describe('Contact our experts component', () => {
  const mockFn = jest.fn();
  it('should render Contact our experts', async () => {
    render(<ContactUs {...BASIC} handleSubmit={mockFn} />, {
      wrapper: Provider,
    });
    expect(screen.getByText('dummy title')).toBeInTheDocument();
    expect(screen.getByText('dummy footer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter phone number'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email ID')).toBeInTheDocument();
  });
  it('should render Contact our experts with Image', async () => {
    render(<ContactUs {...WITH_IMAGE} handleSubmit={mockFn} />, {
      wrapper: Provider,
    });
    expect(screen.getByAltText('altImage')).toBeInTheDocument();
  });
  it('should give error on submit form withour filling data', async () => {
    render(<ContactUs {...BASIC} handleSubmit={mockFn} />, {
      wrapper: Provider,
    });
    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(
        screen.getByText(/email is a required field/i),
      ).toBeInTheDocument();
    });
  });
});
