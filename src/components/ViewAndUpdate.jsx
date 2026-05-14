import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ViewAndUpdate = ({ isOpen, onClose, task, onUpdateSuccess }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title,
                description: task.content || task.description
            });
        }
    }, [task, reset]);

    if (!isOpen) return null;

    const VITE_API_BASE = import.meta.env.VITE_API_BASE;

    const onSubmit = async (data) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`${VITE_API_BASE}/api/notes/update-note/${task.task_id}`, {
                title: data.title,
                content: data.description
            }, {
                headers: { 'user-id': userId }
            });
            toast.success("Task updated successfully!");
            onUpdateSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update task.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#fefce8] w-full max-w-[500px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative rounded-sm">
                
                {/* Yellow Top Bar */}
                <div className="h-5 bg-[#fbbf24] w-full relative rounded-t-sm">
                    {/* Tape */}
                    <div className="absolute w-24 h-7 bg-white/40 backdrop-blur-md -top-2 left-1/2 -translate-x-1/2 rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.1)] flex items-center justify-center gap-3 z-10">
                        <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-black/20 rounded-full"></div>
                    </div>
                </div>

                {/* Notepad Content */}
                <div className="relative pb-10" style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(250, 204, 21, 0.4) 39px, rgba(250, 204, 21, 0.4) 40px)',
                    backgroundSize: '100% 40px',
                    minHeight: '480px',
                    backgroundPosition: '0 0'
                }}>
                    {/* Red vertical line */}
                    <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-red-300 z-0"></div>

                    {/* Close Button */}
                    <button type="button" onClick={onClose} className="absolute top-1 right-4 text-yellow-700 hover:text-yellow-900 transition-colors z-20 h-[40px] flex items-center justify-center">
                        <X size={22} />
                    </button>

                    <div className="pl-12 md:pl-16 pr-8 relative z-10 pt-[0px]">
                        <div className="text-yellow-600" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.2rem', lineHeight: '40px' }}>
                            Editing Entry...
                        </div>

                        <div className="h-[40px]"></div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <label className="text-gray-700" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.5rem', lineHeight: '40px' }}>
                                Task Title:
                            </label>
                            <input 
                                {...register("title", { required: true })}
                                className="bg-transparent border-none outline-none text-gray-900 w-full" 
                                style={{ fontFamily: '"Caveat", cursive', fontSize: '2.3rem', lineHeight: '40px', height: '40px' }} 
                            />

                            <div className="h-[40px]"></div>

                            <label className="text-gray-700" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.5rem', lineHeight: '40px' }}>
                                Description:
                            </label>
                            <textarea 
                                {...register("description")}
                                rows="5" 
                                className="bg-transparent border-none outline-none text-gray-700 w-full resize-none block" 
                                style={{ fontFamily: '"Caveat", cursive', fontSize: '1.25rem', lineHeight: '40px', paddingTop: '4px' }} 
                            ></textarea>

                            <div className="flex justify-end mt-[20px]">
                                <button type="submit" className="bg-[#232b38] text-white px-5 py-2.5 rounded-[4px] flex items-center gap-2 text-sm font-sans font-medium hover:bg-[#1a202c] shadow-md transition-colors">
                                    <Save size={16} /> Update Task Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAndUpdate;