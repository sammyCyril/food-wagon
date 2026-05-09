"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import Link from "next/link";

import {loginSchema,LoginSchemaType,} from "@/components/lib/validations/auth";
import { useAuth } from "@/data/context/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const {register,handleSubmit,formState: { errors, isSubmitting },
} = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
  await new Promise((res) => setTimeout(res, 1200));

  login(data.email);

  toast.success("Login successful");
};

  return (
    <div className="w-full max-w-md">
      
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Login
        </h2>

        <p className="mt-2 text-gray-500">
          Enter your details to continue
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        
        {/* EMAIL */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* PASSWORD */}
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* OPTIONS */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* BUTTON */}
        <Button 
         type="submit"
          className="w-full"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* FOOTER */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        
        <Link
          href="/register"
          className="text-orange-500 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}