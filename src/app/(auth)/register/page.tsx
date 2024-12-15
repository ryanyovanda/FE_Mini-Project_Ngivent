"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    pin: z.string().regex(/^\d{4}$/, "PIN must be exactly 4 digits"),
    referralCode: z.string().optional().nullable().or(z.literal("")), // Allows empty value
    role: z.enum(["USER", "ORGANIZER"]), // No additional parameters
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;

const RegisterPage: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      referralCode: "", // Ensure referralCode has a default empty value
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);

    // Remove referralCode if it is empty
    const payload = { ...data };
    if (!payload.referralCode) {
      delete payload.referralCode;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "An unexpected error occurred");
      }

      router.push("/login");
    } catch (error: unknown) {
      console.error("An error occurred:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#ededed]">
      <div className="w-[500px] h-fit flex flex-col gap-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#132620]">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-[#132620]">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium text-[#132620]">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="font-medium text-[#132620]">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* PIN Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pin" className="font-medium text-[#132620]">
              PIN
            </label>
            <input
              id="pin"
              type="text"
              {...register("pin")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
              placeholder="4-digit PIN"
            />
            {errors.pin && (
              <span className="text-red-500 text-sm">{errors.pin.message}</span>
            )}
          </div>

          {/* Referral Code Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="referralCode" className="font-medium text-[#132620]">
              Referral Code (Optional)
            </label>
            <input
              id="referralCode"
              type="text"
              {...register("referralCode")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
              placeholder="5-digit Alphanumeric Code"
            />
          </div>

          {/* Role Select */}
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium text-[#132620]">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#D6AD61]"
            >
              <option value="USER">USER</option>
              <option value="ORGANIZER">ORGANIZER</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">{errors.role.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className={`p-3 rounded text-white font-semibold transition ${
              isLoading
                ? "bg-[#D6AD61] cursor-not-allowed"
                : "bg-[#132620] hover:bg-opacity-90"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </form>

        {/* Login Redirect Button */}
        <button
          onClick={() => router.push("/login")}
          className="p-3 rounded font-semibold text-[#132620] hover:underline transition bg-transparent"
        >
          Already have an account? Click here
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;