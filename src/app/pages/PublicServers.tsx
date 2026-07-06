import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MOCK_SERVERS } from "../data/mock";

export function PublicServers() {
  const minecraftServers = MOCK_SERVERS.filter((s) => s.game === "Minecraft");
  const terrariaServers = MOCK_SERVERS.filter((s) => s.game === "Terraria");

  const mcPlayers = minecraftServers.reduce((acc, s) => acc + s.playersOnline, 0);
  const terrariaPlayers = terrariaServers.reduce((acc, s) => acc + s.playersOnline, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-gray-50 dark:bg-[#0d0f14] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        key="game-selection"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl mx-auto z-10"
      >
        <div className="mb-10 text-center relative">
          <Link
            to="/"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white flex items-center gap-2 transition-colors font-medium bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            ← Voltar
          </Link>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">
            Escolha o Jogo
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Selecione um jogo para ver os servidores disponíveis.
          </p>
        </div>

        {/* GAMES SELECTION */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* MINECRAFT CARD */}
          <Link to="/servidores-publicos/minecraft" className="flex-1 block outline-none">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1200&q=80"
                alt="Minecraft"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0d0f14] via-gray-50/60 dark:via-[#0d0f14]/60 to-transparent"></div>
              <div className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-emerald-500/50 rounded-3xl transition-all duration-300"></div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-black/40 backdrop-blur-md rounded-xl p-2 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/888/888856.png"
                      alt="Minecraft Logo"
                      className="w-full h-full object-contain filter brightness-0 invert opacity-90"
                    />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-wide uppercase drop-shadow-lg">
                    Minecraft
                  </h2>
                </div>
                <div className="flex flex-col gap-1 text-emerald-300 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {minecraftServers.length} Servidores Públicos
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
                    {mcPlayers} Jogadores Online
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* TERRARIA CARD */}
          <Link to="/servidores-publicos/terraria" className="flex-1 block outline-none">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer border border-gray-200 dark:border-white/5 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1200&q=80"
                alt="Terraria"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0d0f14] via-gray-50/60 dark:via-[#0d0f14]/60 to-transparent"></div>
              <div className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-green-500/50 rounded-3xl transition-all duration-300"></div>

              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 bg-black/40 backdrop-blur-md rounded-xl p-2 border border-gray-200 dark:border-white/10 flex items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/888/888846.png"
                      alt="Terraria Logo"
                      className="w-full h-full object-contain filter brightness-0 invert opacity-90"
                    />
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-wide uppercase drop-shadow-lg">
                    Terraria
                  </h2>
                </div>
                <div className="flex flex-col gap-1 text-green-300 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {terrariaServers.length} Servidores Públicos
                  </p>
                  <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                    {terrariaPlayers} Jogadores Online
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
