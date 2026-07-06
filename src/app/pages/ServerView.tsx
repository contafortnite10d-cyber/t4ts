import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_SERVERS } from "../data/mock";
import { Users, Heart, Share2, AlertTriangle, ShieldCheck, Gamepad2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function ServerView() {
  const { id } = useParams();
  const server = MOCK_SERVERS.find((s) => s.id === id) || MOCK_SERVERS[0];

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("myserver-liked-servers");
    if (stored) {
      try {
        const likedIds = JSON.parse(stored);
        if (Array.isArray(likedIds)) {
          setIsLiked(likedIds.includes(server.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [server.id]);

  const toggleLike = () => {
    const stored = localStorage.getItem("myserver-liked-servers");
    let likedIds: string[] = [];
    if (stored) {
      try {
        likedIds = JSON.parse(stored);
        if (!Array.isArray(likedIds)) likedIds = [];
      } catch (e) {
        likedIds = [];
      }
    }

    if (likedIds.includes(server.id)) {
      likedIds = likedIds.filter((likedId) => likedId !== server.id);
      setIsLiked(false);
      toast.success(`Você removeu ${server.name} dos seus Servidores Curtidos.`);
    } else {
      likedIds.push(server.id);
      setIsLiked(true);
      toast.success(`${server.name} foi adicionado aos seus Servidores Curtidos!`);
    }

    localStorage.setItem("myserver-liked-servers", JSON.stringify(likedIds));
  };

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[400px] w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/10">
        <img src={server.bannerUrl} alt="Banner" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4 translate-y-1/3 flex flex-col md:flex-row items-end md:items-center gap-6">
            <img src={server.avatarUrl} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-white dark:border-[#0f1115] shadow-2xl bg-white dark:bg-[#16191f]" />
            <div className="flex-1 pb-4 md:pb-0">
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm mb-1">
                <Gamepad2 className="w-4 h-4" />
                {server.game} • {server.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{server.name}</h1>
            </div>
            <div className="flex items-center gap-3 pb-4 md:pb-0">
              <button className="flex items-center gap-2 bg-white dark:bg-[#16191f] hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition text-sm">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
              <button 
                onClick={toggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition text-sm border ${
                  isLiked 
                    ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600" 
                    : "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/20"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} /> {isLiked ? "Curtido" : "Curtir"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sobre o Servidor</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {server.description}
            </p>
          </div>

          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Regras</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Respeite os demais jogadores.</li>
              <li>Proibido uso de hacks, cheats ou exploits.</li>
              <li>Não divulgar outros servidores.</li>
              <li>Leia o regulamento completo no Discord.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Comentários</h2>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <textarea 
                  placeholder="Faça login para comentar..." 
                  className="w-full bg-gray-100 dark:bg-[#0f1115] border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-indigo-500/50 min-h-[100px] resize-none"
                  disabled
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <Link to="/login" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">
                    Entrar para comentar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Estatísticas</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Status</span>
                <span className="text-gray-900 dark:text-white font-medium">{server.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Jogadores</span>
                <span className="text-gray-900 dark:text-white font-medium">{server.playersOnline} / {server.maxPlayers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Likes</span>
                <span className="text-gray-900 dark:text-white font-medium">{server.likes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Tempo Online</span>
                <span className="text-gray-900 dark:text-white font-medium">99.8%</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/5 space-y-4">
               <div className="flex flex-col gap-1">
                 <span className="text-xs text-gray-500 font-medium uppercase">IP do Servidor</span>
                 <div className="bg-gray-100 dark:bg-[#0f1115] border border-gray-200 dark:border-white/10 rounded-md p-2 flex items-center justify-between">
                    <span className="font-mono text-indigo-400 text-sm">play.myserver.com:25565</span>
                    <button className="text-xs bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-2 py-1 rounded">Copiar</button>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Links Uteis</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white p-2 rounded-md hover:bg-gray-100 dark:bg-white/5 transition">
                <span className="flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Discord</span>
              </a>
              <a href="#" className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white p-2 rounded-md hover:bg-gray-100 dark:bg-white/5 transition">
                <span className="flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Website</span>
              </a>
              <a href="#" className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white p-2 rounded-md hover:bg-gray-100 dark:bg-white/5 transition">
                <span className="flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Loja</span>
              </a>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-rose-400 transition py-2">
            <AlertTriangle className="w-4 h-4" />
            Denunciar Servidor
          </button>
        </div>

      </div>
    </div>
  );
}
