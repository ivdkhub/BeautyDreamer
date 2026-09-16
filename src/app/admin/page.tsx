"use client";
import { useState } from "react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("prenotazioni");
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === "admin@beautydreamer.it" && loginForm.password === "AdminBeauty2026!") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Credenziali non valide. Usa admin@beautydreamer.it / AdminBeauty2026!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-brand-charcoal mb-2">Admin Login</h1>
            <p className="text-sm text-brand-charcoal/60">Area riservata BeautyDreamer</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-semibold mb-1 text-brand-charcoal">Username</label>
              <input 
                type="email" required
                value={loginForm.username}
                onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="admin@beautydreamer.it"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1 text-brand-charcoal">Password</label>
              <input 
                type="password" required
                value={loginForm.password}
                onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="w-full btn-primary text-center">
              Accedi
            </button>

            <div className="text-xs text-center text-gray-500 mt-4">
              Demo: admin@beautydreamer.it / AdminBeauty2026!
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "prenotazioni", label: "Prenotazioni" },
    { id: "servizi", label: "Gestione Servizi" },
    { id: "galleria", label: "Galleria (Prima/Dopo)" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQ" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="font-serif text-2xl text-brand-charcoal">Dashboard Admin</h1>
            <button onClick={() => setIsAuthenticated(false)} className="text-sm font-semibold text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
          
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id 
                    ? "border-brand-gold text-brand-charcoal" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {activeTab === "prenotazioni" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Prenotazioni Recenti</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servizio</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data / Ora</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mario Rossi<br/><span className="text-gray-500 font-normal">333 1234567</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dry Manicure</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20 Set 2026<br/>Mattina</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Attesa</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-brand-gold hover:text-brand-charcoal mr-3">Conferma</button>
                      <button className="text-red-600 hover:text-red-900">Annulla</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Laura Bianchi<br/><span className="text-gray-500 font-normal">333 7654321</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ricostruzione Gel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22 Set 2026<br/>Pomeriggio</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confermata</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-600 hover:text-gray-900">Modifica</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== "prenotazioni" && (
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-h-[400px] text-gray-500">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <p className="text-lg">Modulo "{tabs.find(t => t.id === activeTab)?.label}" in costruzione.</p>
            <p className="text-sm mt-2">In questa sezione potrai inserire e modificare i dati del database.</p>
          </div>
        )}

      </div>
    </div>
  );
}
