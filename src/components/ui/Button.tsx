import { css } from '@emotion/react';
import styled from '@emotion/styled';

export enum Shape {
  SQUARE = 'square',
  ROUND = 'round',
}

export enum Color {
  SECONDARY = '#44464A',
  PRIMARY = '#00ADB5',
}

export enum StyleType {
  FILLED = 'filled',
  OUTLINED = 'outlined',
  NONE = 'none',
  LINK = 'link',
}

export enum Size {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: Shape;
  color: Color;
  styleType: StyleType;
  size?: Size;
  text: string;
  width?: string;
  margin?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  shape = Shape.ROUND,
  color,
  styleType,
  size = Size.LARGE,
  text,
  width = '100%',
  margin,
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClick}
      shape={shape}
      color={color}
      styleType={styleType}
      size={size}
      width={width}
      margin={margin}
      {...rest}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  shape: Shape;
  color: Color;
  styleType: StyleType;
  size?: Size;
  width: string;
  margin?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width};
  ${({ margin }) => margin && `margin: ${margin};`};

  font-weight: bold;
  color: ${({ styleType, color }) =>
    styleType === StyleType.FILLED
      ? '#FFFFFF'
      : color === Color.SECONDARY
        ? '#242528'
        : color};
  ${({ styleType, color }) =>
    styleType === StyleType.LINK &&
    color === Color.SECONDARY &&
    'text-decoration: underline;'}

  border-radius: ${({ shape }) => (shape === Shape.SQUARE ? '6px' : '999px')};
  ${({ styleType, color }) =>
    styleType === StyleType.FILLED
      ? `background-color: ${color};`
      : styleType !== StyleType.LINK && 'background-color: #FFFFFF;'}
  ${({ styleType, color }) =>
    styleType === StyleType.OUTLINED &&
    `border: 1px solid ${color === Color.SECONDARY ? '#CED1D3' : color};`}

  ${({ size }) => {
    switch (size) {
      case Size.LARGE:
        return css`
          min-height: 52px;
          padding: 14px 16px;
          font-size: 18px;
          line-height: 24px;
        `;
      case Size.MEDIUM:
        return css`
          min-height: 48px;
          padding: 12px 16px;
          font-size: 16px;
          line-height: 24px;
        `;
      case Size.SMALL:
        return css`
          min-height: 35px;
          padding: 8px 14px;
          font-size: 14px;
          line-height: normal;
        `;
    }
  }};

  ${({ styleType }) =>
    styleType === StyleType.LINK &&
    `padding : 0; min-height : auto; display: inline-flex;`}

  :disabled {
    color: #bbc3cf;
    background-color: ${({ styleType }) =>
      styleType !== StyleType.LINK && '#EEF0F3'};
  }
`;
