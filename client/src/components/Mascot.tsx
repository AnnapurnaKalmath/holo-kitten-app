import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import baseState from "@assets/generated_images/cute_3d_holographic_kitten,_base_state.png";
import glitchState from "@assets/generated_images/holographic_kitten_glitching,_error_state.png";
import solidState from "@assets/generated_images/solid_gold_glowing_kitten,_success_state.png";
import annoyedState from "@assets/generated_images/annoyed_holographic_kitten,_reaction_state.png";

export type MascotState = "base" | "glitch" | "solid" | "annoyed" | "exhausted";

interface MascotProps {
  state: MascotState;
  className?: string;
}

export function Mascot({ state, className = "" }: MascotProps) {
  // Map states to images
  const getImage = (s: MascotState) => {
    switch (s) {
      case "glitch":
      case "exhausted": // Using glitch/wireframe for exhausted
        return glitchState;
      case "solid":
        return solidState;
      case "annoyed":
        return annoyedState;
      case "base":
      default:
        return baseState;
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full opacity-50 animate-pulse" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            filter: "blur(0px)",
            x: state === "glitch" ? [0, -5, 5, -5, 5, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          transition={{ 
            duration: 0.5,
            x: { duration: 0.2, repeat: state === "glitch" ? Infinity : 0 }
          }}
          className="relative z-10 w-full max-w-[300px] aspect-square"
        >
          <img 
            src={getImage(state)} 
            alt={`Mascot ${state}`}
            className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] ${state === 'glitch' ? 'animate-glitch' : 'animate-float'}`}
          />
          
          {/* Holographic Scanline Overlay on the mascot itself */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] mix-blend-overlay" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
