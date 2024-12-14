"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "ORGANIZER"], {
    required_error: "Role is required",
  }),
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
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(data);
      // Replace this with your API request to register a user
      const response = await fetch("/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message || "Registration failed");
      }

      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      console.error("An unexpected error occurred:", error);
      setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="border border-gray-300 p-2 rounded text-black"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="border border-gray-300 p-2 rounded text-black"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="font-medium">
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className="border border-gray-300 p-2 rounded text-black"
            >
              <option value="">Select a role</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
            {errors.role && (
              <span className="text-red-500">{errors.role.message}</span>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
          {error && <span className="text-red-500">{error}</span>}
        </form>
        <button
          onClick={() => router.push("/login")}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
