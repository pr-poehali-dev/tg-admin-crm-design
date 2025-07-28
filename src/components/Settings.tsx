import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const Settings = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground mt-2">Управляйте параметрами вашего канала и аккаунта</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
      </div>

      <Tabs defaultValue="channel" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-muted">
          <TabsTrigger value="channel">Канал</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
          <TabsTrigger value="billing">Подписка</TabsTrigger>
        </TabsList>

        {/* Настройки канала */}
        <TabsContent value="channel" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Информация о канале</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="channel-name" className="text-foreground">Название канала</Label>
                  <Input
                    id="channel-name"
                    placeholder="@your_channel"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="channel-id" className="text-foreground">ID канала</Label>
                  <Input
                    id="channel-id"
                    placeholder="-1001234567890"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="api-token" className="text-foreground">Bot API Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-token"
                    type="password"
                    placeholder="1234567890:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                    className="bg-background border-border text-foreground"
                  />
                  <Button variant="outline" className="border-border">
                    <Icon name="Eye" size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Статус подключения</Label>
                  <p className="text-sm text-muted-foreground">Проверьте подключение к Telegram API</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-400 border-green-400/20">
                    Подключен
                  </Badge>
                  <Button variant="outline" size="sm" className="border-border">
                    Тест подключения
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Дополнительные каналы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-foreground">@news_channel</h4>
                  <p className="text-sm text-muted-foreground">Новостной канал</p>
                </div>
                <Badge variant="outline" className="text-green-400 border-green-400/20">
                  Активен
                </Badge>
              </div>
              
              <Button variant="outline" className="w-full border-border">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить канал
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Уведомления */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Настройки уведомлений</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать отчеты на email</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Push уведомления</Label>
                  <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Уведомления о новых подписчиках</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления о росте аудитории</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Аналитические отчеты</Label>
                  <p className="text-sm text-muted-foreground">Еженедельные отчеты о производительности</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Email для уведомлений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="your-email@example.com"
                  className="bg-background border-border text-foreground"
                />
                <Button variant="outline" className="border-border">
                  Обновить
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Автоматизация */}
        <TabsContent value="automation" className="space-y-6 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Автопостинг</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Включить автопостинг</Label>
                  <p className="text-sm text-muted-foreground">Автоматическая публикация запланированных постов</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Автоответы на комментарии</Label>
                  <p className="text-sm text-muted-foreground">Автоматические ответы на часто задаваемые вопросы</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-foreground">Модерация комментариев</Label>
                  <p className="text-sm text-muted-foreground">Автоматическое удаление спама и нежелательного контента</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Расписание публикаций</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Оптимальное время</Label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground mt-2">
                    <option>10:00 - 12:00</option>
                    <option>14:00 - 16:00</option>
                    <option>18:00 - 20:00</option>
                    <option>Настроить вручную</option>
                  </select>
                </div>
                <div>
                  <Label className="text-foreground">Часовой пояс</Label>
                  <select className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground mt-2">
                    <option>UTC+3 (Москва)</option>
                    <option>UTC+2 (Киев)</option>
                    <option>UTC+5 (Алматы)</option>
                    <option>Другой</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Подписка */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Текущий план</CardTitle>
                  <p className="text-muted-foreground mt-2">Pro Plan - расширенная аналитика</p>
                </div>
                <Badge variant="outline" className="text-green-400 border-green-400/20">
                  Активен
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Каналов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10,000</div>
                  <div className="text-sm text-muted-foreground">API запросов/мес</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">90д</div>
                  <div className="text-sm text-muted-foreground">История данных</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Управление подпиской
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  <Icon name="FileText" size={16} className="mr-2" />
                  История платежей
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Способы оплаты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name="CreditCard" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">**** **** **** 1234</h4>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>

              <Button variant="outline" className="w-full border-border">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить способ оплаты
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings