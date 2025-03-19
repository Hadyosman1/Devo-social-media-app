"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLargeFill } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  bg?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  title,
  className,
  bg = "transparent",
  size = "md",
  children,
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const Modal = isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
      onClick={onClose}
      className={`${isOpen ? "show" : "hide"} modal_wrapper`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-${bg} ${size === "sm" ? "max-w-sm" : size === "md" ? "md:max-w-xl" : "md:max-w-2xl"} flex max-h-[85%] max-w-full flex-grow flex-col rounded`}
      >
        <div
          className={`${title && "border-b-2 border-slate-300"} ${bg !== "transparent" && "px-2"} flex items-center py-2`}
        >
          {title && (
            <h2 className="flex-grow text-center text-lg font-semibold capitalize text-slate-600">
              {title}
            </h2>
          )}

          <button
            tabIndex={-1}
            autoFocus={isOpen}
            title="close"
            className={`${bg === "transparent" ? "bg-gray-400 text-white hover:bg-gray-500" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} ms-auto rounded p-1 text-xl`}
            onClick={onClose}
          >
            <RiCloseLargeFill />
          </button>
        </div>

        <div className="max-h-full overflow-y-auto">{children}</div>
      </div>
    </motion.div>
  );

  return createPortal(
    <AnimatePresence mode="wait">{Modal}</AnimatePresence>,
    document.getElementById("modal-container") || document.body,
  );
};

export default ModalWrapper;
