import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const Analytics = () => {
  const growthData = [
    { name: 'Янв', subscribers: 42000, views: 850000, engagement: 5.2 },
    { name: 'Фев', subscribers: 43200, views: 920000, engagement: 5.8 },
    { name: 'Мар', subscribers: 44500, views: 880000, engagement: 6.1 },
    { name: 'Апр', subscribers: 45234, views: 892456, engagement: 6.8 },
  ]

  const postsData = [
    { name: 'Пн', regular: 4, ads: 1, views: 25000 },
    { name: 'Вт', regular: 3, ads: 2, views: 18000 },
    { name: 'Ср', regular: 5, ads: 1, views: 32000 },
    { name: 'Чт', regular: 2, ads: 3, views: 15000 },
    { name: 'Пт', regular: 6, ads: 1, views: 40000 },
    { name: 'Сб', regular: 3, ads: 2, views: 22000 },
    { name: 'Вс', regular: 4, ads: 1, views: 28000 },
  ]

  const audienceData = [
    { name: '18-24', value: 25, color: '#007ACC' },
    { name: '25-34', value: 35, color: '#10B981' },
    { name: '35-44', value: 22, color: '#F97316' },
    { name: '45+', value: 18, color: '#8B5CF6' },
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Детальная аналитика</h1>
          <p className="text-muted-foreground mt-2">Глубокий анализ эффективности вашего канала</p>
        </div>
        <div className="flex gap-3">
          <Icon name="Download" size={16} className="mr-2" />
          <select className="bg-card border border-border rounded-lg px-3 py-2 text-foreground text-sm">
            <option>Последние 30 дней</option>
            <option>Последние 7 дней</option>
            <option>Последние 3 месяца</option>
            <option>Весь период</option>
          </select>
        </div>
      </div>

      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-muted">
          <TabsTrigger value="growth">Рост</TabsTrigger>
          <TabsTrigger value="engagement">Вовлеченность</TabsTrigger>
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="audience">Аудитория</TabsTrigger>
        </TabsList>

        {/* Вкладка роста */}
        <TabsContent value="growth" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Рост подписчиков</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="subscribers" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        name="Подписчики"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Просмотры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Bar dataKey="views" fill="#10B981" name="Просмотры" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ключевые метрики */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Icon name="TrendingUp" size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">+12.3%</p>
                    <p className="text-sm text-muted-foreground">Рост подписчиков</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <Icon name="Eye" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">892K</p>
                    <p className="text-sm text-muted-foreground">Просмотры в месяц</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Icon name="Users" size={24} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">45.2K</p>
                    <p className="text-sm text-muted-foreground">Всего подписчиков</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Icon name="Target" size={24} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">234K</p>
                    <p className="text-sm text-muted-foreground">Охват</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка вовлеченности */}
        <TabsContent value="engagement" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Динамика вовлеченности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#F97316" 
                      strokeWidth={3}
                      name="Вовлеченность (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка контента */}
        <TabsContent value="content" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Активность по дням недели</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={postsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="regular" fill="hsl(var(--primary))" name="Обычные посты" />
                    <Bar dataKey="ads" fill="#F97316" name="Рекламные посты" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка аудитории */}
        <TabsContent value="audience" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Возрастная структура</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">География аудитории</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">🇷🇺 Россия</span>
                  <span className="text-muted-foreground">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">🇺🇦 Украина</span>
                  <span className="text-muted-foreground">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">🇰🇿 Казахстан</span>
                  <span className="text-muted-foreground">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">🇧🇾 Беларусь</span>
                  <span className="text-muted-foreground">10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">🌍 Другие</span>
                  <span className="text-muted-foreground">15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Analytics