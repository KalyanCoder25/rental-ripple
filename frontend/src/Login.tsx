import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // CHANGE: Matches the address used in Signup.tsx
  const apiBase = "http://localhost:8082";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Handle the response safely
      const text = await response.text();
      const user = text ? JSON.parse(text) : null;

      if (response.ok && user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert(`✅ Welcome back, ${user.username}!`);
        navigate("/dashboard");
      } else {
        alert("❌ Login Failed: Incorrect Email or Password (or user does not exist).");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Network Error. Ensure Backend is running on Port 8082.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      <div className="w-full max-w-sm rounded-2xl bg-gray-800/80 p-6 shadow-2xl backdrop-blur-sm border border-gray-700 mx-4">
        
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 mb-3">
            <LogIn className="h-7 w-7 text-purple-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-1 text-sm">Login to manage properties</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="block w-full rounded-lg bg-gray-700 py-2.5 px-4 text-white focus:ring-2 focus:ring-purple-500 transition sm:text-sm"
              placeholder="prof@college.edu"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="block w-full rounded-lg bg-gray-700 py-2.5 px-4 pr-12 text-white focus:ring-2 focus:ring-purple-500 transition sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 focus:ring-2 focus:ring-purple-500 transform transition hover:scale-[1.02]"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account? <a href="/signup" className="font-medium text-purple-400 hover:text-purple-300">Sign up</a>
        </div>
      </div>
    </div>
  );
}