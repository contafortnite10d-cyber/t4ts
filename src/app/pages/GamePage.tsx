import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { Users, Heart, Gamepad2, Search, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_SERVERS, MINECRAFT_CATEGORIES, TERRARIA_CATEGORIES } from "../data/mock";

export function GamePage() {
  const { game } = useParams<{ game: string }>();
  const navigate = useNavigate();
  
  if (game !== "minecraft" && game !== "terraria") {
    return <Navigate to="/" replace />;
  }

  const isMinecraft = game === "minecraft";
  const GAME_NAME = isMinecraft ? "Minecraft" : "Terraria";
  const CATEGORIES = isMinecraft ? MINECRAFT_CATEGORIES : TERRARIA_CATEGORIES;
  const BANNER_URL = isMinecraft 
    ? "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=1920&q=80" 
    : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1920&q=80";

  const allGameServers = useMemo(() => MOCK_SERVERS.filter(s => s.game === GAME_NAME), [GAME_NAME]);
  const totalPlayers = useMemo(() => allGameServers.reduce((acc, s) => acc + s.playersOnline, 0), [allGameServers]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("Mais Populares");
  const [visibleCount, setVisibleCount] = useState(12);
  const [isGameSelectorOpen, setIsGameSelectorOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsGameSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort
  const filteredServers = useMemo(() => {
    let result = allGameServers;

    if (selectedCategory) {
      result = result.filter(s => s.category === selectedCategory);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(lowerSearch) ||
        s.category.toLowerCase().includes(lowerSearch) ||
        s.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    result = [...result].sort((a, b) => {
      if (sortOption === "Mais Populares") return b.playersOnline - a.playersOnline; 
      if (sortOption === "Mais Jogadores") return b.playersOnline - a.playersOnline;
      if (sortOption === "Mais Curtidos") return b.likes - a.likes;
      if (sortOption === "Mais Recentes") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortOption === "Ordem Alfabética") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [allGameServers, searchTerm, selectedCategory, sortOption]);

  const visibleServers = filteredServers.slice(0, visibleCount);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleCount < filteredServers.length) {
          setVisibleCount(prev => prev + 12);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredServers.length]);

  // Reset states on game change or filter change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm, selectedCategory, sortOption, game]);

  useEffect(() => {
    setSelectedCategory(null);
    setSearchTerm("");
  }, [game]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 800 : 300;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0f14] pb-16">
      {/* GAME HEADER HERO */}
      <div className="relative h-[40vh] min-h-[300px] flex items-end pb-12 mb-12">
        <img src={BANNER_URL} alt={GAME_NAME} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0d0f14] via-gray-50/60 dark:via-[#0d0f14]/60 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 drop-shadow-lg">
              {GAME_NAME}
            </h1>
            <div className="flex items-center gap-6 text-lg font-medium">
              <span className="flex items-center gap-2 text-gray-900 dark:text-white/90">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                {allGameServers.length} Servidores Públicos
              </span>
              <span className="flex items-center gap-2 text-gray-900 dark:text-white/70">
                <Users className="w-5 h-5" />
                {totalPlayers} Jogadores Online
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* SEARCH BAR */}
        <div className="max-w-4xl mx-auto mb-16 relative -mt-20 z-20">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`Pesquisar servidores de ${GAME_NAME}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1c1f26] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-2xl pl-14 pr-6 py-4 text-lg outline-none focus:border-indigo-500/50 focus:bg-[#232730] transition-all shadow-2xl placeholder-gray-500"
          />
        </div>

        {/* CATEGORIES CAROUSEL */}
        <div className="mb-16 relative group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categorias</h2>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CATEGORIES.map(category => {
                const isSelected = selectedCategory === category.id;
                const count = allGameServers.filter(s => s.category === category.id).length;
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                    className={`
                      flex-none w-[80vw] md:w-[40vw] lg:w-[22%] h-40 md:h-56 rounded-2xl overflow-hidden relative group/card cursor-pointer snap-start
                      transition-all duration-300 transform 
                      ${isSelected ? 'ring-4 ring-indigo-500 scale-[1.02] shadow-2xl shadow-indigo-500/20' : 'hover:scale-[1.02] hover:shadow-xl'}
                    `}
                  >
                    <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{count} servidores</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Arrows */}
            <button 
              onClick={() => scrollCarousel('right')}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/10 rounded-full items-center justify-center text-white shadow-xl hover:bg-indigo-500 hover:border-indigo-500 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* PUBLIC SERVERS LIST */}
        <div>
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Servidores Públicos</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* GAME SELECTOR DROPDOWN */}
              <div className="relative" ref={selectorRef}>
                <button 
                  onClick={() => setIsGameSelectorOpen(!isGameSelectorOpen)}
                  className="flex items-center justify-between w-full sm:w-56 bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/10 hover:border-indigo-500/50 text-gray-900 dark:text-white rounded-lg px-4 py-2.5 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className={`w-5 h-5 ${isMinecraft ? "text-emerald-400" : "text-green-400"}`} />
                    <span className="font-semibold">{GAME_NAME}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${isGameSelectorOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isGameSelectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-full sm:w-56 bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <div className="flex flex-col p-1.5 gap-1.5">
                        <button
                          onClick={() => {
                            navigate("/servidores-publicos/minecraft");
                            setIsGameSelectorOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isMinecraft ? "bg-indigo-500/10 text-white font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white"
                          }`}
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                             <img src="https://cdn-icons-png.flaticon.com/512/888/888856.png" alt="Minecraft" className="w-full h-full object-contain filter brightness-0 invert opacity-90" />
                          </div>
                          <span>Minecraft</span>
                        </button>
                        <button
                          onClick={() => {
                            navigate("/servidores-publicos/terraria");
                            setIsGameSelectorOpen(false);
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            !isMinecraft ? "bg-indigo-500/10 text-white font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-white/5 hover:text-gray-900 dark:text-white"
                          }`}
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888846.png" alt="Terraria" className="w-full h-full object-contain filter brightness-0 invert opacity-90" />
                          </div>
                          <span>Terraria</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SORT SELECTOR */}
              <div className="flex bg-white dark:bg-[#16191f] rounded-lg border border-gray-200 dark:border-white/10 p-1">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 outline-none appearance-none cursor-pointer"
                >
                  <option value="Mais Populares" className="bg-white dark:bg-[#16191f]">Mais Populares</option>
                  <option value="Mais Jogadores" className="bg-white dark:bg-[#16191f]">Mais Jogadores</option>
                  <option value="Mais Curtidos" className="bg-white dark:bg-[#16191f]">Mais Curtidos</option>
                  <option value="Mais Recentes" className="bg-white dark:bg-[#16191f]">Mais Recentes</option>
                  <option value="Ordem Alfabética" className="bg-white dark:bg-[#16191f]">Ordem Alfabética</option>
                </select>
              </div>
            </div>
          </div>

          {/* SERVER CARDS GRID */}
          {visibleServers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleServers.map((server) => (
                <div key={server.id} className="group flex flex-col bg-white dark:bg-[#1E1F22] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10">
                  <div className="relative h-44 w-full overflow-hidden bg-white dark:bg-[#1E1F22]">
                    <img src={server.bannerUrl} alt="Banner" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 border border-gray-200 dark:border-white/10 text-white">
                      <div className={`w-2 h-2 rounded-full ${server.status === 'Online' ? 'bg-[#23A559]' : 'bg-[#80848E]'}`}></div>
                      {server.status}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col relative pt-10">
                    <img src={server.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-xl border-4 border-white dark:border-[#1E1F22] absolute -top-8 left-4 shadow-lg bg-white dark:bg-[#1E1F22]" />
                    
                    <div className="flex-1">
                      <div className="text-xs font-bold text-indigo-400 mb-1.5 uppercase tracking-wide">{server.category}</div>
                      <h3 className="font-bold text-gray-900 dark:text-[#F2F3F5] text-xl leading-tight mb-2 group-hover:text-indigo-300 transition line-clamp-1">{server.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        <Gamepad2 className="w-4 h-4 text-gray-500" />
                        <span className="truncate">{server.game}</span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">{server.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {server.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/5">{tag}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-900 dark:text-white font-medium py-4 border-t border-gray-200 dark:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5" title="Jogadores">
                          <Users className="w-4 h-4 text-emerald-400" /> 
                          <span>{server.playersOnline}<span className="text-gray-500 text-xs">/{server.maxPlayers}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5" title="Curtidas">
                          <Heart className="w-4 h-4 text-rose-400" /> 
                          <span>{server.likes}</span>
                        </div>
                      </div>
                    </div>

                    <Link 
                      to={`/server/${server.id}`} 
                      className="w-full block text-center bg-gray-100 dark:bg-white/5 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors border border-gray-200 dark:border-white/10 hover:border-indigo-500"
                    >
                      Visualizar Servidor
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl text-gray-600 dark:text-gray-400 font-medium">Nenhum servidor encontrado com estes filtros.</h3>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          {visibleCount < filteredServers.length && (
            <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
