import React from "react";
import { PLANS } from "../data/mock";
import { Check } from "lucide-react";

export function Plans() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Escolha o plano ideal para você</h1>
        <p className="text-gray-600 dark:text-gray-400">Hospedagem de alta performance com proteção DDoS, painel intuitivo e suporte especializado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-[#16191f] border border-gray-200 dark:border-white/5 rounded-2xl p-8 flex flex-col hover:border-indigo-500/50 transition-all">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-extrabold text-indigo-400">{plan.price}</span>
              <span className="text-gray-500 text-sm">/mês</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> {plan.ram} RAM
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> {plan.cpu}
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> {plan.storage}
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> Slots {plan.slots}
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> Backups: {plan.backups}
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <Check className="w-4 h-4 text-emerald-500" /> Suporte {plan.support}
              </li>
            </ul>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition">
              Contratar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
