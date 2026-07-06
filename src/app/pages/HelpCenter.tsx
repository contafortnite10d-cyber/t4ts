import React, { useState } from "react";
import { Search, Book, LifeBuoy, ChevronDown, Send, MessageSquare } from "lucide-react";
import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

export function HelpCenter() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleSupportClick = () => {
    if (isAuthenticated) {
      setTicketModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to create ticket
    console.log({ subject, message });
    setTicketModalOpen(false);
    setSubject("");
    setMessage("");
  };

  const faqs = [
    {
      question: "Como criar um servidor?",
      answer: "Para criar um servidor, faça login na sua conta, acesse a página 'Meus Servidores' no painel de controle e clique em 'Criar Servidor'. Siga as instruções na tela para configurar as opções do seu jogo."
    },
    {
      question: "Como cancelar meu plano?",
      answer: "O cancelamento pode ser feito a qualquer momento na seção 'Planos e Assinaturas' do seu painel. Selecione o plano atual e clique em 'Cancelar assinatura'."
    },
    {
      question: "Quais jogos são suportados?",
      answer: "Apenas suportamos Minecraft e Terraria. Em atualizações futuras, serão adicionados mais jogos."
    },
    {
      question: "Como faço um upgrade do meu plano?",
      answer: "Você pode fazer um upgrade através do seu painel em 'Planos e Assinaturas'. O valor pro-rata será calculado automaticamente no momento do upgrade."
    }
  ];

  return (
    <div className="min-h-screen bg-[#313338] text-[#F2F3F5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header and Search */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Como podemos ajudar?</h1>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#B5BAC1]" />
              <input 
                type="text" 
                placeholder="Pesquise por dúvidas, guias ou termos..." 
                className="w-full bg-[#1E1F22] text-[#F2F3F5] placeholder-[#B5BAC1] pl-12 pr-4 py-4 rounded-xl border border-transparent focus:border-[#5865F2] focus:ring-1 focus:ring-[#5865F2] outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button className="flex items-start gap-4 p-6 bg-[#1E1F22] hover:bg-[#313338] border border-transparent hover:border-[#5865F2]/50 rounded-xl transition-all text-left group">
            <div className="bg-[#5865F2]/10 p-3 rounded-lg text-[#5865F2] group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F2F3F5] mb-1">Documentação</h2>
              <p className="text-[#B5BAC1] text-sm">Explore nossos guias e tutoriais passo a passo para configurar e gerenciar seus servidores.</p>
            </div>
          </button>
          
          <button 
            onClick={handleSupportClick}
            className="flex items-start gap-4 p-6 bg-[#1E1F22] hover:bg-[#313338] border border-transparent hover:border-[#5865F2]/50 rounded-xl transition-all text-left group"
          >
            <div className="bg-[#5865F2]/10 p-3 rounded-lg text-[#5865F2] group-hover:scale-110 transition-transform">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F2F3F5] mb-1">Contato / Suporte</h2>
              <p className="text-[#B5BAC1] text-sm">Não encontrou o que precisava? Abra um ticket e fale diretamente com a nossa equipe de especialistas.</p>
            </div>
          </button>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#F2F3F5] text-center mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openAccordion === index;
              return (
                <div 
                  key={index} 
                  className={clsx(
                    "bg-[#1E1F22] rounded-xl overflow-hidden border transition-colors",
                    isOpen ? "border-[#5865F2]/30" : "border-transparent"
                  )}
                >
                  <button 
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#313338] transition-colors focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-semibold text-[#F2F3F5]">{faq.question}</span>
                    <ChevronDown className={clsx("w-5 h-5 text-[#B5BAC1] transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <div 
                    className={clsx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-5 pt-1 text-[#B5BAC1] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Restricted Access Modal */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="sm:max-w-md bg-[#1E1F22] border-[#2B2D31] text-[#F2F3F5]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Acesso Restrito</DialogTitle>
            <DialogDescription className="text-[#B5BAC1] mt-2">
              Você precisa estar logado para abrir um ticket de suporte.
              Faça login ou crie uma conta para continuar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6">
            <Button
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
              onClick={() => {
                setLoginModalOpen(false);
                navigate("/login");
              }}
            >
              Entrar
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#2B2D31] hover:bg-[#2B2D31] text-[#F2F3F5] transition-colors"
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

      {/* Ticket Support Modal */}
      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="sm:max-w-lg bg-[#1E1F22] border-[#2B2D31] text-[#F2F3F5] p-0 overflow-hidden">
          <div className="p-6 pb-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-[#5865F2]" />
                Novo Ticket de Suporte
              </DialogTitle>
              <DialogDescription className="text-[#B5BAC1] mt-2">
                Descreva seu problema abaixo e nossa equipe retornará o mais breve possível.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <form onSubmit={handleSubmitTicket} className="p-6 pt-2 space-y-6">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-[#F2F3F5]">
                Assunto <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select 
                  id="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full appearance-none bg-[#2B2D31] text-[#F2F3F5] border border-transparent focus:border-[#5865F2] focus:ring-1 focus:ring-[#5865F2] rounded-lg px-4 py-3 outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Selecione uma categoria...</option>
                  <option value="lag">Problema de Lag / Performance (TPS baixo)</option>
                  <option value="files">Gerenciamento de Arquivos / FTP / Uploads</option>
                  <option value="players">Gerenciamento de Players / Banimentos</option>
                  <option value="dashboard">Dashboard / Console não responde</option>
                  <option value="billing">Dúvidas sobre Faturamento / Planos</option>
                  <option value="other">Outros</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#B5BAC1]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-[#F2F3F5]">
                Mensagem <span className="text-red-400">*</span>
              </label>
              <textarea 
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descreva o problema com o máximo de detalhes possível..."
                rows={5}
                className="w-full bg-[#2B2D31] text-[#F2F3F5] placeholder-[#B5BAC1] border border-transparent focus:border-[#5865F2] focus:ring-1 focus:ring-[#5865F2] rounded-lg px-4 py-3 outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button 
                type="submit" 
                disabled={!subject || !message.trim()}
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-6 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Abrir Ticket
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
