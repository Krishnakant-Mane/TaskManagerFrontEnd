import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const VITE_API_BASE = import.meta.env.VITE_API_BASE;

    const onSubmit = async (data) => {
        try {
            await axios.post(`${VITE_API_BASE}/api/users/signup`, data);
            toast.success('Account created successfully!');
            reset();
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating account');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-4 font-sans">
            <Toaster position="top-center" />

            <div className="bg-white w-full max-w-[420px] rounded shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                {/* Top header line */}
                <div className="h-16 border-b border-[#e5e7eb] w-full"></div>

                <div className="px-10 pt-6 pb-10">
                    <div className="text-center mb-10">
                        <h1 className="text-5xl text-[#232b38] mb-2" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                            Create an Account
                        </h1>
                        <p className="text-[10px] tracking-[0.2em] text-[#9ca3af] font-semibold uppercase">
                            Start your journal today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                        {/* Username Field */}
                        <div className="relative mb-6">
                            <label className="block text-[11px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                                Username
                            </label>

                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e5e7eb] absolute -left-5 top-2.5 -translate-y-1/2"></div>
                                <input
                                    type="text"
                                    placeholder="your_username"
                                    className="w-full border-b border-[#e5e7eb] pb-2 text-sm text-[#4b5563] focus:outline-none focus:border-[#9ca3af] transition-colors placeholder-[#d1d5db]"
                                    {...register("username", { required: "Username is required" })}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="relative mb-6">
                            <label className="block text-[11px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                                Email
                            </label>

                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e5e7eb] absolute -left-5 top-2.5 -translate-y-1/2"></div>

                                <input
                                    type="email"
                                    placeholder="abc@mail.com"
                                    className="w-full border-b border-[#e5e7eb] pb-2 text-sm text-[#4b5563] focus:outline-none focus:border-[#9ca3af] transition-colors placeholder-[#d1d5db]"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:
                                                "Invalid email address. Please follow pattern example: xyz@mail.com"
                                        }
                                    })}
                                />
                            </div>

                            {errors.email && (
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative mb-6">
                            <label className="block text-[11px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                                Password
                            </label>

                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e5e7eb] absolute -left-5 top-2.5 -translate-y-1/2"></div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full border-b border-[#e5e7eb] pb-2 text-sm text-[#4b5563] focus:outline-none focus:border-[#9ca3af] transition-colors placeholder-[#d1d5db] pr-8 tracking-widest"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                "Password must contain uppercase, lowercase, number and special character."
                                        }
                                    })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-0.5 text-[#9ca3af] hover:text-[#4b5563] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-2">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#232b38] hover:bg-[#1a202c] text-white py-3.5 rounded-[4px] text-sm font-medium transition-colors shadow-sm"
                            >
                                Sign Up
                            </button>
                        </div>

                    </form>

                    <div className="text-center mt-6">
                        <p className="text-[12px] text-[#9ca3af]">
                            Already have an account? <a href="/login" className="text-[#8b9cb0] hover:text-[#6b7c90] transition-colors">Login</a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-[#8b9cb0] opacity-80" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.5rem' }}>
                My Task Journal
            </div>
        </div>
    );
};

export default Signup;