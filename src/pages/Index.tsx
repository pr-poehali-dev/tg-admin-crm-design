import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Index = () => {
  // Mock данные для демонстрации
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

  const recentPosts = [
    {
      id: 1,
      title: "🚀 Новые возможности нашего сервиса",
      date: "2024-01-20",
      views: 12543,
      likes: 234,
      shares: 45,
      comments: 67,
      type: "regular"
    },
    {
      id: 2,
      title: "📢 Реклама: Лучшие курсы программирования",
      date: "2024-01-19",
      views: 8765,
      likes: 123,
      shares: 23,
      comments: 34,
      type: "ad"
    },
    {
      id: 3,
      title: "💡 Советы по продвижению канала",
      date: "2024-01-18",
      views: 15432,
      likes: 345,
      shares: 78,
      comments: 89,
      type: "regular"
    }
  ]

  const StatCard = ({ title, value, growth, icon }: any) => (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon name={icon} size={16} className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value.toLocaleString()}</div>
        <div className={`text-xs flex items-center gap-1 ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          <Icon name={growth >= 0 ? "TrendingUp" : "TrendingDown"} size={12} />
          {Math.abs(growth)}%
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MessageCircle" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Telegram CRM</h1>
                <p className="text-sm text-muted-foreground">@your_channel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-green-400 border-green-400/20">
                Pro Plan
              </Badge>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* Основная статистика */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Аналитика канала</h2>
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
        </section>

        {/* Графики и детальная аналитика */}
        <section>
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
        </section>

        {/* Управление контентом */}
        <section>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Управление постами</h2>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={16} className="mr-2" />
                Новый пост
              </Button>
            </div>
            
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
              <TabsTrigger value="all">Все посты</TabsTrigger>
              <TabsTrigger value="regular">Обычные</TabsTrigger>
              <TabsTrigger value="ads">Реклама</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="bg-card border-border hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{post.title}</h3>
                          <Badge variant={post.type === 'ad' ? 'default' : 'secondary'} className="text-xs">
                            {post.type === 'ad' ? 'Реклама' : 'Пост'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Icon name="Eye" size={16} className="text-primary" />
                            <span className="text-sm">{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Heart" size={16} className="text-red-400" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Share" size={16} className="text-blue-400" />
                            <span className="text-sm">{post.shares}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MessageCircle" size={16} className="text-green-400" />
                            <span className="text-sm">{post.comments}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="regular" className="space-y-4 mt-6">
              {recentPosts.filter(post => post.type === 'regular').map((post) => (
                <Card key={post.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="ads" className="space-y-4 mt-6">
              {recentPosts.filter(post => post.type === 'ad').map((post) => (
                <Card key={post.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </section>

        {/* Подписка и биллинг */}
        <section>
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
        </section>
      </div>
    </div>
  )
}

export default Index