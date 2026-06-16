"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  ToggleRight, 
  ToggleLeft, 
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Activity,
  Copy,
  Download,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { QuantLoader } from "@/components/quant-loader";
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  tradingview_username?: string;
  tradingview_access_granted: boolean;
  telegram_username?: string;
  telegram_user_id?: string;
  subscription_status?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [updating, setUpdating] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortConfig]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccess = async (userId: string, currentStatus: boolean) => {
    setUpdating(userId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          tradingview_access_granted: !currentStatus 
        })
      });

      if (res.ok) {
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, tradingview_access_granted: !currentStatus } 
            : u
        ));
      } else {
        alert('Failed to update access status.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    } finally {
      setUpdating(null);
    }
  };

  const updateSubscription = async (userId: string, newStatus: string) => {
    setUpdating(userId);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, subscription_status: newStatus })
      });

      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, subscription_status: newStatus } : u));
      } else {
        alert('Failed to update subscription status.');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const term = search.toLowerCase();
    const matchesSearch = (
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.tradingview_username && user.tradingview_username.toLowerCase().includes(term)) ||
      (user.telegram_username && user.telegram_username.toLowerCase().includes(term))
    );
    
    const currentStatus = user.subscription_status || 'none';
    const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1 inline-block opacity-40 hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 inline-block text-red-500 drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]" /> 
      : <ArrowDown className="w-3 h-3 ml-1 inline-block text-red-500 drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]" />;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Subscription', 'Telegram', 'TradingView', 'TV_Access'];
    const csvContent = [
      headers.join(','),
      ...sortedUsers.map(u => 
        [
          u.id, 
          u.email, 
          u.subscription_status || 'none', 
          u.telegram_username || '', 
          u.tradingview_username || '', 
          u.tradingview_access_granted
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'veylanlabs_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage));
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeSubscribers = users.filter(u => u.subscription_status === 'active' || u.subscription_status === 'trialing').length;
  const telegramLinked = users.filter(u => !!u.telegram_username).length;
  const tvLinked = users.filter(u => !!u.tradingview_username).length;

  return (
    <>
      <div className="flex flex-col justify-between items-start mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-display tracking-widest uppercase text-foreground mb-1 flex items-center gap-3">
            <Users className="w-8 h-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            User Management
          </h1>
          <p className="text-muted-foreground font-sans">
            Monitor subscribers, analyze connection rates, and manage platform access.
          </p>
        </div>
        
        {/* Expanded Analytics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Total Users */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0 }} className="glass-premium rounded-2xl px-6 py-5 flex items-center gap-4 hover:border-red-500/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 font-mono">Total Users</div>
              <div className="text-2xl font-mono font-bold text-foreground">{users.length}</div>
            </div>
          </motion.div>
          {/* Card 2: Active Subs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="glass-premium rounded-2xl px-6 py-5 flex items-center gap-4 hover:border-emerald-500/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
              <ShieldAlert className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 font-mono">Active Subs</div>
              <div className="text-2xl font-mono font-bold text-foreground">{activeSubscribers}</div>
            </div>
          </motion.div>
          {/* Card 3: Telegram Linked */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="glass-premium rounded-2xl px-6 py-5 flex items-center gap-4 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 font-mono">TG Linked</div>
              <div className="text-2xl font-mono font-bold text-foreground">{telegramLinked}</div>
            </div>
          </motion.div>
          {/* Card 4: TV Linked */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="glass-premium rounded-2xl px-6 py-5 flex items-center gap-4 hover:border-amber-500/50 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 font-mono">TV Linked</div>
              <div className="text-2xl font-mono font-bold text-foreground">{tvLinked}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="glass-premium rounded-3xl p-6 relative overflow-hidden flex flex-col min-h-[600px] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.05)]">
        {/* Search Bar and Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search by email, TradingView, or Telegram..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
            />
          </div>
          
          <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 py-3.5 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-mono font-bold text-xs appearance-none cursor-pointer text-foreground"
            >
              <option value="all">ALL STATUSES</option>
              <option value="active">ACTIVE ONLY</option>
              <option value="none">NONE ONLY</option>
              <option value="canceled">CANCELED ONLY</option>
              <option value="past_due">PAST DUE ONLY</option>
            </select>
            
            <button 
              onClick={exportToCSV}
              className="w-full sm:w-auto px-6 py-3.5 bg-background border border-border rounded-xl font-mono font-bold text-xs text-foreground hover:border-red-500 hover:text-red-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap group cursor-pointer"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              EXPORT CSV
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center min-h-[300px]">
            <QuantLoader className="w-8 h-8 text-red-500" />
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto border border-border rounded-2xl bg-black/5 dark:bg-black/20 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)] dark:shadow-none scrollbar-none">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-muted/50 sticky top-0 z-10 backdrop-blur-md">
                <tr className="border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
                  <th className="py-4 pl-6 cursor-pointer hover:text-foreground transition-colors group" onClick={() => requestSort('email')}>
                    User / Email {getSortIcon('email')}
                  </th>
                  <th className="py-4 cursor-pointer hover:text-foreground transition-colors group" onClick={() => requestSort('subscription_status')}>
                    Subscription {getSortIcon('subscription_status')}
                  </th>
                  <th className="py-4 cursor-pointer hover:text-foreground transition-colors group" onClick={() => requestSort('telegram_username')}>
                    Telegram {getSortIcon('telegram_username')}
                  </th>
                  <th className="py-4 cursor-pointer hover:text-foreground transition-colors group" onClick={() => requestSort('tradingview_username')}>
                    TradingView {getSortIcon('tradingview_username')}
                  </th>
                  <th className="py-4 pr-6 text-right">TV Access Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Search className="w-10 h-10 mb-4 opacity-20" />
                        <p className="font-display text-xl tracking-widest uppercase">No users found</p>
                        <p className="text-sm font-mono mt-2">Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-all duration-300 group hover:shadow-[inset_4px_0_0_#ef4444]">
                      
                      {/* Email Column */}
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white border border-border shadow-inner group-hover:border-red-500/30 transition-colors font-mono">
                            {user.email?.[0]?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-foreground flex items-center gap-2">
                              {user.email}
                              <button onClick={() => copyToClipboard(user.email)} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all cursor-pointer hover:scale-110" title="Copy Email">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-[10px] text-muted-foreground font-mono mt-0.5 tracking-wider">ID: {user.id.slice(0, 12)}...</div>
                          </div>
                        </div>
                      </td>

                      {/* Subscription Status Column */}
                      <td className="py-4">
                        <select
                          value={user.subscription_status || 'none'}
                          onChange={(e) => updateSubscription(user.id, e.target.value)}
                          disabled={updating === user.id}
                          className={`text-[10px] font-bold px-2 py-1.5 rounded border focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors cursor-pointer appearance-none font-mono tracking-widest ${
                            user.subscription_status === 'active' || user.subscription_status === 'trialing'
                              ? 'bg-[var(--neon-dim)] text-[var(--neon)] border-[var(--neon)]/40 shadow-[0_0_10px_var(--neon-dim)]'
                              : 'bg-red-500/10 text-red-500 border-red-500/30 hover:border-red-500/50'
                          }`}
                        >
                          <option value="active" className="bg-background text-foreground">ACTIVE</option>
                          <option value="none" className="bg-background text-foreground">NONE</option>
                          <option value="canceled" className="bg-background text-foreground">CANCELED</option>
                          <option value="past_due" className="bg-background text-foreground">PAST DUE</option>
                        </select>
                      </td>

                      {/* Telegram Column */}
                      <td className="py-4">
                        {user.telegram_username ? (
                          <div>
                            <div className="font-bold text-sm text-blue-400 flex items-center gap-2">
                              {user.telegram_username}
                              <button onClick={() => copyToClipboard(user.telegram_username!)} className="opacity-0 group-hover:opacity-100 hover:text-foreground transition-all cursor-pointer hover:scale-110" title="Copy TG">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {user.telegram_user_id && (
                              <div className="text-[10px] text-muted-foreground font-mono mt-0.5 tracking-wider">ID: {user.telegram_user_id}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] tracking-widest font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">UNLINKED</span>
                        )}
                      </td>

                      {/* TradingView Column */}
                      <td className="py-4">
                        {user.tradingview_username ? (
                          <div className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                            {user.tradingview_username}
                            <button onClick={() => copyToClipboard(user.tradingview_username!)} className="opacity-0 group-hover:opacity-100 hover:text-foreground transition-all cursor-pointer hover:scale-110" title="Copy TV">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] tracking-widest font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded">UNLINKED</span>
                        )}
                      </td>

                      {/* Action Column */}
                      <td className="py-4 pr-6 text-right">
                        <button 
                          onClick={() => toggleAccess(user.id, user.tradingview_access_granted)}
                          disabled={updating === user.id}
                          className="inline-flex items-center justify-end gap-2 text-[10px] disabled:opacity-50 group/btn cursor-pointer font-mono tracking-widest"
                        >
                          <span className={user.tradingview_access_granted ? 'text-[var(--neon)] font-bold drop-shadow-[0_0_2px_var(--neon-dim)]' : 'text-muted-foreground font-bold'}>
                            {user.tradingview_access_granted ? 'GRANTED' : 'REVOKED'}
                          </span>
                          {updating === user.id ? (
                            <QuantLoader className="w-8 h-8 text-muted-foreground" />
                          ) : user.tradingview_access_granted ? (
                            <ToggleRight className="w-9 h-9 text-[var(--neon)] group-hover/btn:scale-110 transition-transform drop-shadow-[0_0_5px_var(--neon)]" />
                          ) : (
                            <ToggleLeft className="w-9 h-9 text-muted-foreground group-hover/btn:scale-110 transition-transform" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 gap-4">
            <div className="text-[10px] tracking-widest text-muted-foreground font-medium bg-muted/20 px-3 py-1.5 rounded-lg border border-border/50 font-mono">
              SHOWING <span className="text-foreground font-bold">{((currentPage - 1) * itemsPerPage) + 1}</span> TO <span className="text-foreground font-bold">{Math.min(currentPage * itemsPerPage, sortedUsers.length)}</span> OF <span className="text-foreground font-bold">{sortedUsers.length}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 text-[10px] tracking-widest uppercase font-mono font-bold rounded-xl border border-border disabled:opacity-50 hover:bg-muted transition-colors bg-background hover:border-foreground/30 shadow-sm cursor-pointer"
              >
                Previous
              </button>
              <div className="flex items-center px-5 font-bold font-mono text-[10px] tracking-widest bg-gradient-to-br from-red-500/10 to-transparent text-red-500 border border-red-500/30 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.1)] backdrop-blur-sm">
                PAGE {currentPage} OF {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 text-[10px] tracking-widest uppercase font-mono font-bold rounded-xl border border-border disabled:opacity-50 hover:bg-muted transition-colors bg-background hover:border-foreground/30 shadow-sm cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
