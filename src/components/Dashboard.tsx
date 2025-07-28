import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  onNavigateToPosts: () => void
}

const Dashboard = ({ onNavigateToPosts }: DashboardProps) => {
  const chartData = [
    { name: 'Янв', subscribers: 42000, views: 850000 },
    { name: 'Фев', subscribers: 43200, views: 920000 },
    { name: 'Мар', subscribers: 44500, views: 880000 },
    { name: 'Апр', subscribers: 45234, views: 892456 },
  ]

  const channelStats = {
    subscribers: 45234,
    subscribersGrowth: 12.3,
    views: 892456,
    viewsGrowth: 8.7,
    engagement: 6.8,
    engagementGrowth: -2.1,
    reach: 234567,
    reachGrowth: 15.2
  }

  // Последние 5 постов для дашборда
  const recentPosts = [
    {
      id: 1,
      title: "🚀 Новые возможности нашего сервиса",
      date: "2024-01-20",
      views: 12543,
      likes: 234,
      type: "regular",
      status: "published"
    },
    {
      id: 2,
      title: "📢 Реклама: Лучшие курсы программирования",
      date: "2024-01-19",
      views: 8765,
      likes: 123,
      type: "ad",
      status: "published"
    },
    {
      id: 3,
      title: "💡 Советы по продвижению канала",
      date: "2024-01-18",
      views: 15432,
      likes: 345,
      type: "regular",
      status: "published"
    },
    {
      id: 4,
      title: "🎯 Планы на следующий месяц",
      date: "2024-01-17",
      views: 9876,
      likes: 189,
      type: "regular",
      status: "published"
    },
    {
      id: 5,
      title: "📊 Итоги недели",
      date: "2024-01-16",
      views: 11234,
      likes: 267,
      type: "regular",
      status: "published"
    }
  ]

  const StatCard = ({ title, value, growth, icon }: any) => (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon name={icon} size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl md:text-2xl font-bold text-foreground">{typeof value === 'string' ? value : value.toLocaleString()}</div>
        <div className={`text-xs flex items-center gap-1 ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <Icon name={growth >= 0 ? "TrendingUp" : "TrendingDown"} size={12} />
          {Math.abs(growth)}%
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Заголовок */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Дашборд</h1>
          <p className="text-muted-foreground mt-2">Обзор основных метрик вашего канала</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить данные
        </Button>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Подписчики" 
          value={channelStats.subscribers} 
          growth={channelStats.subscribersGrowth}
          icon="Users"
        />
        <StatCard 
          title="Просмотры" 
          value={channelStats.views} 
          growth={channelStats.viewsGrowth}
          icon="Eye"
        />
        <StatCard 
          title="Вовлеченность" 
          value={channelStats.engagement + '%'} 
          growth={channelStats.engagementGrowth}
          icon="Heart"
        />
        <StatCard 
          title="Охват" 
          value={channelStats.reach} 
          growth={channelStats.reachGrowth}
          icon="Target"
        />
      </div>

      {/* График */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Динамика роста</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Подписчики"
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Просмотры"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Последние посты */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Последние посты</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onNavigateToPosts}
              className="border-border"
            >
              Смотреть все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon 
                    name={post.type === 'ad' ? 'Megaphone' : 'FileText'} 
                    size={20} 
                    className={post.type === 'ad' ? 'text-orange-500' : 'text-primary'} 
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground truncate">{post.title}</h4>
                  <div className="flex items-center gap-2 md:gap-4 mt-1 flex-wrap">
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                    <div className="flex items-center gap-2">
                      <Icon name="Eye" size={14} className="text-primary" />
                      <span className="text-sm text-muted-foreground">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={14} className="text-red-400" />
                      <span className="text-sm text-muted-foreground">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <Badge variant={post.type === 'ad' ? 'default' : 'secondary'} className="text-xs hidden sm:inline-flex">
                  {post.type === 'ad' ? 'Реклама' : 'Пост'}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Упрощенная подписка */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-foreground">Pro подписка</CardTitle>
              <p className="text-muted-foreground mt-2">Активна до 28 февраля 2024</p>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400/20 w-fit">
              23 дня осталось
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="text-center p-3 md:p-4 bg-background/50 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">∞</div>
                <div className="text-xs md:text-sm text-muted-foreground">Каналов</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-background/50 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs md:text-sm text-muted-foreground">Поддержка</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-background/50 rounded-lg">
                <div className="text-xl md:text-2xl font-bold text-primary">30д</div>
                <div className="text-xs md:text-sm text-muted-foreground">История</div>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 w-full">
              <Icon name="CreditCard" size={16} className="mr-2" />
              <span className="hidden sm:inline">Продлить на 30 дней - 990₽</span>
              <span className="sm:hidden">Продлить - 990₽</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard