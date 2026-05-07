type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  className?: string;        // ← Added for extra flexibility
};

const Button = ({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "" 
}: Props) => {
  
  const base = "px-6 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95";

  const styles = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
    secondary: "bg-white text-orange-600 hover:bg-orange-200",
    outline: "border border-black text-black hover:bg-gray-100",
  };

  return (
    <button 
      className={`${base} ${styles[variant]} ${className}`}
      onClick={onClick}
      
    >
      {children}
    </button>
  );
};

export default Button;