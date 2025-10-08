import { FaArrowRightLong } from "react-icons/fa6";

import { useState } from "react";
import { useNavigate } from "react-router";

import { useLogin } from "@/hooks/useAuth";
import AuthMediaSection from "@/components/UI/AuthMediaSection";
import { FormField } from "@/components/UI/FormField";
import { isValidEmail } from "@/lib/helpers";

export default function LoginPage() {
  const loginMutation = useLogin();
  const [identifier, SetIdentifier] = useState<string>("");
  const [password, SetPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    identifier?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!identifier.trim()) {
      newErrors.identifier = "Email or username is required.";
    } else {
      if (!isValidEmail(identifier)) {
        newErrors.identifier = "Enter a valid email or username.";
      }
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = isValidEmail(identifier)
      ? { email: identifier, password }
      : { username: identifier, password };

    setErrors({});
    loginMutation.mutate(payload, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-20">
        <div className="mb-6 mt-12 text-center bg-blue-50 border border-blue-300 rounded-xl p-6 shadow-md w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Admin Credentials
          </h2>
          <p className="text-3xl text-gray-800">
            <span className="font-bold">Email:</span> admin@byway.com
          </p>
          <p className="text-3xl text-gray-800">
            <span className="font-bold">Password:</span> Admin@123
          </p>
        </div>

        <div className="w-full max-w-xl">
          <form className="space-y-8">
            <FormField error={errors.identifier} label="Email">
              <input
                onChange={(e) => SetIdentifier(e.target.value)}
                placeholder="Username or Email ID"
                type="email"
                className="w-full px-5 py-4 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </FormField>

            <FormField error={errors.password} label="Password">
              <input
                onChange={(e) => SetPassword(e.target.value)}
                placeholder="Enter Password"
                type="password"
                className="w-full px-5 py-4 text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </FormField>

            <button
              type="submit"
              onClick={handleSubmit}
              className="primary-black-button w-full py-4 text-xl flex items-center justify-center gap-2"
            >
              Log In
              <FaArrowRightLong />
            </button>
          </form>

          <div className="flex items-center my-10">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-lg">Sign in with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <AuthMediaSection />
        </div>
      </div>

      <div className="w-[40%] h-full relative overflow-hidden">
        <img
          src="./login_illustration.jpg"
          alt="Login illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
