import React, { useState } from "react";
import { User, Shield, Link as LinkIcon, Globe, Bell, Camera, Image as ImageIcon, MessageSquare, Github, Twitch, Smartphone, Monitor } from "lucide-react";
import { clsx } from "clsx";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const sidebarCategories = [
    {
      title: "CONFIGURAÇÕES DO USUÁRIO",
      items: [
        { id: "account", label: "Minha Conta" },
        { id: "privacy", label: "Privacidade e Segurança" },
        { id: "connections", label: "Conexões" },
      ]
    },
    {
      title: "CONFIGURAÇÕES DO APLICATIVO",
      items: [
        { id: "language", label: "Idioma" },
        { id: "notifications", label: "Notificações" },
      ]
    }
  ];

  // Mock states for Toggles
  const [notifyBilling, setNotifyBilling] = useState(true);
  const [notifyUpdates, setNotifyUpdates] = useState(true);
  const [notifyTickets, setNotifyTickets] = useState(true);

  // Mock state for Language
  const [language, setLanguage] = useState("pt-BR");

  return (
    <div className="flex min-h-[calc(100vh-80px)] md:min-h-screen bg-[#313338] text-[#F2F3F5] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-60 bg-[#2B2D31] flex-shrink-0 hidden md:flex flex-col py-6 px-4">
        {sidebarCategories.map((category, idx) => (
          <div key={idx} className={clsx(idx > 0 && "mt-4", "mb-2")}>
            <h3 className="px-2.5 mb-1.5 text-[12px] font-extrabold text-[#B5BAC1] uppercase tracking-wide">
              {category.title}
            </h3>
            <div className="space-y-0.5">
              {category.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={clsx(
                      "w-full flex items-center px-2.5 py-1.5 rounded-md text-[15px] font-medium transition-colors text-left",
                      isActive 
                        ? "bg-[#404249] text-[#F2F3F5]" 
                        : "text-[#B5BAC1] bg-transparent hover:bg-[#313338] hover:text-[#DBDEE1]"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            {idx < sidebarCategories.length - 1 && (
              <div className="h-px bg-white/5 my-3 mx-2.5" />
            )}
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
        <div className="max-w-3xl">
          
          {/* TAB 1: MINHA CONTA */}
          {activeTab === "account" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              
              <div>
                <h2 className="text-xl font-bold text-[#F2F3F5] mb-6">Minha Conta</h2>
                
                {/* Profile Card */}
                <div className="bg-[#1E1F22] rounded-xl p-6 space-y-6">
                  {/* Banner & Avatar Actions */}
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-col gap-3">
                      <div className="w-24 h-24 rounded-full bg-[#5865F2] flex items-center justify-center text-3xl font-bold border-4 border-[#1E1F22] relative group cursor-pointer overflow-hidden">
                        <span className="z-10 group-hover:opacity-0 transition-opacity">J</span>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <button className="text-xs font-medium text-[#B5BAC1] hover:text-[#F2F3F5] transition-colors">
                        Remover Avatar
                      </button>
                    </div>

                    <div className="flex-1 space-y-3 w-full">
                      <div className="h-24 w-full rounded-lg bg-[#2B2D31] flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 hover:border-[#5865F2]/50 transition-colors cursor-pointer group">
                        <ImageIcon className="w-6 h-6 text-[#B5BAC1] group-hover:text-[#5865F2] transition-colors" />
                        <span className="text-sm font-medium text-[#B5BAC1] group-hover:text-[#F2F3F5] transition-colors">
                          Fazer upload do Banner
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Profile Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#B5BAC1] uppercase">
                        Nome de Exibição
                      </label>
                      <input
                        type="text"
                        defaultValue="João Silva"
                        className="w-full bg-[#1E1F22] text-[#F2F3F5] border border-white/10 focus:border-[#5865F2] rounded-md px-3 py-2.5 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#B5BAC1] uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="joao.silva@email.com"
                        className="w-full bg-[#1E1F22] text-[#F2F3F5] border border-white/10 focus:border-[#5865F2] rounded-md px-3 py-2.5 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button className="bg-[#5865F2] hover:bg-[#4752C4] text-[#F2F3F5] px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#F2F3F5]">Gerenciamento de Senhas</h3>
                
                <div className="bg-[#1E1F22] rounded-xl p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#B5BAC1] uppercase">
                        Senha Atual
                      </label>
                      <input
                        type="password"
                        className="w-full bg-[#1E1F22] text-[#F2F3F5] border border-white/10 focus:border-[#5865F2] rounded-md px-3 py-2.5 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#B5BAC1] uppercase">
                        Nova Senha
                      </label>
                      <input
                        type="password"
                        className="w-full bg-[#1E1F22] text-[#F2F3F5] border border-white/10 focus:border-[#5865F2] rounded-md px-3 py-2.5 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button className="bg-[#5865F2] hover:bg-[#4752C4] text-[#F2F3F5] px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
                      Atualizar Senha
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5 my-8" />

              {/* Danger Zone */}
              <div className="space-y-4 border border-white/5 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-[#F2F3F5]">Excluir Conta</h3>
                <p className="text-sm text-[#B5BAC1]">
                  A exclusão da conta é permanente e não pode ser desfeita. Todos os seus servidores, backups e dados associados serão apagados imediatamente.
                </p>
                <button className="border border-[#DA373C] text-[#DA373C] hover:bg-[#DA373C] hover:text-[#F2F3F5] px-6 py-2.5 rounded-md text-sm font-medium transition-colors mt-2">
                  Excluir Conta
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PRIVACIDADE E SEGURANÇA */}
          {activeTab === "privacy" && (
            <div className="space-y-10 animate-in fade-in duration-300">
              
              <div>
                <h2 className="text-xl font-bold text-[#F2F3F5] mb-6">Privacidade e Segurança</h2>
                
                {/* 2FA Section */}
                <div className="bg-[#1E1F22] rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#F2F3F5]">Autenticação de Dois Fatores (2FA)</h3>
                  <p className="text-sm text-[#B5BAC1]">
                    Proteja sua conta do MyServer com uma camada extra de segurança. Quando ativado, você precisará inserir um código de segurança além da sua senha ao fazer login.
                  </p>
                  <button className="bg-[#5865F2] hover:bg-[#4752C4] text-[#F2F3F5] px-6 py-2.5 rounded-md text-sm font-medium transition-colors">
                    Ativar 2FA
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-[#F2F3F5]">Sessões Ativas</h3>
                <div className="bg-[#1E1F22] rounded-xl p-6 space-y-6">
                  
                  {/* Current Session */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2B2D31] rounded-full flex items-center justify-center shrink-0">
                      <Monitor className="w-6 h-6 text-[#F2F3F5]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F2F3F5] font-medium">Windows • Google Chrome <span className="text-[#23A559] text-xs font-bold ml-2 uppercase">Sessão Atual</span></p>
                      <p className="text-[#B5BAC1] text-sm">São Paulo, BR • Há alguns segundos</p>
                    </div>
                  </div>

                  {/* Other Session */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2B2D31] rounded-full flex items-center justify-center shrink-0">
                      <Smartphone className="w-6 h-6 text-[#F2F3F5]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F2F3F5] font-medium">iOS • MyServer App</p>
                      <p className="text-[#B5BAC1] text-sm">Rio de Janeiro, BR • Há 2 dias</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <button className="text-[#DA373C] hover:underline text-sm font-medium">
                      Desconectar de todas as outras sessões
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CONEXÕES */}
          {activeTab === "connections" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#F2F3F5] mb-6">Conexões</h2>
              <p className="text-sm text-[#B5BAC1] mb-6">
                Vincule suas contas para uma experiência integrada e simplifique seu login no MyServer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Discord */}
                <div className="bg-[#1E1F22] rounded-xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-[#2B2D31] transition-colors">
                  <div className="w-12 h-12 bg-[#5865F2] rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F2F3F5]">Discord</h3>
                    <p className="text-xs text-[#B5BAC1]">Vincule para cargos automáticos no servidor</p>
                  </div>
                  <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-[#F2F3F5] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Conectar
                  </button>
                </div>

                {/* GitHub */}
                <div className="bg-[#1E1F22] rounded-xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-[#2B2D31] transition-colors">
                  <div className="w-12 h-12 bg-[#2B2D31] rounded-full flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F2F3F5]">GitHub</h3>
                    <p className="text-xs text-[#B5BAC1]">Vincule para integrações com repositórios</p>
                  </div>
                  <button className="w-full bg-[#2B2D31] hover:bg-[#1E1F22] border border-[#B5BAC1]/30 text-[#F2F3F5] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Conectar
                  </button>
                </div>

                {/* Twitch */}
                <div className="bg-[#1E1F22] rounded-xl p-6 flex flex-col items-center text-center space-y-4 hover:bg-[#2B2D31] transition-colors">
                  <div className="w-12 h-12 bg-[#9146FF] rounded-full flex items-center justify-center">
                    <Twitch className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F2F3F5]">Twitch</h3>
                    <p className="text-xs text-[#B5BAC1]">Integrações para streamers e inscritos</p>
                  </div>
                  <button className="w-full bg-[#9146FF] hover:bg-[#772CE8] text-[#F2F3F5] px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Conectar
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: IDIOMA */}
          {activeTab === "language" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#F2F3F5] mb-6">Idioma</h2>
              
              <div className="bg-[#1E1F22] rounded-xl p-6 space-y-6">
                <label className="text-xs font-bold text-[#B5BAC1] uppercase block mb-4">
                  Selecione seu idioma preferido
                </label>
                
                <div className="space-y-3">
                  {/* Language Options */}
                  {[
                    { id: "pt-BR", label: "Português (Brasil)" },
                    { id: "en-US", label: "English (US)" },
                    { id: "es-ES", label: "Español" },
                  ].map((lang) => (
                    <label key={lang.id} className="flex items-center gap-4 p-4 rounded-lg bg-[#2B2D31] hover:bg-[#313338] border border-white/5 cursor-pointer transition-colors">
                      <div className={clsx(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        language === lang.id ? "border-[#5865F2]" : "border-[#B5BAC1]"
                      )}>
                        {language === lang.id && <div className="w-2.5 h-2.5 rounded-full bg-[#5865F2]" />}
                      </div>
                      <input 
                        type="radio" 
                        name="language" 
                        value={lang.id} 
                        checked={language === lang.id}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="hidden"
                      />
                      <span className="text-[#F2F3F5] font-medium">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: NOTIFICAÇÕES */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-[#F2F3F5] mb-6">Notificações</h2>
              
              <div className="bg-[#1E1F22] rounded-xl p-6 space-y-6">
                <h3 className="text-xs font-bold text-[#B5BAC1] uppercase tracking-wider mb-2">
                  Notificações por Email
                </h3>

                <div className="space-y-4">
                  {/* Toggle 1 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#F2F3F5] font-medium">Faturamento e Planos</h4>
                      <p className="text-sm text-[#B5BAC1]">Receba alertas sobre renovações e atualizações de planos.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notifyBilling} onChange={() => setNotifyBilling(!notifyBilling)} />
                      <div className="w-11 h-6 bg-[#313338] rounded-full peer peer-checked:bg-[#23A559] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                  
                  <div className="h-px bg-white/5" />

                  {/* Toggle 2 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#F2F3F5] font-medium">Atualizações de Servidor</h4>
                      <p className="text-sm text-[#B5BAC1]">Avisos sobre manutenções programadas ou problemas de performance.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notifyUpdates} onChange={() => setNotifyUpdates(!notifyUpdates)} />
                      <div className="w-11 h-6 bg-[#313338] rounded-full peer peer-checked:bg-[#23A559] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Toggle 3 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#F2F3F5] font-medium">Tickets de Suporte</h4>
                      <p className="text-sm text-[#B5BAC1]">Respostas e atualizações nos seus chamados de suporte.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={notifyTickets} onChange={() => setNotifyTickets(!notifyTickets)} />
                      <div className="w-11 h-6 bg-[#313338] rounded-full peer peer-checked:bg-[#23A559] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
