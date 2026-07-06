import React from "react";
import { Play, Square, RotateCw, Terminal, Folder, Settings, Shield, HardDrive, Database, Activity } from "lucide-react";

export function ManageServer() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">RedM Roleplay Principal</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">192.168.1.100:30120</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-lg font-medium transition text-sm">
            <Play className="w-4 h-4" /> Iniciar
          </button>
          <button className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg font-medium transition text-sm">
            <RotateCw className="w-4 h-4" /> Reiniciar
          </button>
          <button className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 px-4 py-2 rounded-lg font-medium transition text-sm">
            <Square className="w-4 h-4" /> Parar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Console */}
          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gray-100 dark:bg-[#0f1115] border-b border-gray-200 dark:border-white/5 px-4 py-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Console do Servidor</span>
            </div>
            <div className="flex-1 bg-black p-4 font-mono text-sm overflow-y-auto">
              <div className="text-gray-600 dark:text-gray-400">[12:00:01] Sistema iniciado com sucesso.</div>
              <div className="text-gray-600 dark:text-gray-400">[12:00:02] Carregando recursos...</div>
              <div className="text-emerald-400">[12:00:05] 145 recursos carregados.</div>
              <div className="text-gray-600 dark:text-gray-400">[12:00:06] Autenticando com Cfx.re...</div>
              <div className="text-emerald-400">[12:00:08] Autenticado com sucesso! Servidor visível na lista.</div>
              <div className="text-blue-400 mt-2">[12:05:12] Jogador 'Admin' conectou (IP: ***.***.***.***)</div>
              <div className="text-gray-600 dark:text-gray-400">[12:10:00] Salvando banco de dados... Ok.</div>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-[#0f1115] border-t border-gray-200 dark:border-white/5 flex gap-2">
              <input type="text" placeholder="Digite um comando..." className="flex-1 bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/10 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50" />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Navegação</h3>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-md text-sm font-medium">
                <Terminal className="w-4 h-4" /> Console
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white rounded-md text-sm font-medium transition">
                <Folder className="w-4 h-4" /> Arquivos
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white rounded-md text-sm font-medium transition">
                <Database className="w-4 h-4" /> Bancos de Dados
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white rounded-md text-sm font-medium transition">
                <HardDrive className="w-4 h-4" /> Backups
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white rounded-md text-sm font-medium transition">
                <Activity className="w-4 h-4" /> Monitoramento
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white rounded-md text-sm font-medium transition">
                <Settings className="w-4 h-4" /> Configurações
              </a>
            </nav>
          </div>

          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-4 space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400">Uso de Recursos</h3>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">CPU</span>
                <span className="text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">RAM</span>
                <span className="text-gray-900 dark:text-white">4.2 GB / 8 GB</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "52%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">Disco (NVMe)</span>
                <span className="text-gray-900 dark:text-white">12 GB / 60 GB</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
