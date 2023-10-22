import { ComponentProps, FC, HTMLAttributes, forwardRef } from "react";

import { classNames } from "@utils/tailwindcss";

type sizes = "small" | "medium" | "large";
type colors = "black" | "rose" | "noColor";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
  color?: colors;
  size?: sizes;
  rounded?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  flex?: boolean;
  icon?: ComponentProps<"svg">;
  disabled?: boolean;
  onClick?: () => void;
};

const buttonConfig = {
  // color types
  black: {
    bgColor: "bg-gray-900",
    color: "text-white",
    outline: "shadow-sm hover:bg-rose-500 focus:outline-none",
  },
  rose: {
    bgColor: "bg-rose-500",
    color: "text-white",
    outline: "shadow-sm hover:bg-gray-700 focus:outline-none",
  },
  noColor: {
    bgColor: "",
    color: "text-gray-700",
    outline: "hover:bg-gray-500 hover:text-gray-100",
  },

  // size types
  small: "px-2.5 py-1.5 text-xs font-normal",
  medium: "px-4 py-2 text-sm font-medium",
  large: "px-6 py-3 text-base font-medium",

  // flex
  flex: "flex w-full",
};

const Button: FC<ButtonProps> = (props) => {
  const {
    label,
    color = "black",
    size = "small",
    rounded = true,
    className,
    type = "button",
    flex = false,
    icon,
    disabled,
    onClick = () => {},
  } = props;

  return (
    <button
      type={type}
      className={classNames(
        `h-full
        justify-center
        inline-flex items-center
        ${rounded && "rounded-lg"}
        ${buttonConfig[color].bgColor}
        ${buttonConfig[color].color}
        ${buttonConfig[color].outline}
        ${buttonConfig[size]}
        ${flex && buttonConfig.flex}
        ${disabled && "opacity-50"}`,
        className === undefined ? "" : className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <>
        {!!icon && icon}
        {!!label && label}
      </>
    </button>
  );
};

export default Button;
