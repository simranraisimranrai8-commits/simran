import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, Users, Building2, Briefcase, FileText, Wrench, UserCog, ShoppingCart, CreditCard,
  Tag, Bell, BarChart3, FileEdit, History, Settings, Menu, X, Search, ChevronDown, Sun, Moon, LogOut, PanelLeftClose, PanelLeftOpen, Maximize2, Minimize2,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/employers', label: 'Employers', icon: Building2 },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/applications', label: 'Applications', icon: FileText },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/providers', label: 'Providers', icon: UserCog },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/pricing', label: 'Pricing', icon: Tag },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/cms', label: 'CMS', icon: FileEdit },
  { to: '/audit-logs', label: 'Audit Logs', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]

function SidebarContent({ onNavigate, collapsed }) {
  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive ? 'bg-white/12 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'
    }`
  return (
    <>
      <div className={`px-4 pb-4 pt-5 ${collapsed ? 'px-3' : ''}`}><Logo light showTag={!collapsed} /></div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4" aria-label="Admin">
        {nav.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} onClick={onNavigate} className={linkCls}>
            <n.icon size={17} />{!collapsed && n.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('lojopo_sidebar_collapsed') === 'true')
  const [fullscreen, setFullscreen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const nav2 = useNavigate()

  const initials = (user?.name || 'Admin').split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

  const doLogout = async () => {
    await logout()
    nav2('/login', { replace: true })
  }

  const toggleSidebar = () => {
    setCollapsed((value) => {
      localStorage.setItem('lojopo_sidebar_collapsed', String(!value))
      return !value
    })
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen()
    else await document.exitFullscreen()
    setFullscreen(Boolean(document.fullscreenElement))
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className={`sticky top-0 hidden h-screen shrink-0 flex-col overflow-hidden bg-navy transition-[width] duration-200 lg:flex ${collapsed ? 'w-[76px]' : 'w-64'}`}>
        <SidebarContent collapsed={collapsed} />
      </aside>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ duration: 0.2 }} className="relative flex h-full w-64 flex-col bg-navy">
              <button onClick={() => setOpen(false)} className="absolute right-3 top-4 text-white/70" aria-label="Close menu"><X size={20} /></button>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Floating pill header, TrendyAdmin-style */}
        <div className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
          <header className="flex h-14 items-center gap-3 rounded-2xl border border-line bg-white/90 px-3 shadow-floating backdrop-blur sm:px-5">
            <button className="text-ink lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
            <button className="hidden rounded-full p-2 text-muted hover:bg-surface lg:block" onClick={toggleSidebar} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button>
            <div className="relative hidden max-w-xs flex-1 sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input className="input !rounded-full !pl-9" placeholder="Search admin..." aria-label="Search admin" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={toggleFullscreen} className="hidden rounded-full p-2 text-muted hover:bg-surface sm:block" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</button>
              <button onClick={toggleTheme} className="rounded-full p-2 text-muted hover:bg-surface" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button className="relative rounded-full p-2 text-muted hover:bg-surface" aria-label="Notifications"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-leaf" /></button>
              <div className="relative">
                <button onClick={() => setMenuOpen((m) => !m)} className="flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-surface">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{initials}</span>
                  <span className="hidden text-sm font-semibold sm:block">{user?.name || 'Admin'}</span>
                  <ChevronDown size={14} className="hidden text-muted sm:block" />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute right-0 top-12 w-48 rounded-xl border border-line bg-white p-1.5 shadow-lift">
                      <div className="px-2.5 py-1.5 text-xs text-muted">{user?.email}</div>
                      <button onClick={doLogout} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"><LogOut size={15} />Log out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>
        </div>
        <main className="min-w-0 flex-1 p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  )
}
