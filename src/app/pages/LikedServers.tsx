import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Heart, Gamepad2, Trash2, ExternalLink, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_SERVERS } from "../data/mock";
import { toast } from "sonner";

export function LikedServers() {
  const navigate = useNavigate();
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Mais Curtidos");

  useEffect(() => {
    const stored = localStorage.getItem("myserver-liked-servers");
    if (stored) {
      try {
        setLikedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar servidores curtidos:", e);
      }
    }
  }, []);

  const removeLiked = (id: string, name: string) => {
    const updated = likedIds.filter((likedId) => likedId !== id);
    setLikedIds(updated);
    localStorage.setItem("myserver-liked-servers", JSON.stringify(updated));
    toast.success(`${name} foi removido dos seus Servidores Curtidos.`);
  };

  // Filter & Sort servers
  const filteredServers = useMemo(() => {
    let result = MOCK_SERVERS.filter((server) => likedIds.includes(server.id));

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerSearch) ||
          s.game.toLowerCase().includes(lowerSearch) ||
          s.category.toLowerCase().includes(lowerSearch) ||
          s.tags.some((t) => t.toLowerCase().includes(lowerSearch))
      );
    }

    result = [...result].sort((a, b) => {
      if (sortOption === "Mais Curtidos") return b.likes - a.likes;
      if (sortOption === "Mais Jogadores") return b.playersOnline - a.playersOnline;
      if (sortOption === "Mais Recentes") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortOption === "Ordem Alfabética") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [likedIds, searchTerm, sortOption]);

  const hasAnyLiked = likedIds.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[calc(100vh-80px)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-indigo-500 transition">Início</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium">Servidores Curtidos</span>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Servidores Curtidos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gerencie os servidores públicos que você curtiu e acompanhe seu status em tempo real.
        </p>
      </div>

      {hasAnyLiked && (
        /* Filters and Search Bar */
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-white dark:bg-[#16191f] p-4 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar servidores curtidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500/50 transition-all placeholder-gray-500"
            />
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">Ordenar por:</span>
            <div className="flex bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/10 p-1 w-full md:w-auto">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1.5 outline-none appearance-none cursor-pointer w-full md:w-auto"
              >
                <option value="Mais Curtidos" className="bg-white dark:bg-[#16191f]">Mais Curtidos</option>
                <option value="Mais Jogadores" className="bg-white dark:bg-[#16191f]">Mais Jogadores</option>
                <option value="Mais Recentes" className="bg-white dark:bg-[#16191f]">Mais Recentes</option>
                <option value="Ordem Alfabética" className="bg-white dark:bg-[#16191f]">Ordem Alfabética</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {hasAnyLiked ? (
          filteredServers.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredServers.map((server) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={server.id}
                  onClick={() => navigate(`/server/${server.id}`)}
                  className="group flex flex-col bg-white dark:bg-[#1E1F22] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
                >
                  {/* Banner */}
                  <div className="relative h-40 w-full overflow-hidden bg-white dark:bg-[#1E1F22]">
                    <img
                      src={server.bannerUrl}
                      alt="Banner"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 border border-gray-200 dark:border-white/10 text-white">
                      <div className={`w-2 h-2 rounded-full ${server.status === "Online" ? "bg-[#23A559]" : "bg-[#80848E]"}`}></div>
                      {server.status}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col relative pt-10">
                    {/* Profile / Avatar */}
                    <img
                      src={server.avatarUrl}
                      alt="Avatar"
                      className="w-16 h-16 rounded-xl border-4 border-white dark:border-[#1E1F22] absolute -top-8 left-4 shadow-lg bg-white dark:bg-[#1E1F22]"
                    />

                    <div className="flex-1">
                      <div className="text-xs font-bold text-indigo-400 mb-1.5 uppercase tracking-wide">
                        {server.category}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-[#F2F3F5] text-xl leading-tight mb-2 group-hover:text-indigo-400 dark:group-hover:text-indigo-300 transition line-clamp-1">
                        {server.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        <Gamepad2 className="w-4 h-4 text-gray-500" />
                        <span className="truncate">{server.game}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-900 dark:text-white font-medium py-4 border-t border-gray-200 dark:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5" title="Jogadores">
                          <Users className="w-4 h-4 text-emerald-500" />
                          <span>
                            {server.playersOnline}
                            <span className="text-gray-500 text-xs">/{server.maxPlayers}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Curtidas">
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                          <span>{server.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/server/${server.id}`);
                        }}
                        className="col-span-4 text-center bg-gray-100 dark:bg-white/5 hover:bg-indigo-600 hover:text-white text-gray-900 dark:text-white font-medium py-2.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10 hover:border-indigo-500 flex items-center justify-center gap-1.5 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visualizar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeLiked(server.id, server.name);
                        }}
                        className="col-span-1 flex items-center justify-center bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg transition-colors border border-rose-500/20"
                        title="Remover dos Curtidos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-2xl p-8 max-w-xl mx-auto shadow-sm"
            >
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Não encontramos nenhum servidor curtido que corresponda a "{searchTerm}". Tente pesquisar por outro termo.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition"
              >
                Limpar Busca
              </button>
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-2xl p-8 max-w-xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Nenhum servidor curtido</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Você ainda não curtiu nenhum servidor público. Explore a lista de servidores e curta-os para acompanhá-los por aqui!
            </p>
            <Link
              to="/servidores-publicos"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-lg transition"
            >
              Explorar Servidores
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

