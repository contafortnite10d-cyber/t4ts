import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Server, Activity, Globe, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PLANS } from "../data/mock";

type GameType = "minecraft" | "terraria" | null;
type PlanType = typeof PLANS[0] | null;

export function CreateServer() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [serverName, setServerName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("br");

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  
  const handleFinish = () => {
    // Finish logic goes here
    navigate("/meus-servidores/dashboard");
  };

  const isNextDisabled = () => {
    if (step === 1 && !selectedGame) return true;
    if (step === 2 && !selectedPlan) return true;
    if (step === 3 && serverName.trim().length < 3) return true;
    if (step === 4 && !selectedRegion) return true;
    return false;
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#313338] text-[#F2F3F5] p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Wizard Header / Steps Indicator */}
        <div className="mb-10">
          <h1 className="text-3xl font-black mb-6">Criar Novo Servidor</h1>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1E1F22] rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#5865F2] rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                  step >= i 
                    ? "bg-[#5865F2] text-white shadow-[0_0_15px_rgba(88,101,242,0.4)]" 
                    : "bg-[#1E1F22] text-[#B5BAC1] border-2 border-[#313338]"
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-[#B5BAC1]">
            <span>Jogo</span>
            <span>Plano</span>
            <span>Detalhes</span>
            <span>Região</span>
          </div>
        </div>

        {/* Wizard Content */}
        <div className="bg-[#1E1F22] rounded-xl border border-white/5 p-8 shadow-xl min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Jogo */}
            {step === 1 && (
              <motion.div 
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F2F3F5] mb-2">Qual jogo você quer hospedar?</h2>
                  <p className="text-[#B5BAC1]">Selecione o jogo para o qual deseja criar um servidor.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedGame("minecraft")}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                      selectedGame === "minecraft" 
                        ? "border-[#5865F2] bg-[#5865F2]/10" 
                        : "border-transparent bg-[#313338] hover:bg-[#313338]/80"
                    }`}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888856.png" alt="Minecraft" className="w-16 h-16 object-contain filter brightness-0 invert opacity-90 mb-4" />
                    <span className="font-bold text-lg">Minecraft</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedGame("terraria")}
                    className={`flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                      selectedGame === "terraria" 
                        ? "border-[#5865F2] bg-[#5865F2]/10" 
                        : "border-transparent bg-[#313338] hover:bg-[#313338]/80"
                    }`}
                  >
                    <img src="https://cdn-icons-png.flaticon.com/512/888/888846.png" alt="Terraria" className="w-16 h-16 object-contain filter brightness-0 invert opacity-90 mb-4" />
                    <span className="font-bold text-lg">Terraria</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Plano */}
            {step === 2 && (
              <motion.div 
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F2F3F5] mb-2">Escolha o seu plano</h2>
                  <p className="text-[#B5BAC1]">Recursos dedicados para o seu servidor {selectedGame === 'minecraft' ? 'Minecraft' : 'Terraria'}.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan?.id === plan.id;
                    return (
                      <button 
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`flex flex-col text-left rounded-xl p-5 border-2 transition-all ${
                          isSelected
                            ? "border-[#5865F2] bg-[#5865F2]/10"
                            : "border-transparent bg-[#313338] hover:border-white/10"
                        }`}
                      >
                        <h3 className="text-lg font-bold text-[#F2F3F5] mb-1">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                          <span className="text-2xl font-extrabold text-[#5865F2]">{plan.price}</span>
                          <span className="text-[#B5BAC1] text-xs">/mês</span>
                        </div>
                        <ul className="space-y-2 mt-auto w-full">
                          <li className="flex items-center gap-2 text-xs text-[#B5BAC1]">
                            <Check className={`w-3.5 h-3.5 ${isSelected ? "text-[#5865F2]" : "text-[#23A559]"}`} /> {plan.ram} RAM
                          </li>
                          <li className="flex items-center gap-2 text-xs text-[#B5BAC1]">
                            <Check className={`w-3.5 h-3.5 ${isSelected ? "text-[#5865F2]" : "text-[#23A559]"}`} /> {plan.cpu}
                          </li>
                          <li className="flex items-center gap-2 text-xs text-[#B5BAC1]">
                            <Check className={`w-3.5 h-3.5 ${isSelected ? "text-[#5865F2]" : "text-[#23A559]"}`} /> {plan.storage}
                          </li>
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Detalhes */}
            {step === 3 && (
              <motion.div 
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F2F3F5] mb-2">Identificação</h2>
                  <p className="text-[#B5BAC1]">Dê um nome ao seu novo servidor.</p>
                </div>

                <div className="max-w-md">
                  <label className="block text-xs font-bold text-[#B5BAC1] uppercase mb-2">
                    NOME DO SERVIDOR
                  </label>
                  <input 
                    type="text" 
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    placeholder="Ex: Meu Servidor Épico"
                    className="w-full bg-[#1E1F22] border border-black/30 rounded-md p-3 text-[#F2F3F5] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:border-transparent transition"
                  />
                  <p className="text-xs text-[#B5BAC1] mt-2">Mínimo de 3 caracteres.</p>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Região e Finalizar */}
            {step === 4 && (
              <motion.div 
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F2F3F5] mb-2">Finalização</h2>
                  <p className="text-[#B5BAC1]">Selecione a região e confirme a criação.</p>
                </div>

                <div className="max-w-md mb-8">
                  <label className="block text-xs font-bold text-[#B5BAC1] uppercase mb-2">
                    REGIÃO DO SERVIDOR
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedRegion("br")}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        selectedRegion === "br"
                          ? "border-[#5865F2] bg-[#5865F2]/10"
                          : "border-transparent bg-[#313338] hover:bg-[#313338]/80"
                      }`}
                    >
                      <Globe className="w-5 h-5 text-[#23A559]" />
                      <span className="font-semibold text-sm">Brasil (SP)</span>
                    </button>
                    <button 
                      onClick={() => setSelectedRegion("us")}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        selectedRegion === "us"
                          ? "border-[#5865F2] bg-[#5865F2]/10"
                          : "border-transparent bg-[#313338] hover:bg-[#313338]/80"
                      }`}
                    >
                      <Globe className="w-5 h-5 text-indigo-400" />
                      <span className="font-semibold text-sm">EUA (NY)</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#313338] rounded-xl p-4 border border-white/5">
                  <h3 className="font-bold text-[#F2F3F5] mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#5865F2]" /> Resumo
                  </h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#B5BAC1]">Jogo:</span>
                      <span className="font-semibold text-white capitalize">{selectedGame}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B5BAC1]">Nome:</span>
                      <span className="font-semibold text-white">{serverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B5BAC1]">Plano:</span>
                      <span className="font-semibold text-white">{selectedPlan?.name} ({selectedPlan?.price}/mês)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B5BAC1]">Região:</span>
                      <span className="font-semibold text-white">{selectedRegion === "br" ? "Brasil" : "EUA"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Wizard Footer / Navigation */}
          <div className="mt-auto pt-8 flex items-center justify-between">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 font-medium transition-colors ${
                step === 1 
                  ? "text-transparent cursor-default pointer-events-none" 
                  : "text-[#B5BAC1] hover:text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </button>

            {step < 4 ? (
              <button 
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-2.5 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Próximo passo
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleFinish}
                disabled={isNextDisabled()}
                className="bg-[#23A559] hover:bg-[#1a7b42] text-white px-6 py-2.5 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Criar Servidor
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
