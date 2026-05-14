import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const VITE_API_BASE = import.meta.env.VITE_API_BASE;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${VITE_API_BASE}/api/users/login`, data);
            toast.success('Login Successful');
            localStorage.setItem('userId', response.data.userId);
            reset();
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-4 font-sans">
            <Toaster position="top-center" />

            <div className="mb-6 text-center text-[#232b38]" style={{ fontFamily: '"Caveat", cursive', fontSize: '2.5rem', fontWeight: 700 }}>
                My Task Journal
            </div>

            <div className="bg-white w-full max-w-[420px] rounded shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                {/* Top header line - using a subtle pink/red tint to match the screenshot precisely if intended, otherwise falling back to standard border */}
                <div className="h-14 border-b border-red-100 w-full"></div>

                <div className="px-10 pt-6 pb-10">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl text-[#4b5563] mb-2" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                            Welcome Back
                        </h1>
                        <p className="text-[12px] text-[#9ca3af]">
                            Pick up where you left off
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">

                        {/* Email Field */}
                        <div className="relative mb-6">
                            <label className="block text-[11px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                                Email
                            </label>

                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e5e7eb] absolute -left-5 top-2.5 -translate-y-1/2"></div>

                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full border-b border-[#e5e7eb] pb-2 text-sm text-[#4b5563] focus:outline-none focus:border-[#9ca3af] transition-colors placeholder-[#d1d5db]"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address. Please follow pattern example: xyz@mail.com"
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
                                        required: "Password is required"
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
                                className="w-full bg-[#232b38] hover:bg-[#1a202c] text-white py-3.5 rounded-[4px] text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                                Login <ArrowRight size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                    </form>

                </div>
            </div>

            <div className="mt-8 text-center text-[12px] text-[#9ca3af]">
                New here? <a href="/signup" className="text-[#4b5563] font-bold hover:text-[#232b38] transition-colors">Create an account</a>
            </div>
        </div>
    );
};

export default Login;