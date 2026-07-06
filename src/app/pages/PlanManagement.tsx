import React, { useState } from "react";
import { CreditCard, Calendar, ShieldCheck, AlertTriangle, Settings, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Simulando dados da API
const mockPlanData = {
  plano_nome: "Plano Avançado - Minecraft",
  status: "ativo", // "ativo", "expirado" ou "cancelado"
  data_expiracao: "2026-08-15",
  renovacao_automatica: true,
  metodo_pagamento: {
    tipo: "Cartão de Crédito",
    final: "4321",
    bandeira: "Mastercard"
  },
  valor_mensal: "R$ 45,90"
};

export function PlanManagement() {
  const [planData, setPlanData] = useState(mockPlanData);

  const handleCancelPlan = () => {
    toast.error("Processo de cancelamento iniciado.");
    // Aqui iria a lógica de cancelamento (ex: abrir modal de confirmação)
  };

  const handleChangePayment = () => {
    toast.success("Redirecionando para alteração de pagamento...");
    // Aqui iria a lógica para alterar pagamento
  };

  const handleToggleAutoRenew = () => {
    const newState = !planData.renovacao_automatica;
    setPlanData({ ...planData, renovacao_automatica: newState });
    toast.success(`Renovação automática ${newState ? "ativada" : "desativada"} com sucesso.`);
  };

  const isAtivo = planData.status === "ativo";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#313338] p-6 text-[#F2F3F5]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#5865F2]" />
            Gerenciamento de Plano
          </h1>
          <p className="text-[#B5BAC1] text-sm">
            Gerencie sua assinatura, formas de pagamento e informações de faturamento de forma rápida e segura.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Informações do Plano */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1E1F22] rounded-xl p-6 flex flex-col justify-between border border-white/5 shadow-lg"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h2 className="text-lg font-bold text-[#F2F3F5] uppercase tracking-wide">
                  Plano Contratado
                </h2>
              </div>
              <p className="text-2xl font-black text-white mb-1">
                {planData.plano_nome}
              </p>
              <p className="text-[#B5BAC1] font-medium">
                Valor mensal: <span className="text-[#F2F3F5]">{planData.valor_mensal}</span>
              </p>
            </div>
          </motion.div>

          {/* Card 2: Status e Renovação */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-[#1E1F22] rounded-xl p-6 flex flex-col justify-between border border-white/5 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                    <Calendar className="w-6 h-6 text-[#5865F2]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#F2F3F5] uppercase tracking-wide">
                    Status e Renovação
                  </h2>
                </div>
                {/* Status Badge */}
                <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isAtivo ? 'bg-[#23A559]/10 text-[#23A559]' : 'bg-[#80848E]/10 text-[#80848E]'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${isAtivo ? 'bg-[#23A559]' : 'bg-[#80848E]'}`}></div>
                  {planData.status}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-[#B5BAC1] font-medium flex items-center justify-between">
                  Vencimento / Expiração:
                  <span className="text-[#F2F3F5] font-semibold">{planData.data_expiracao}</span>
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#B5BAC1] font-medium">Renovação Automática:</p>
                  <button 
                    onClick={handleToggleAutoRenew}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      planData.renovacao_automatica ? 'bg-[#23A559]' : 'bg-[#80848E]'
                    }`}
                  >
                    <span 
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        planData.renovacao_automatica ? 'translate-x-6' : 'translate-x-1'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Informações de Pagamento */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-[#1E1F22] rounded-xl p-6 flex flex-col justify-between border border-white/5 shadow-lg"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                  <CreditCard className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h2 className="text-lg font-bold text-[#F2F3F5] uppercase tracking-wide">
                  Forma de Pagamento
                </h2>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#313338] rounded-lg border border-white/5">
                <div className="w-12 h-8 bg-[#1E1F22] rounded flex items-center justify-center font-bold text-[#F2F3F5] text-xs">
                  {planData.metodo_pagamento.bandeira.substring(0, 4)}
                </div>
                <div>
                  <p className="text-[#F2F3F5] font-semibold">
                    {planData.metodo_pagamento.tipo}
                  </p>
                  <p className="text-[#B5BAC1] text-sm">
                    Terminando em **** {planData.metodo_pagamento.final}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Ações de Gerenciamento */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-[#1E1F22] rounded-xl p-6 flex flex-col justify-between border border-white/5 shadow-lg"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#5865F2]/10 rounded-lg">
                  <RefreshCcw className="w-6 h-6 text-[#5865F2]" />
                </div>
                <h2 className="text-lg font-bold text-[#F2F3F5] uppercase tracking-wide">
                  Ações de Faturamento
                </h2>
              </div>
              
              <div className="space-y-4 pt-2">
                <button 
                  onClick={handleChangePayment}
                  className="w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Alterar Forma de Pagamento
                </button>

                <button 
                  onClick={handleCancelPlan}
                  className="w-full py-3 px-4 bg-transparent border border-[#DA373C] text-[#DA373C] hover:bg-[#DA373C] hover:text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 group"
                >
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
                  Cancelar Plano
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
