import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

const WarningNote = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
                className="bg-white w-full max-w-[420px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative -rotate-1"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #f3f4f6 39px, #f3f4f6 40px)',
                    backgroundSize: '100% 40px',
                    backgroundPosition: '0 0',
                    borderLeft: '4px solid #dc2626'
                }}
            >
                <div className="p-8 pb-6 md:p-10 md:pb-8 pt-6 md:pt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="text-red-600" size={26} />
                        <h2 className="text-[2rem] text-gray-800" style={{ fontFamily: '"Caveat", cursive', fontWeight: 700, lineHeight: 1 }}>
                            Delete Task?
                        </h2>
                    </div>
                    
                    <p className="text-gray-600 text-[15px] mb-8 leading-relaxed font-sans pl-1">
                        Are you sure you want to delete this task? <br />
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end items-center gap-6">
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-[15px] font-medium transition-colors font-sans"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onConfirm}
                            className="bg-[#b91c1c] text-white px-5 py-2.5 rounded-[4px] flex items-center gap-2 text-[15px] font-medium hover:bg-red-800 shadow-md transition-colors font-sans"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarningNote;
