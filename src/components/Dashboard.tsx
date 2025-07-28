import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
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

  const StatCard = ({ title, value, growth, icon }: any) => (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon name={icon} size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{typeof value === 'string' ? value : value.toLocaleString()}</div>
        <div className={`text-xs flex items-center gap-1 ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <Icon name={growth >= 0 ? "TrendingUp" : "TrendingDown"} size={12} />
          {Math.abs(growth)}%
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Дашборд</h1>
          <p className="text-muted-foreground mt-2">Обзор основных метрик вашего канала</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Обновить данные
        </Button>
      </div>

      {/* Основная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="h-64">
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

      {/* Подписка */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Управление подпиской</CardTitle>
              <p className="text-muted-foreground mt-2">Pro Plan - расширенная аналитика</p>
            </div>
            <Icon name="Crown" size={32} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Использовано API запросов</span>
                <span className="text-sm font-medium">8,750 / 10,000</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Каналов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Поддержка</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">90д</div>
                <div className="text-sm text-muted-foreground">История</div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-primary hover:bg-primary/90 flex-1">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Продлить подписку
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                <Icon name="FileText" size={16} className="mr-2" />
                История платежей
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard