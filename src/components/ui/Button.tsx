import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "textary";
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  disabled,
  ...props
}: Props) => {

  const base =
  "inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400";

const styles = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",

  secondary:
    "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100",

  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-100",

    textary:
    " text-gray- hover:bg ",
};

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;

// type Props = {
//   children: React.ReactNode;
//   variant?: "primary" | "secondary" | "outline";
//   onClick?: () => void;
//   className?: string;        // ← Added for extra flexibility
// };

// const Button = ({ 
//   children, 
//   variant = "primary", 
//   onClick, 
//   className = "" 
// }: Props) => {
  
//   const base = "px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95";

//   const styles = {
//     primary: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
//     secondary: "bg-white text-orange-600 ",
//     outline: "border border-black text-black hover:bg-gray-100",
//   };

//   return (
//     <button 
//       className={`${base} ${styles[variant]} ${className}`}
//       onClick={onClick}
      
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;