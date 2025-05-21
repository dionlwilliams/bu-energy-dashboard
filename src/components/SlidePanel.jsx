import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const SlidePanel = ({ isOpen, onClose, headerContent, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3  }}
                className='fixed top-0 left-0 h-full w-100 bg-neutral-50 shadow-xl z-[1001] pointer-events-auto'
                >
                    <div className='h-full flex flex-col'>
                        <div className='flex justify-between items-center p-6'>
                            {headerContent}
                            <button
                                onClick={onClose}
                                className='p-1 hover:bg-gray-200 rounded-full'
                            >
                                <X className='w-6 h-6 text-gray-600' />
                            </button>
                        </div>
                        <hr className="border-gray-300"/>

                        <div className='flex-1 overflow-auto p-6'>
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SlidePanel