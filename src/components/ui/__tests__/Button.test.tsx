import { fireEvent } from '@testing-library/react-native';

import { Button } from '@/components/ui/Button';
import { renderWithTheme } from '@/test/render';

describe('Button', () => {
  it('calls onPress when the label is pressed', async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(<Button label="Continue" onPress={onPress} />);

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress while loading', async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(<Button label="Continue" loading onPress={onPress} />);

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const screen = await renderWithTheme(<Button label="Continue" disabled onPress={onPress} />);

    fireEvent.press(screen.getByRole('button', { name: 'Continue' }));

    expect(onPress).not.toHaveBeenCalled();
  });
});
