import React from "react";
import { Server, Activity, Users, AlertCircle, Play, Square, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
        <Link to="/plans" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          Novo Servidor
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Servidores Ativos</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Jogadores Totais</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">134</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Uso Médio CPU</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">42%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-lg flex items-center justify-center shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Alertas / Tickets</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">0</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Meus Servidores</h2>
        <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-100 dark:bg-[#0f1115] border-b border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Recursos</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/[0.02] transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white text-base">RedM Roleplay Principal</div>
                  <div className="text-xs text-gray-500">192.168.1.100:30120</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Online
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col gap-1">
                     <span className="text-xs">RAM: 4.2GB / 8GB</span>
                     <div className="w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[52%]"></div></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-md transition" title="Iniciar"><Play className="w-4 h-4" /></button>
                    <button className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-md transition" title="Parar"><Square className="w-4 h-4" /></button>
                    <Link to="/dashboard/server/1" className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:text-white rounded-md transition" title="Gerenciar"><Settings className="w-4 h-4" /></Link>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white text-base">Minecraft Vanilla</div>
                  <div className="text-xs text-gray-500">mc.myserver.com</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Offline
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col gap-1">
                     <span className="text-xs">RAM: 0GB / 4GB</span>
                     <div className="w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[0%]"></div></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-md transition" title="Iniciar"><Play className="w-4 h-4" /></button>
                    <button className="p-2 text-gray-600 cursor-not-allowed rounded-md transition" disabled title="Parar"><Square className="w-4 h-4" /></button>
                    <Link to="/dashboard/server/2" className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:text-white rounded-md transition" title="Gerenciar"><Settings className="w-4 h-4" /></Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
