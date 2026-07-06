import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleManageServers = () => {
    if (isAuthenticated) {
      navigate("/meus-servidores/dashboard");
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-gray-50 dark:bg-[#0d0f14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        key="journey-selection"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto z-10"
      >
          {/* HERO SECTION */}
          <div className="text-center space-y-6 mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold tracking-wide text-sm"
            >
              <span>MyServer</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight"
            >
              O que você deseja fazer?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-400 font-medium"
            >
              Escolha uma das opções abaixo para começar sua experiência no MyServer.
            </motion.p>
          </div>

          {/* JOURNEY CARDS - 2 OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option 1: Criar / Gerenciar Servidores */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={handleManageServers}
              className="cursor-pointer bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-10 rounded-3xl hover:border-blue-500/50 transition-all shadow-xl hover:shadow-blue-500/20 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                🖥️
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Criar / Gerenciar Servidores
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-sm">
                Crie novos servidores dedicados, gerencie servidores existentes,
                acompanhe recursos, arquivos, backups, configurações e todas as
                funcionalidades administrativas do MyServer.
              </p>
            </motion.div>

            {/* Option 2: Servidores Públicos */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate("/servidores-publicos")}
              className="cursor-pointer bg-white dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-10 rounded-3xl hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/20 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform">
                🌍
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Servidores Públicos
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-sm">
                Explore servidores públicos hospedados no MyServer e encontre
                uma comunidade para jogar.
              </p>
            </motion.div>
          </div>
        </motion.div>

      {/* Login Requirement Modal */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Acesso Restrito</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
              Você precisa estar logado para acessar as opções de administração de servidores.
              Faça login ou crie uma conta para continuar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => {
                setLoginModalOpen(false);
                navigate("/login");
              }}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white"
              onClick={() => {
                setLoginModalOpen(false);
                navigate("/register");
              }}
            >
              Criar Conta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
