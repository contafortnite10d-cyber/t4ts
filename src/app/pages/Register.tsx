import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Server,
  ShieldCheck,
  UploadCloud,
  TerminalSquare,
  LayoutDashboard,
  CheckCircle2,
  Check,
  Github
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";

// Schema for validation
const registerSchema = z
  .object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    username: z
      .string()
      .min(3, "Mínimo de 3 caracteres")
      .max(20, "Máximo de 20 caracteres")
      .regex(/^[a-zA-Z0-9_]+$/, "Apenas letras, números e '_' são permitidos"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Pelo menos um caractere especial"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const passwordRequirements = [
  { id: "length", label: "Mínimo de 8 caracteres", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "Pelo menos uma letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "Pelo menos uma letra minúscula", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "Pelo menos um número", test: (p: string) => /[0-9]/.test(p) },
  { id: "special", label: "Pelo menos um caractere especial", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password");

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (!password) return { score: 0, label: "Muito fraca", color: "bg-gray-700" };

    passwordRequirements.forEach((req) => {
      if (req.test(password)) score++;
    });

    if (score <= 1) return { score, label: "Muito fraca", color: "bg-red-500" };
    if (score === 2) return { score, label: "Fraca", color: "bg-orange-500" };
    if (score === 3) return { score, label: "Média", color: "bg-yellow-500" };
    if (score === 4) return { score, label: "Forte", color: "bg-emerald-400" };
    return { score, label: "Muito forte", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API Call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Mock Payload:", {
        nome: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Conta criada com sucesso!", {
        description: "Você será redirecionado para o login.",
      });
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao criar conta", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d0f14] flex">
      {/* LEFT COLUMN - INSTITUTIONAL (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col w-[45%] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-white/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col p-12 h-full justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Server className="w-5 h-5 text-gray-900 dark:text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                MyServer
              </span>
            </Link>
            
            <div className="mt-16 space-y-4">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
                Gerencie seus servidores de Minecraft e Terraria em um só lugar.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A plataforma definitiva para criar, escalar e administrar suas comunidades com facilidade.
              </p>
            </div>

            <div className="mt-12 space-y-5">
              {[
                { icon: ShieldCheck, text: "Gerenciamento completo dos seus servidores" },
                { icon: Server, text: "Monitoramento em tempo real" },
                { icon: UploadCloud, text: "Upload e gerenciamento de arquivos" },
                { icon: CheckCircle2, text: "Backups automáticos e regulares" },
                { icon: TerminalSquare, text: "Console integrado no navegador" },
                { icon: LayoutDashboard, text: "Painel moderno, intuitivo e responsivo" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 shrink-0">
                    <item.icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl h-64 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" 
              alt="Servers Setup" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - FORM */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 relative overflow-y-auto">
        <Link to="/" className="lg:hidden flex items-center gap-3 mb-10 absolute top-8 left-6 sm:left-12">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <Server className="w-4 h-4 text-gray-900 dark:text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            MyServer
          </span>
        </Link>

        <div className="w-full max-w-md mx-auto mt-16 lg:mt-0">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">Criar Conta</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Crie sua conta gratuitamente e comece a utilizar o MyServer.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:ring-indigo-500 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Nome de Usuário</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Escolha um nome de usuário"
                          className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:ring-indigo-500 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Digite seu e-mail"
                          className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:ring-indigo-500 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Crie uma senha"
                            className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:ring-indigo-500 h-11 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 focus:outline-none"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      
                      {/* Password Strength Indicator */}
                      {field.value.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400 font-medium">Força da senha:</span>
                            <span className={`font-semibold ${
                              strength.score <= 1 ? "text-red-400" :
                              strength.score === 2 ? "text-orange-400" :
                              strength.score === 3 ? "text-yellow-400" :
                              "text-emerald-400"
                            }`}>
                              {strength.label}
                            </span>
                          </div>
                          <div className="flex gap-1 h-1.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`flex-1 rounded-full transition-colors duration-300 ${
                                  level <= strength.score ? strength.color : "bg-white/10"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-2 mt-2">
                            {passwordRequirements.map((req) => {
                              const isMet = req.test(field.value);
                              return (
                                <div key={req.id} className="flex items-center gap-1.5 text-xs">
                                  <Check className={`w-3.5 h-3.5 ${isMet ? "text-emerald-400" : "text-gray-600"}`} />
                                  <span className={isMet ? "text-gray-700 dark:text-gray-300" : "text-gray-500"}>
                                    {req.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <FormMessage className="text-red-400 mt-2" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">Confirmar Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-600 focus-visible:ring-indigo-500 h-11 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 focus:outline-none"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20 mt-8 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Criando conta...
                  </div>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
