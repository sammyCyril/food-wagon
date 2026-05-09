"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

import { Eye, EyeOff } from "lucide-react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="w-full">
        
        {/* LABEL */}
        {label && (
          <label className="block text-sm font-medium mb-2">
            {label}
          </label>
        )}

        {/* INPUT WRAPPER */}
        <div className="relative">
          
          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            {...props}
            className={`w-full border rounded-xl px-4 py-3 outline-none transition
              focus:ring-2 focus:ring-orange-500
              ${isPassword ? "pr-12" : ""}
              ${
                error
                  ? "border-red-500"
                  : "border-gray-300"
              }
            `}
          />

          {/* PASSWORD TOGGLE */}
          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;