import React, { forwardRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'default' | 'outlined';

interface AppButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, ViewStyle> = {
  default: {
    backgroundColor: 'rgb(226, 109, 57)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgb(226, 109, 57)',
  },
};

const Button = forwardRef<typeof TouchableOpacity, AppButtonProps>(
  (
    {
      variant = 'default',
      style,
      textStyle,
      onPress,
      children,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const variantStyle = variants[variant] || variants.default;

    return (
      <TouchableOpacity
        // ref={ref}
        style={[
          styles.button,
          variantStyle,
          style,
          disabled && styles.disabled,
        ]}
        onPress={!disabled ? onPress : undefined}
        activeOpacity={0.8}
        {...rest}
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;
