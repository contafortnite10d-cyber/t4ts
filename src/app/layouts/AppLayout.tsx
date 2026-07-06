import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  Server, LayoutDashboard, Bell, LifeBuoy, User, Settings, 
  LogOut, Heart, Activity, Terminal, Folder, HardDrive, 
  FileText, Users, ChevronLeft, ChevronRight, Menu, 
  HelpCircle, MoreVertical, X, Database,
  Home, Grid, CreditCard, Info, Lock, KeyRound, UserPlus, ChevronDown, Check
, Sun, Moon, PlusCircle, List} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Toaster } from "sonner";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Modal de Acesso Restrito
function RestrictedModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#2B2D31] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Acesso Restrito</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Para utilizar esta funcionalidade é necessário entrar em sua conta ou criar uma nova conta gratuitamente.
          </p>
          
          <div className="w-full space-y-3 pt-4">
            <button 
              onClick={() => { onClose(); navigate("/login"); }}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-medium transition"
            >
              Entrar
            </button>
            <button 
              onClick={() => { onClose(); navigate("/register"); }}
              className="w-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white py-2.5 rounded-lg font-medium transition"
            >
              Criar Conta
            </button>
            <button 
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-900 dark:text-white py-2 font-medium transition text-sm mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


interface UserProfile {
  username: string;
  avatarUrl?: string;
  status: string;
}

export function AppLayout() {
  const { theme, setTheme } = useTheme();
  const mockUser: UserProfile = {
    username: "João Silva",
    // avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    status: "Pro Gamer"
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
    
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [restrictedModalOpen, setRestrictedModalOpen] = useState(false);
  const [isServersMenuOpen, setIsServersMenuOpen] = useState(true);
  
  const serverMatch = location.pathname.match(/\/dashboard\/server\/([^/]+)/);
  const serverId = serverMatch ? serverMatch[1] : null;

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const toggleCollapse = () => {
    setIsCollapsed((prev: boolean) => {
      const newState = !prev;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
      return newState;
    });
  };

  const handleRestrictedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRestrictedModalOpen(true);
  };

  const publicNavItems = [
    { name: "Página Inicial", path: "/", icon: Home, exact: true },
    { name: "Servidores Públicos", path: "/servidores-publicos", icon: Server },
        { name: "Sobre a Plataforma", path: "/about", icon: Info },
    { name: "Central de Ajuda", path: "/help", icon: HelpCircle },
  ];

  const protectedGroups = [
    {
      
      items: [
        { 
          name: "Meus Servidores", 
          icon: Server,
          isExpandable: true,
          isOpen: isServersMenuOpen,
          onToggle: () => setIsServersMenuOpen(!isServersMenuOpen),
          subItems: [
            { name: "Lista de Servidores", path: "/meus-servidores", icon: List, exact: true },
            { name: "Criar Servidor", path: "/meus-servidores/criar", icon: PlusCircle },
          ]
        },
        { name: "Servidores Curtidos", path: "/dashboard/liked", icon: Heart },
        { name: "Notificações", path: "/dashboard/notifications", icon: Bell, badge: isAuthenticated ? 3 : undefined },
      ]
    },
    ...(serverId ? [{
      title: "Gerenciamento do Servidor",
      items: [
        { name: "Visão Geral", path: `/dashboard/server/${serverId}`, icon: Activity, exact: true },
        { name: "Console", path: `/dashboard/server/${serverId}/console`, icon: Terminal },
        { name: "Arquivos", path: `/dashboard/server/${serverId}/files`, icon: Folder },
        { name: "Monitoramento", path: `/dashboard/server/${serverId}/monitor`, icon: Database },
        { name: "Backups", path: `/dashboard/server/${serverId}/backups`, icon: HardDrive },
        { name: "Configurações", path: `/dashboard/server/${serverId}/settings`, icon: Settings },
        { name: "Logs", path: `/dashboard/server/${serverId}/logs`, icon: FileText },
        { name: "Usuários do Servidor", path: `/dashboard/server/${serverId}/users`, icon: Users },
      ]
    }] : [])
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#0f1115] text-gray-800 dark:text-gray-200 font-sans selection:bg-indigo-500/30">
      
      <RestrictedModal isOpen={restrictedModalOpen} onClose={() => setRestrictedModalOpen(false)} />

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 bg-[#16181C] dark:bg-[#16181C] border-r border-gray-200 dark:border-white/5 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-[240px]",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* User Profile Block at Top */}
        <div className="shrink-0 pt-6 px-4 pb-4 relative group flex flex-col">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 w-full">
              <div className="relative shrink-0">
                {mockUser.avatarUrl ? (
                  <img 
                    src={mockUser.avatarUrl} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-[#2B2D31]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#ff7b9e] flex items-center justify-center text-white font-bold text-sm">
                    {mockUser.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className={cn("flex-1 overflow-hidden transition-opacity", isCollapsed && "lg:hidden")}>
                <p className="text-[10px] font-extrabold text-[#949BA4] uppercase tracking-wider mb-0.5">Product Manager</p>
                <p className="text-[15px] font-bold text-[#F2F3F5] truncate leading-tight">{mockUser.username}</p>
              </div>
            </div>
          ) : (
            <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "")}>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-white/10">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className={cn("flex-1 overflow-hidden", isCollapsed && "hidden")}>
                <p className="text-sm font-semibold text-white truncate">Visitante</p>
                <p className="text-xs text-gray-500 truncate">Sem conta</p>
              </div>
            </div>
          )}

          {/* Collapse Button floating on right side of profile block */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-8 bg-[#1E1F22] border border-white/5 p-1 rounded text-[#949BA4] hover:text-white hidden lg:flex items-center justify-center shadow-sm z-50 transition-transform hover:scale-105"
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar flex flex-col gap-1">
          {/* Main Category */}
          <div className={cn(
            "px-2 pt-2 pb-1 mt-2 text-[11px] font-extrabold text-[#949BA4] uppercase tracking-wider",
            isCollapsed && "lg:hidden text-center"
          )}>
            Main
          </div>

          {publicNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);

            return (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded text-[15px] font-medium transition-colors duration-150",
                    isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                    isActive 
                      ? "bg-[#2B2D31] text-white" 
                      : "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
                  )}
                >
                  <Icon className={cn("w-[20px] h-[20px] shrink-0", isActive ? "text-white" : "text-[#949BA4] group-hover:text-[#DBDEE1]")} />
                  <span className={cn(
                    "flex-1 whitespace-nowrap transition-opacity duration-150", 
                    isCollapsed && "lg:hidden"
                  )}>
                    {item.name}
                  </span>
                </Link>
                {isCollapsed && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#2B2D31] border border-white/5 text-white text-xs font-medium rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap lg:block hidden">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}

          {/* Protected Groups */}
          {protectedGroups.map((group, idx) => (
            <div key={idx}>
              {group.title && (
                <div className={cn(
                  "px-2 pt-6 pb-1 text-[11px] font-extrabold text-[#949BA4] uppercase tracking-wider",
                  isCollapsed && "lg:hidden text-center"
                )}>
                  {group.title}
                </div>
              )}
              
              {group.items.map((item: any) => {
                const Icon = item.icon;
                const isActive = item.exact 
                  ? location.pathname === item.path 
                  : location.pathname.startsWith(item.path);

                if (item.isExpandable) {
                  return (
                    <div key="expandable" className="space-y-0.5">
                      <button
                        onClick={item.onToggle}
                        className={cn(
                          "w-full flex items-center justify-between rounded text-[15px] font-medium transition-colors duration-150",
                          isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                          "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-[20px] h-[20px] shrink-0 text-[#949BA4]" />
                          <span className={cn("whitespace-nowrap", isCollapsed && "lg:hidden")}>
                            {item.name}
                          </span>
                        </div>
                        {!isCollapsed && (
                          <ChevronDown className={cn("w-[16px] h-[16px] transition-transform duration-200 shrink-0", item.isOpen ? "rotate-180" : "")} />
                        )}
                      </button>
                      
                      {item.isOpen && !isCollapsed && (
                        <div className="relative pl-[1.15rem] space-y-0.5 mt-0.5 animate-in slide-in-from-top-1 duration-200">
                          {/* Vertical connecting line */}
                          <div className="absolute left-[24px] top-0 bottom-4 w-px bg-[#313338]"></div>
                          
                          {item.subItems.map((subItem: any) => {
                            const SubIcon = subItem.icon;
                            const isSubActive = subItem.exact 
                              ? location.pathname === subItem.path 
                              : location.pathname.startsWith(subItem.path);
                            
                            return (
                              <div key={subItem.path} className="relative flex items-center">
                                {/* Horizontal connecting line */}
                                <div className="absolute left-[3px] top-[15.5px] w-3 h-px bg-[#313338]"></div>
                                <Link
                                  to={subItem.path}
                                  className={cn(
                                    "flex items-center gap-3 w-full px-2.5 py-1.5 rounded text-[14px] font-medium transition-colors duration-150 ml-4",
                                    isSubActive 
                                      ? "bg-[#2B2D31] text-[#DBDEE1]" 
                                      : "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
                                  )}
                                >
                                  {SubIcon && <SubIcon className={cn("w-4 h-4 shrink-0", isSubActive ? "text-[#DBDEE1]" : "text-[#949BA4]")} />}
                                  <span className="whitespace-nowrap">{subItem.name}</span>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.path} className="relative group">
                    {item.path ? (
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center rounded text-[15px] font-medium transition-colors duration-150",
                          isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                          isActive 
                            ? "bg-[#2B2D31] text-white" 
                            : "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
                        )}
                        onClick={item.onClick}
                      >
                        <Icon className={cn("w-[20px] h-[20px] shrink-0", isActive ? "text-white" : "text-[#949BA4] group-hover:text-[#DBDEE1]")} />
                        <span className={cn(
                          "flex-1 whitespace-nowrap transition-opacity duration-150 flex justify-between items-center", 
                          isCollapsed && "lg:hidden"
                        )}>
                          {item.name}
                          {item.badge && (
                            <span className="bg-[#5865F2] text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        {isActive && !isCollapsed && (
                          <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full hidden" />
                        )}
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className={cn(
                          "w-full flex items-center rounded text-[15px] font-medium transition-colors duration-150",
                          isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                          "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
                        )}
                      >
                        <Icon className="w-[20px] h-[20px] shrink-0 text-[#949BA4]" />
                        <span className={cn(
                          "flex-1 text-left whitespace-nowrap transition-opacity duration-150", 
                          isCollapsed && "lg:hidden"
                        )}>
                          {item.name}
                        </span>
                      </button>
                    )}
                    
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-[#2B2D31] border border-white/5 text-white text-xs font-medium rounded shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap lg:block hidden">
                        {item.name}
                        {!isAuthenticated && " (Restrito)"}
                        {item.badge && <span className="ml-2 bg-[#5865F2] text-white px-1.5 py-0.5 rounded-full text-[9px]">{item.badge}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          
          <div className="mt-auto pt-6 space-y-0.5">
            <div className="h-px bg-white/5 my-4 mx-2"></div>
            
            <Link
              to="/help"
              className={cn(
                "flex items-center rounded text-[15px] font-medium transition-colors duration-150",
                isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                "text-[#949BA4] hover:text-[#DBDEE1] hover:bg-[#2B2D31]/50"
              )}
            >
              <HelpCircle className="w-[20px] h-[20px] shrink-0 text-[#949BA4]" />
              <span className={cn(
                "flex-1 whitespace-nowrap transition-opacity duration-150", 
                isCollapsed && "lg:hidden"
              )}>
                Help
              </span>
            </Link>

            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={cn(
                  "w-full flex items-center rounded text-[15px] font-medium transition-colors duration-150",
                  isCollapsed ? "justify-center p-2.5" : "px-2.5 py-1.5 gap-3",
                  "text-[#F1888B] hover:bg-[#DA373C]/10"
                )}
              >
                <LogOut className="w-[20px] h-[20px] shrink-0 text-[#F1888B]" />
                <span className={cn(
                  "flex-1 text-left whitespace-nowrap transition-opacity duration-150", 
                  isCollapsed && "lg:hidden"
                )}>
                  Logout Account
                </span>
              </button>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Mobile Navbar */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 bg-white dark:bg-[#2B2D31] border-b border-gray-200 dark:border-white/5 shrink-0 z-30">
          <div className="flex items-center gap-3 text-indigo-400">
            <Server className="w-6 h-6" />
            <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">MyServer</span>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-white/5 rounded-md transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <Outlet />
          <Toaster position="bottom-right" richColors />
        </main>

      </div>
    </div>
  );
}
