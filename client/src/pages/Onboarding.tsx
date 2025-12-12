import { useState, useEffect } from "react";
import { Mascot, MascotState } from "@/components/Mascot";
import { TypewriterText } from "@/components/TypewriterText";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, X, Smartphone, Camera, Gamepad, Award, DollarSign } from "lucide-react";

// --- Game Constants & Types ---

type GamePhase = 
  | "CONTRACT"
  | "USAGE_GAP"
  | "CAREER_LEVERAGE"
  | "LEVEL_1_SETUP"
  | "LEVEL_1_REACTION"
  | "LEVEL_1_CONSEQUENCE"
  | "LEVEL_1_FINAL"
  | "LEVEL_1_PHONE_SETUP"
  | "LEVEL_1_PHONE_REACTION"
  | "LEVEL_1_PHONE_CONSEQUENCE"
  | "LEVEL_1_PHONE_FINAL"
  | "LEVEL_1_COMPLETE";

interface GameState {
  phase: GamePhase;
  mascotState: MascotState;
  dialogue: string;
  dialogueKey: number; // Force re-render of typewriter
  selectedOptions: string[];
}

// --- Main Page Component ---

export default function Onboarding() {
  const [state, setState] = useState<GameState>({
    phase: "CONTRACT",
    mascotState: "base",
    dialogue: "First came Typing. Then Googling. Now, AI.",
    dialogueKey: 0,
    selectedOptions: [],
  });

  // Helper to update state with animation delays if needed
  const updateState = (updates: Partial<GameState>) => {
    setState(prev => ({ ...prev, ...updates, dialogueKey: prev.dialogueKey + 1 }));
  };

  // --- Sequence Logic ---

  const handleContractStart = () => {
    updateState({
      dialogue: "It’s not just a tech trend. It’s the new basic life skill. The question isn’t if you use it. It’s whether you let it do the bare minimum… or your best work.",
    });
  };

  const advanceToUsageGap = () => {
    updateState({
      phase: "USAGE_GAP",
      mascotState: "base",
      dialogue: "You have a supercomputer available 24/7. Be honest — how much of its actual potential are you using?",
    });
  };

  const handleUsageGapSelection = (option: string) => {
    let reaction = "";
    let mascotReaction: MascotState = "base";

    if (option === "10%") {
      reaction = "You’re driving a Ferrari like a golf cart. Let’s fix that.";
      mascotReaction = "glitch";
    } else if (option === "50%") {
      reaction = "Perfect. You already know there’s more power under the hood.";
      mascotReaction = "solid";
    } else {
      reaction = "Curiosity beats confidence. You’re in the right place.";
      mascotReaction = "base";
    }

    updateState({
      dialogue: reaction,
      mascotState: mascotReaction,
    });

    // Auto advance after reading
    setTimeout(() => {
      advanceToCareerLeverage();
    }, 4000);
  };

  const advanceToCareerLeverage = () => {
    updateState({
      phase: "CAREER_LEVERAGE",
      mascotState: "base",
      dialogue: "We’re going to fix that. We’re not just learning prompts. We’re upgrading you. What’s the #1 thing you want this skill to do for your life?",
    });
  };

  const handleCareerSelection = (option: string) => {
    let reaction = "";
    if (option === "Competence") reaction = "Good. We’ll make complexity feel simple.";
    if (option === "Freedom") reaction = "Respect. Time is the real currency.";
    if (option === "Security") reaction = "Smart. Un-fireable is the new promoted.";
    if (option === "Creativity") reaction = "Dangerous. In a good way. Let’s build.";

    updateState({
      dialogue: reaction,
      mascotState: "solid",
    });
    
    // Show start button logic handled in render
  };

  const startLevel1 = () => {
    updateState({
      phase: "LEVEL_1_SETUP",
      mascotState: "base",
      dialogue: "So... is this a good prompt?",
    });
  };

  const handleLevel1Setup = (isGood: boolean) => {
    if (isGood) {
      updateState({
        phase: "LEVEL_1_REACTION",
        mascotState: "glitch",
        dialogue: "Oh, it is? You're sure about that? Let's verify your optimism.",
      });
    } else {
      updateState({
        phase: "LEVEL_1_REACTION",
        mascotState: "base",
        dialogue: "Smart. You smell a trap. Let's see if you're right.",
      });
    }

    setTimeout(() => {
      updateState({
        phase: "LEVEL_1_CONSEQUENCE",
        mascotState: "base",
        dialogue: "What do they mean? Pick one.",
        selectedOptions: [],
      });
    }, 3000);
  };

  const handleConsequenceSelection = (option: string) => {
    const newSelected = [...state.selectedOptions, option];
    let reaction = "";
    let mascotReaction: MascotState = "annoyed";

    if (option === "Animal") {
      reaction = "What?! I’m trying to teach my kid about jungle animals! Why did you show me a CAR before?! Dumb AI!";
      mascotReaction = "annoyed";
    } else if (option === "Car") {
      reaction = "I said ‘Jaguar.’ Not ‘vroom vroom machine.’ My kid is doing a report on wildlife! Not luxury vehicles!";
      mascotReaction = "annoyed";
    } else if (option === "Guitar") {
      reaction = "A GUITAR?! Why would I ever ask for a GUITAR?! I’m teaching about ANIMALS or maybe CARS but NOT ROCK CONCERTS!";
      mascotReaction = "glitch";
    }

    updateState({
      dialogue: reaction,
      mascotState: mascotReaction,
      selectedOptions: newSelected,
    });

    if (newSelected.length === 3) {
      setTimeout(() => {
        updateState({
          phase: "LEVEL_1_FINAL",
          mascotState: "exhausted",
          dialogue: "NOW you understand my pain. One word. Three interpretations. Zero clarity. And YOU were calling me dumb?",
        });
      }, 4000);
    }
  };

  const advanceToPhoneScenario = () => {
    updateState({
      phase: "LEVEL_1_PHONE_SETUP",
      mascotState: "exhausted", // Spec says "Cat holding a cracked old phone" - using exhausted/glitch for now
      dialogue: "So... is this a good prompt?",
    });
  };

  const handlePhoneSetup = (isGood: boolean) => {
    if (isGood) {
      updateState({
        phase: "LEVEL_1_PHONE_REACTION",
        mascotState: "glitch",
        dialogue: "Oh you sweet summer child. You think AI magically knows your budget, needs, preferences, AND soul. Let’s test that optimism.",
      });
    } else {
      updateState({
        phase: "LEVEL_1_PHONE_REACTION",
        mascotState: "base",
        dialogue: "Correct. We need more data than ‘buy phone.’ Even horoscopes are more specific.",
      });
    }

    setTimeout(() => {
      updateState({
        phase: "LEVEL_1_PHONE_CONSEQUENCE",
        mascotState: "base",
        dialogue: "What does the AI THINK you mean? Pick one.",
        selectedOptions: [],
      });
    }, 4000);
  };

  const handlePhoneConsequenceSelection = (option: string) => {
    const newSelected = [...state.selectedOptions, option];
    let reaction = "";
    let mascotReaction: MascotState = "annoyed";

    if (option === "Flagship") {
      reaction = "₹80,000?! Do I LOOK like Ambani’s forgotten nephew?! My budget is ₹30,000 MAX. AI just assumes I'm out here swimming in generational wealth??";
      mascotReaction = "glitch"; // Clutching wallet
    } else if (option === "Camera") {
      reaction = "108 megapixels?! Why would I need THAT? I’m not a photographer — I barely take any photos. AI just assumes everyone wants to shoot documentaries!";
      mascotReaction = "annoyed"; // Squinting
    } else if (option === "Gaming") {
      reaction = "A gaming phone?! Yes — that’s what I need! But NOT this ₹60,000 monster! AI, my budget is ₹20,000! I want PUBG, not a NASA supercomputer.";
      mascotReaction = "exhausted"; // Overwhelmed
    }

    updateState({
      dialogue: reaction,
      mascotState: mascotReaction,
      selectedOptions: newSelected,
    });

    if (newSelected.length === 3) {
      setTimeout(() => {
        updateState({
          phase: "LEVEL_1_PHONE_FINAL",
          mascotState: "exhausted", // Falls into shopping cart
          dialogue: "NOW do you see the chaos? Say ‘Which phone should I buy?’ and the AI invents a new identity for you EVERY TIME. Rich version. Photographer version. Gamer version. Meanwhile YOU just need WhatsApp and decent battery.",
        });
      }, 5000);
    }
  };

  const finishLevel1 = () => {
    updateState({
      phase: "LEVEL_1_COMPLETE",
      mascotState: "solid", // Proud
      dialogue: "Well… you didn’t break the universe. And more importantly — you finally saw how AI thinks.",
    });

    setTimeout(() => {
        updateState({
            dialogue: "Level 2 is where you actually learn to control me. Not with magic… with structure. If you dare.",
        });
    }, 4000);
  };

  const handleCuriousClick = async () => {
    // Frontend logic for the CTA
    try {
        await fetch('/api/cta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clicked: true, timestamp: new Date() })
        });
    } catch (e) {
        console.log("Backend not available in mockup mode");
    }
    alert("Tracking event sent! (Mockup)");
  };

  // --- Render Helpers ---

  return (
    <div className="min-h-screen bg-background text-foreground font-rajdhani relative overflow-hidden flex flex-col">
      {/* Background Scanlines */}
      <div className="scanlines z-0" />

      {/* Grid Layout */}
      <div className="relative z-10 container mx-auto h-screen p-4 grid grid-rows-[auto_1fr_auto] gap-4">
        
        {/* HEADER: Zone 1 (Mascot) & Zone 1b (Dialogue) */}
        <div className="flex flex-col md:flex-row gap-4 items-start min-h-[200px]">
          {/* Zone 1: Mascot */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
             <Mascot state={state.mascotState} className="w-48 h-48 md:w-64 md:h-64" />
          </div>

          {/* Zone 1b: Dialogue */}
          <div className="flex-1 mt-4 md:mt-12 bg-card/50 border border-primary/30 p-6 rounded-xl backdrop-blur-md relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse" />
            <h2 className="text-primary font-orbitron text-sm mb-2 tracking-widest uppercase opacity-70">System Message_</h2>
            <TypewriterText 
              key={state.dialogueKey}
              text={state.dialogue} 
              className="text-xl md:text-2xl font-medium leading-relaxed text-shadow"
            />
          </div>
        </div>

        {/* BODY: Zone 2 (Stage) */}
        <div className="flex-1 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            
            {/* CONTRACT PHASE */}
            {state.phase === "CONTRACT" && (
              <motion.div 
                key="contract"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-2xl"
              >
                <Card className="bg-black/40 border-primary/50 p-8 backdrop-blur-lg border-glow">
                  <h1 className="text-3xl md:text-4xl font-orbitron text-center mb-8 text-glow">
                    Ready to use AI for your best work?
                  </h1>
                  <div className="flex justify-center">
                    <Button 
                      onClick={state.dialogue.includes("best work") ? advanceToUsageGap : handleContractStart}
                      size="lg"
                      className="bg-primary text-black hover:bg-primary/80 font-orbitron text-lg px-8 py-6 rounded-none border border-primary relative overflow-hidden group"
                    >
                      <span className="relative z-10">I want to do my best work.</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* USAGE GAP PHASE */}
            {state.phase === "USAGE_GAP" && (
              <motion.div 
                key="usage"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="grid gap-4 w-full max-w-lg"
              >
                {[
                  { label: "10% — I just use it for basic chores.", val: "10%" },
                  { label: "50% — I use it, but I know I’m missing out.", val: "50%" },
                  { label: "I don’t know what 100% looks like yet.", val: "Unsure" }
                ].map((opt) => (
                  <Button
                    key={opt.val}
                    variant="outline"
                    className="w-full justify-start text-left p-6 text-lg border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                    onClick={() => handleUsageGapSelection(opt.val)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </motion.div>
            )}

            {/* CAREER LEVERAGE PHASE */}
            {state.phase === "CAREER_LEVERAGE" && (
              <motion.div 
                key="career"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 w-full max-w-2xl"
              >
                {[
                  { label: "Solve harder problems at work.", val: "Competence" },
                  { label: "Speed up my workflow -> Free time.", val: "Freedom" },
                  { label: "Build a portfolio that makes me un-fireable.", val: "Security" },
                  { label: "Turn my raw ideas into real products.", val: "Creativity" }
                ].map((opt) => (
                  <Button
                    key={opt.val}
                    variant="outline"
                    className="w-full justify-between p-6 text-lg border-white/10 hover:border-secondary hover:bg-secondary/10 transition-all duration-300 group"
                    onClick={() => handleCareerSelection(opt.val)}
                  >
                    {opt.label}
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  </Button>
                ))}

                {state.mascotState === "solid" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-center"
                  >
                    <Button 
                      onClick={startLevel1}
                      className="bg-secondary text-white hover:bg-secondary/80 font-orbitron text-xl px-12 py-6 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                    >
                      Start Level 1
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* LEVEL 1: JAGUAR SETUP */}
            {(state.phase === "LEVEL_1_SETUP" || state.phase === "LEVEL_1_REACTION") && (
              <motion.div 
                key="level1_setup"
                className="text-center w-full max-w-xl"
              >
                <Card className="bg-black border-2 border-white/20 p-12 mb-8 rotate-1">
                  <h3 className="text-4xl font-mono text-white mb-2">"Show me a Jaguar"</h3>
                </Card>
                
                {state.phase === "LEVEL_1_SETUP" && (
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => handleLevel1Setup(true)}
                      className="bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black w-32 h-16 text-xl"
                    >
                      <Check className="mr-2" /> YES
                    </Button>
                    <Button 
                      onClick={() => handleLevel1Setup(false)}
                      className="bg-red-500/20 text-red-400 border border-red-500 hover:bg-red-500 hover:text-black w-32 h-16 text-xl"
                    >
                      <X className="mr-2" /> NO
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* LEVEL 1: JAGUAR CONSEQUENCE */}
            {state.phase === "LEVEL_1_CONSEQUENCE" && (
              <motion.div 
                key="level1_consequence"
                className="w-full max-w-4xl"
              >
                <h3 className="text-2xl font-orbitron text-center mb-8 text-primary/80">
                  What do they mean? Pick one.
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "Animal", icon: "🐆", label: "The Animal" },
                    { id: "Car", icon: "🏎️", label: "The Car" },
                    { id: "Guitar", icon: "🎸", label: "The Guitar" },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      disabled={state.selectedOptions.includes(item.id)}
                      onClick={() => handleConsequenceSelection(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        h-64 rounded-xl border-2 flex flex-col items-center justify-center gap-4 transition-all
                        ${state.selectedOptions.includes(item.id) 
                          ? 'border-gray-700 bg-gray-900/50 opacity-50 grayscale' 
                          : 'border-primary/30 bg-black/40 hover:border-primary hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]'
                        }
                      `}
                    >
                      <span className="text-6xl">{item.icon}</span>
                      <span className="text-xl font-orbitron">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LEVEL 1: JAGUAR FINAL */}
            {state.phase === "LEVEL_1_FINAL" && (
              <motion.div className="text-center">
                 <Button 
                    onClick={advanceToPhoneScenario}
                    className="bg-destructive text-white hover:bg-destructive/80 font-orbitron text-xl px-12 py-6 rounded-none animate-pulse"
                  >
                    Next Challenge
                  </Button>
              </motion.div>
            )}

            {/* LEVEL 1: PHONE SETUP */}
            {(state.phase === "LEVEL_1_PHONE_SETUP" || state.phase === "LEVEL_1_PHONE_REACTION") && (
              <motion.div 
                key="level1_phone_setup"
                className="text-center w-full max-w-xl"
              >
                <Card className="bg-black border-2 border-white/20 p-12 mb-8 -rotate-1">
                  <h3 className="text-4xl font-mono text-white mb-2">"Which phone should I buy?"</h3>
                </Card>
                
                {state.phase === "LEVEL_1_PHONE_SETUP" && (
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => handlePhoneSetup(true)}
                      className="bg-green-500/20 text-green-400 border border-green-500 hover:bg-green-500 hover:text-black w-32 h-16 text-xl"
                    >
                      <Check className="mr-2" /> YES
                    </Button>
                    <Button 
                      onClick={() => handlePhoneSetup(false)}
                      className="bg-red-500/20 text-red-400 border border-red-500 hover:bg-red-500 hover:text-black w-32 h-16 text-xl"
                    >
                      <X className="mr-2" /> NO
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* LEVEL 1: PHONE CONSEQUENCE */}
            {state.phase === "LEVEL_1_PHONE_CONSEQUENCE" && (
              <motion.div 
                key="level1_phone_consequence"
                className="w-full max-w-4xl"
              >
                <h3 className="text-2xl font-orbitron text-center mb-8 text-primary/80">
                  What does the AI THINK you mean? Pick one.
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "Flagship", icon: <DollarSign className="w-16 h-16" />, label: "₹80k Flagship" },
                    { id: "Camera", icon: <Camera className="w-16 h-16" />, label: "Best Camera" },
                    { id: "Gaming", icon: <Gamepad className="w-16 h-16" />, label: "Gaming Beast" },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      disabled={state.selectedOptions.includes(item.id)}
                      onClick={() => handlePhoneConsequenceSelection(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        h-64 rounded-xl border-2 flex flex-col items-center justify-center gap-4 transition-all
                        ${state.selectedOptions.includes(item.id) 
                          ? 'border-gray-700 bg-gray-900/50 opacity-50 grayscale' 
                          : 'border-secondary/30 bg-black/40 hover:border-secondary hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] text-secondary'
                        }
                      `}
                    >
                      {item.icon}
                      <span className="text-xl font-orbitron">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* LEVEL 1: PHONE FINAL */}
            {state.phase === "LEVEL_1_PHONE_FINAL" && (
              <motion.div className="text-center">
                 <Button 
                    onClick={finishLevel1}
                    className="bg-destructive text-white hover:bg-destructive/80 font-orbitron text-xl px-12 py-6 rounded-none animate-pulse"
                  >
                    End of Level 1
                  </Button>
              </motion.div>
            )}

             {/* LEVEL 1: COMPLETE */}
             {state.phase === "LEVEL_1_COMPLETE" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl text-center"
              >
                <Card className="bg-black/80 border-secondary p-8 border-glow backdrop-blur-xl">
                  <div className="flex justify-center mb-6">
                    <Award className="w-16 h-16 text-yellow-400" />
                  </div>
                  <h2 className="text-4xl font-orbitron text-white mb-6">LEVEL 1 COMPLETE</h2>
                  <div className="space-y-4 text-left text-lg mb-8 font-mono text-gray-300">
                    <p className="flex items-center"><Check className="text-green-400 mr-2" /> You spotted 3 types of ambiguity</p>
                    <p className="flex items-center"><Check className="text-green-400 mr-2" /> You saw how AI misinterprets missing context</p>
                    <p className="flex items-center"><Check className="text-green-400 mr-2" /> You survived my emotional damage</p>
                    <p className="flex items-center"><Check className="text-green-400 mr-2" /> You unlocked your first AI-thinking skill</p>
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                     <p className="text-sm text-secondary mb-2 uppercase tracking-widest">Up Next</p>
                     <p className="text-xl font-bold mb-6">The REAL secret behind making AI obey you — "How to give a full thought, not a random wish."</p>
                     <Button 
                      onClick={handleCuriousClick}
                      className="w-full bg-white text-black hover:bg-gray-200 font-bold text-lg h-14"
                     >
                       I'm curious.
                     </Button>
                  </div>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* FOOTER: Zone 3 (Input/Interaction) - mostly used for buttons in this flow, keeping empty for layout structure if needed */}
        <div className="h-16 flex items-center justify-center text-xs text-white/20 uppercase tracking-[0.2em]">
          AI Prompt Coach v1.0 // System Online
        </div>

      </div>
    </div>
  );
}
