import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // CHANGE MADE HERE: Switched from localhost to 127.0.0.1 to fix connection error
  const apiBase = "http://127.0.0.1:8082";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
          role: data.role === "owner" ? "LANDLORD" : "TENANT",
        }),
      });

      if (response.ok) {
        alert("✅ Account Created Successfully! You can now login.");
        window.location.reload();
      } else {
        alert("❌ Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error connecting to Backend. Is Port 8082 running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Main Background Container - Centered perfectly
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      
      {/* The Card Container - Reduced width (max-w-sm) and padding (p-6) */}
      <div className="w-full max-w-sm rounded-2xl bg-gray-800/80 p-6 shadow-2xl backdrop-blur-sm border border-gray-700">
        
        {/* Header Section - Tighter spacing */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 mb-3">
            <UserPlus className="h-7 w-7 text-purple-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Join Rental Ripple today</p>
        </div>

        {/* Form - Reduced vertical space between fields (space-y-5) */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field - Shorter inputs (py-2.5) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              className="block w-full rounded-lg border-transparent bg-gray-700 py-2.5 px-4 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:bg-gray-600 focus:ring-2 focus:ring-purple-500 transition duration-200 sm:text-sm"
              placeholder="Professor Test"
            />
            {errors.name && (
              <span className="text-red-400 text-xs mt-1 block">
                Name is required
              </span>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="block w-full rounded-lg border-transparent bg-gray-700 py-2.5 px-4 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:bg-gray-600 focus:ring-2 focus:ring-purple-500 transition duration-200 sm:text-sm"
              placeholder="prof@college.edu"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              I am a...
            </label>
            <select
              {...register("role")}
              className="block w-full rounded-lg border-transparent bg-gray-700 py-2.5 px-4 text-white shadow-sm focus:border-purple-500 focus:bg-gray-600 focus:ring-2 focus:ring-purple-500 transition duration-200 appearance-none sm:text-sm"
              style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`}}
            >
              <option value="user">Tenant</option>
              <option value="owner">Property Owner</option>
            </select>
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="block w-full rounded-lg border-transparent bg-gray-700 py-2.5 px-4 pr-12 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:bg-gray-600 focus:ring-2 focus:ring-purple-500 transition duration-200 sm:text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-400 text-xs mt-1 block">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          {/* Submit Button - Compact padding */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800 transform transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Creating...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        
        {/* Login Link Footer */}
        <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-purple-400 hover:text-purple-300 transition">
          Log in
            </a>
        </div>
      </div>
    </div>
  );
}