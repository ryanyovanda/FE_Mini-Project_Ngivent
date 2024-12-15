"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import LogoWhite from "/public/ngivent-logo.png"; // Import logo

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginPage: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result);
      if (!result?.ok) {
        router.push(`/login?error=${encodeURIComponent(result?.error || "unknown")}`);
        setError(result?.error || "An unexpected error occurred. Please try again.");
      } else if (result?.ok) {
        if (session?.user.roles.includes("ADMIN") || session?.user.roles.includes("ORGANIZER")) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ededed]">
      {/* Logo */}
      <div className="mb-6">
        <Image src={LogoWhite} alt="Logo" width={200} height={200} />
      </div>

      {/* Login Box */}
      <div className="w-[500px] h-fit flex flex-col gap-6 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-[#132620]">Login</h1>
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
            {isLoading ? "Loading..." : "Login"}
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </form>

        {/* Register Button */}
        <button
          onClick={() => router.push("/register")}
          className="p-3 rounded font-semibold bg-[#D6AD61] text-[#132620] hover:bg-[#f0c78c] transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
