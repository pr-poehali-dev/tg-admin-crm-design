import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Icon from "@/components/ui/icon"
import { useMediaQuery } from '@/hooks/use-mobile'

// Компоненты страниц
import Dashboard from '../components/Dashboard'
import PostsManager from '../components/PostsManager'
import PostScheduler from '../components/PostScheduler'
import Analytics from '../components/Analytics'
import Settings from '../components/Settings'

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const sidebarItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'posts', label: 'Посты', icon: 'FileText' },
    { id: 'scheduler', label: 'Планировщик', icon: 'Calendar' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart3' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToPosts={() => handleTabChange('posts')} />
      case 'posts':
        return <PostsManager />
      case 'scheduler':
        return <PostScheduler />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard onNavigateToPosts={() => handleTabChange('posts')} />
    }
  }

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="MessageCircle" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Telegram CRM</h1>
            <p className="text-xs text-muted-foreground">@your_channel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <Badge variant="outline" className="text-xs text-green-400 border-green-400/20">
              Pro Plan
            </Badge>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 bg-card border-r border-border flex flex-col">
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-card border-border">
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Icon name="Menu" size={20} />
                    </Button>
                  </SheetTrigger>
                </Sheet>
                <div>
                  <h1 className="text-lg font-bold text-foreground">Telegram CRM</h1>
                </div>
              </div>
              <Badge variant="outline" className="text-xs text-green-400 border-green-400/20">
                Pro
              </Badge>
            </div>
          </div>
        )}
        
        <div className={isMobile ? '' : ''}>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default Index