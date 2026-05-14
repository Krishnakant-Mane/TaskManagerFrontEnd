import React, { useState, useEffect } from 'react';
import { Search, AlignLeft, Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ViewAndUpdate from '../components/ViewAndUpdate';
import WarningNote from '../components/WarningNote';

const Dashboard = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [tasks, setTasks] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // New task form state
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const VITE_API_BASE = import.meta.env.VITE_API_BASE;

    const themes = [
        { bg: "bg-[#fffbeb]", border: "border-[#fcd34d]", meta: "text-[#d97706]", boxShadow: "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]" },
        { bg: "bg-white", border: "border-[#e5e7eb]", meta: "text-[#9ca3af]", boxShadow: "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]" },
        { bg: "bg-[#eff6ff]", border: "border-[#93c5fd]", meta: "text-[#60a5fa]", boxShadow: "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]" }
    ];

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${VITE_API_BASE}/api/notes/get-notes`, {
                headers: { 'user-id': userId }
            });
            setTasks(response.data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [userId, navigate]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Please provide both title and description.");
            return;
        }

        try {
            await axios.post(`${VITE_API_BASE}/api/notes/create-note`,
                { title, content },
                { headers: { 'user-id': userId } }
            );
            toast.success("Note added successfully!");
            setTitle('');
            setContent('');
            fetchTasks();
        } catch (error) {
            toast.error("Failed to add task.");
        }
    };

    const handleDeleteClick = (taskId) => {
        setTaskToDelete(taskId);
        setIsWarningModalOpen(true);
    };

    const confirmDeleteTask = async () => {
        if (!taskToDelete) return;
        try {
            await axios.delete(`${VITE_API_BASE}/api/notes/delete-note/${taskToDelete}`, {
                headers: { 'user-id': userId }
            });
            toast.success("Task deleted!");
            setIsWarningModalOpen(false);
            setTaskToDelete(null);
            fetchTasks();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete task.");
        }
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsUpdateModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const newEntryForm = (
        <form onSubmit={handleCreateTask} className="bg-white rounded shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col shrink-0 h-fit">
            <div className="px-6 py-5 flex items-center gap-3 border-b border-[#e5e7eb] shrink-0">
                <AlignLeft size={20} className="text-[#9ca3af]" />
                <h2 className="text-2xl text-[#4b5563]" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                    New Entry
                </h2>
            </div>
            <div className="p-6">
                <div className="mb-6">
                    <label className="block text-[10px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                        Task Title
                    </label>
                    <input
                        type="text"
                        placeholder="What's on your mind?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-b border-[#e5e7eb] pb-2 focus:outline-none text-[#4b5563] placeholder-[#d1d5db] bg-transparent"
                        style={{ fontFamily: '"Caveat", cursive', fontSize: '1.3rem' }}
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-[10px] font-bold text-[#9ca3af] tracking-wider mb-2 uppercase">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Write down the details..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full focus:outline-none text-sm text-[#4b5563] placeholder-[#d1d5db] resize-none block bg-transparent"
                        style={{
                            lineHeight: '30px',
                            backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, #e5e7eb 29px, #e5e7eb 30px)',
                            backgroundAttachment: 'local',
                            paddingTop: '6px'
                        }}
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-[#232b38] hover:bg-[#1a202c] text-white py-3.5 rounded-[4px] text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0">
                    <Plus size={16} /> Add to List
                </button>
            </div>
        </form>
    );

    return (
        <div className="h-screen overflow-hidden bg-[#fafaf9] p-4 md:p-8 font-sans flex flex-col items-center">
            <Toaster position="top-center" />
            
            {/* Header */}
            <div className="relative w-full max-w-[1000px] text-center mb-6 mt-2 shrink-0">
                <button 
                    onClick={handleLogout}
                    className="absolute left-0 top-2 flex items-center lg:border lg:px-10 lg:py-2 gap-2 text-red-500 lg:text-white lg:bg-red-500 hover:bg-red-700 hover:text-white transition-colors"
                    title="Logout"
                >
                    <LogOut size={22} />
                    <span className="text-sm font-medium hidden sm:block">Logout</span>
                </button>

                <h1 className="text-5xl text-[#232b38] mb-2" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                    My Task Journal
                </h1>
                <p className="text-[#9ca3af] italic text-[13px]">
                    Notes, thoughts, and things to get done.
                </p>
            </div>

            <div className="max-w-[1000px] w-full flex flex-col md:flex-row gap-6 md:gap-8 pb-2 flex-1 min-h-0 overflow-y-auto md:overflow-hidden">

                {/* Left Column */}
                <div className="w-full md:w-[35%] flex flex-col gap-6 shrink-0 h-fit md:h-full">
                    {/* Search */}
                    <div className="bg-white p-3 px-5 rounded shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex items-center gap-3 shrink-0">
                        <Search size={18} className="text-[#9ca3af]" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full focus:outline-none text-[#4b5563] placeholder-[#d1d5db] bg-transparent"
                            style={{ fontFamily: '"Caveat", cursive', fontSize: '1.2rem' }}
                        />
                    </div>

                    {/* Desktop New Entry (Hidden on mobile) */}
                    <div className="hidden md:flex flex-col gap-6 flex-1 min-h-0">
                        {newEntryForm}
                    </div>
                </div>

                {/* Right Column (Daily Log) */}
                <div className="w-full md:w-[65%] bg-white rounded shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] relative p-6 md:p-10 flex flex-col flex-1 min-h-[350px] md:min-h-0">
                    {/* Red notebook line */}
                    <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-red-200"></div>

                    {/* Content wrapper with left margin to clear the red line */}
                    <div className="pl-6 md:pl-10 relative z-10 flex flex-col flex-1 min-h-0">
                        <div className="flex justify-between items-baseline pb-4 mb-6 md:mb-8 shrink-0 border-b border-[#f3f4f6]">
                            <h2 className="text-3xl md:text-4xl text-[#4b5563]" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                                Daily Log
                            </h2>
                            <span className="text-[#8b9cb0]" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.2rem' }}>
                                {filteredTasks.length} items remaining
                            </span>
                        </div>

                        <div className="space-y-5 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-12 pr-2">
                            {filteredTasks.length === 0 && (
                                <p className="text-[#9ca3af] text-center mt-10" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.5rem' }}>
                                    No tasks found.
                                </p>
                            )}
                            {filteredTasks.map((task, index) => {
                                const theme = themes[index % themes.length];
                                return (
                                    <div key={task.task_id} className={`p-5 rounded relative border-l-[4px] ${theme.bg} ${theme.border} ${theme.boxShadow || ''}`}>
                                        <div className="mb-1 pr-12">
                                            <span className={`text-[10px] font-bold tracking-wider uppercase ${theme.meta}`}>
                                                CREATED: {new Date(task.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <div className="absolute right-4 top-4 flex flex-col gap-3 text-[#9ca3af]">
                                            <button onClick={() => handleEditClick(task)} className="hover:text-[#4b5563] transition-colors"><Pencil size={14} /></button>
                                            <button onClick={() => handleDeleteClick(task.task_id)} className="hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                        </div>

                                        <h3 className="text-2xl text-[#232b38] mb-1.5 pr-8" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                                            {task.title}
                                        </h3>
                                        <p className="text-[13px] text-[#6b7280] leading-relaxed pr-8 whitespace-pre-wrap mb-1">
                                            {task.content}
                                        </p>
                                        <div className={`text-right mt-2 text-[15px] ${theme.meta}`} style={{ fontFamily: '"Caveat", cursive' }}>
                                            Updated: {new Date(task.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Page Number Watermark */}
                    <div className="absolute bottom-4 right-6 md:bottom-6 md:right-8 text-[#f3f4f6] text-5xl md:text-6xl select-none pointer-events-none" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700 }}>
                        Page 01
                    </div>
                </div>

                {/* Mobile Bottom Elements (Hidden on Desktop) */}
                <div className="flex md:hidden flex-col gap-6 shrink-0 w-full pb-6 mt-2">
                    {newEntryForm}
                </div>

            </div>

            <ViewAndUpdate
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                task={selectedTask}
                onUpdateSuccess={fetchTasks}
            />

            <WarningNote 
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                onConfirm={confirmDeleteTask}
            />
        </div>
    );
};

export default Dashboard;