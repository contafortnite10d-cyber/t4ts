export const MINECRAFT_CATEGORIES = [
  { id: "Survival", name: "Survival", image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80" },
  { id: "PvP", name: "PvP", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
  { id: "SkyBlock", name: "SkyBlock", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" },
  { id: "Prison", name: "Prison", image: "https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&w=600&q=80" },
  { id: "Vanilla", name: "Vanilla", image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=600&q=80" },
  { id: "Hardcore", name: "Hardcore", image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=600&q=80" },
  { id: "Economia", name: "Economia", image: "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?auto=format&fit=crop&w=600&q=80" },
  { id: "Criativo", name: "Criativo", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80" },
  { id: "Minigames", name: "Minigames", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" },
  { id: "Factions", name: "Factions", image: "https://images.unsplash.com/photo-1574360773950-8919bd1e9a26?auto=format&fit=crop&w=600&q=80" },
  { id: "Modpack", name: "Modpack", image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=600&q=80" },
  { id: "Roleplay", name: "Roleplay", image: "https://images.unsplash.com/photo-1542451313056-b7c8e6266459?auto=format&fit=crop&w=600&q=80" },
  { id: "Pixelmon", name: "Pixelmon", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80" },
  { id: "Eventos", name: "Eventos", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
];

export const TERRARIA_CATEGORIES = [
  { id: "Survival", name: "Survival", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=600&q=80" },
  { id: "Expert", name: "Expert", image: "https://images.unsplash.com/photo-1506485338023-6ce5f36692df?auto=format&fit=crop&w=600&q=80" },
  { id: "Master Mode", name: "Master Mode", image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=600&q=80" },
  { id: "Journey", name: "Journey", image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80" },
  { id: "PvP", name: "PvP", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" },
  { id: "Roleplay", name: "Roleplay", image: "https://images.unsplash.com/photo-1542451313056-b7c8e6266459?auto=format&fit=crop&w=600&q=80" },
  { id: "Vanilla", name: "Vanilla", image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=600&q=80" },
  { id: "Modded", name: "Modded (tModLoader)", image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=600&q=80" },
  { id: "Hardcore", name: "Hardcore", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80" },
  { id: "Construção", name: "Construção", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=600&q=80" },
  { id: "Eventos", name: "Eventos", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80" },
  { id: "Coop", name: "Coop", image: "https://images.unsplash.com/photo-1522069169874-c58e57ce8fc0?auto=format&fit=crop&w=600&q=80" },
];

export const MOCK_SERVERS = Array.from({ length: 80 }).map((_, i) => {
  const isMinecraft = i % 2 === 0;
  const game = isMinecraft ? "Minecraft" : "Terraria";
  const categories = isMinecraft ? MINECRAFT_CATEGORIES : TERRARIA_CATEGORIES;
  const category = categories[i % categories.length];
  
  const playersOnline = Math.floor(Math.random() * 200);
  const maxPlayers = playersOnline + Math.floor(Math.random() * 100) + 10;
  
  return {
    id: `server-${game.toLowerCase()}-${i}`,
    name: `${category.name} ${game} Server ${Math.floor(i/2) + 1}`,
    category: category.id,
    game,
    playersOnline,
    maxPlayers,
    status: Math.random() > 0.1 ? "Online" : "Offline",
    likes: Math.floor(Math.random() * 2000),
    description: `Um excelente servidor de ${game} focado em ${category.name.toLowerCase()}. Junte-se a uma comunidade incrível e jogue sem lag.`,
    tags: [category.id.toLowerCase(), "diversão", "brasil"],
    bannerUrl: category.image,
    avatarUrl: `https://i.pravatar.cc/150?u=${i + game}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  };
});

export const PUBLIC_SERVERS = MOCK_SERVERS.filter(s => s.game === "Minecraft");

export const PLANS = [
  {
    id: "basic",
    name: "Starter",
    price: "R$ 29,90",
    ram: "2 GB",
    cpu: "1 Core",
    storage: "20 GB NVMe",
    slots: "Ilimitado",
    backups: "1 Semanal",
    support: "Básico"
  },
  {
    id: "pro",
    name: "Pro Gamer",
    price: "R$ 79,90",
    ram: "8 GB",
    cpu: "3 Cores",
    storage: "60 GB NVMe",
    slots: "Ilimitado",
    backups: "Diário",
    support: "Prioritário"
  },
  {
    id: "ultra",
    name: "Ultra Dedicated",
    price: "R$ 149,90",
    ram: "16 GB",
    cpu: "6 Cores",
    storage: "120 GB NVMe",
    slots: "Ilimitado",
    backups: "Diário + Retenção",
    support: "24/7 VIP"
  }
];
