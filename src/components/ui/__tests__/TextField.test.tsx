import { fireEvent, waitFor } from '@testing-library/react-native';

import { TextField } from '@/components/ui/TextField';
import { renderWithTheme } from '@/test/render';

describe('TextField', () => {
  it('renders the error and reports text changes', async () => {
    const onChangeText = jest.fn();
    const screen = await renderWithTheme(
      <TextField
        label="Email"
        value=""
        onChangeText={onChangeText}
        error="Enter a valid email"
        placeholder="you@company.com"
      />,
    );

    expect(screen.getByText('Enter a valid email')).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText('Email'), 'ada@example.com');
    expect(onChangeText).toHaveBeenCalledWith('ada@example.com');
  });

  it('toggles a password field between hidden and visible', async () => {
    const screen = await renderWithTheme(
      <TextField label="Password" value="secret" onChangeText={jest.fn()} secureTextEntry />,
    );

    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(true);
    fireEvent.press(screen.getByRole('button', { name: 'Show Password' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Hide Password' })).toBeTruthy();
    });
    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(false);
  });
});
