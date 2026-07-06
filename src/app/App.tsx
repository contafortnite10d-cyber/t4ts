import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppLayout } from "./layouts/AppLayout";
import { Home } from "./pages/Home";
import { HelpCenter } from "./pages/HelpCenter";
import { PublicServers } from "./pages/PublicServers";
import { GamePage } from "./pages/GamePage";
import { ServerView } from "./pages/ServerView";
import { Plans } from "./pages/Plans";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { ManageServer } from "./pages/ManageServer";
import { Register } from "./pages/Register";
import { LikedServers } from "./pages/LikedServers";

import { PlanManagement } from "./pages/PlanManagement";
import { CreateServer } from "./pages/CreateServer";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="myserver-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Global Layout */}
          <Route element={<AppLayout />}>
            
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            
            {/* Public Servers Flow */}
            <Route path="/servidores-publicos" element={<PublicServers />} />
            <Route path="/servidores-publicos/:game" element={<GamePage />} />
            
            {/* Redirects for legacy routes */}
            <Route path="/public" element={<Navigate to="/servidores-publicos" replace />} />
            <Route path="/minecraft" element={<Navigate to="/servidores-publicos/minecraft" replace />} />
            <Route path="/terraria" element={<Navigate to="/servidores-publicos/terraria" replace />} />

            <Route path="/server/:id" element={<ServerView />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-8 text-white"><h1 className="text-2xl font-bold">Sobre a Plataforma em breve...</h1></div>} />
            <Route path="/help" element={<HelpCenter />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cadastro" element={<Navigate to="/register" replace />} />

            {/* Protected Routes */}
            <Route path="/meus-servidores">
              <Route index element={<div className="container mx-auto p-6 text-white"><h1 className="text-xl font-bold">Lista de Servidores em construção...</h1></div>} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="criar" element={<CreateServer />} />
              <Route path="historico" element={<div className="container mx-auto p-6 text-white"><h1 className="text-xl font-bold">Histórico de Assinaturas em construção...</h1></div>} />
              <Route path="curtidos" element={<LikedServers />} />
            </Route>

            <Route path="/dashboard">
              <Route index element={<Navigate to="/meus-servidores/dashboard" replace />} />
              <Route path="servers" element={<Navigate to="/meus-servidores" replace />} />
              <Route path="server/:id" element={<ManageServer />} />
              <Route path="favorites" element={<LikedServers />} />
              <Route path="liked" element={<LikedServers />} />
              <Route path="plan" element={<PlanManagement />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<div className="container mx-auto p-6 text-white"><h1 className="text-xl font-bold">Em construção...</h1></div>} />
            </Route>

          </Route>
          
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
