"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import Link from "next/link";

import {
  registerSchema,
  RegisterSchemaType,
} from "@/components/lib/validations/auth";
import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
 ;
  const router = useRouter();
  const {register,handleSubmit,formState: { errors, isSubmitting },
} = useForm<RegisterSchemaType>({
  resolver: zodResolver(registerSchema),
});

  const onSubmit = async (
  data: RegisterSchemaType
) => {
  try {
    await registerUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
       data.city
    );

    toast.success(
      "Account created successfully"
    );

    router.push("/login");

  } catch (error: any) {

    toast.error(
      error.message
    );

  }
};

  return (
    <div className="w-full max-w-md">
      
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold">
          Register
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
       <Input
  label="First Name"
  placeholder="Enter your first name"
  {...register("firstName")}
  error={errors.firstName?.message}
/>

       <Input
  label="Last Name"
  placeholder="Enter your last name"
  {...register("lastName")}
  error={errors.lastName?.message}
/>
        {/* EMAIL */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
    
        <Input
  label="Phone Number"
  placeholder="Enter your phone number"
  {...register("phone")}
  error={errors.phone?.message}
/>

<Input
  label="City"
  placeholder="Enter your city"
  {...register("city")}
  error={errors.city?.message}
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
          {isSubmitting
  ? "Creating Account..."
  : "Create Account"}
        </Button>
      </form>
    </div>
  );
}