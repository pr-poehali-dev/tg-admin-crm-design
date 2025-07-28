import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Локализация календаря
moment.locale('ru')
const localizer = momentLocalizer(moment)

const PostScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)

  // Запланированные посты
  const scheduledPosts = [
    {
      id: 1,
      title: '🚀 Запуск новой функции',
      start: new Date(2024, 0, 25, 10, 0),
      end: new Date(2024, 0, 25, 10, 30),
      type: 'regular',
      content: 'Сегодня мы запускаем долгожданную функцию...',
      status: 'scheduled'
    },
    {
      id: 2,
      title: '📢 Рекламный пост',
      start: new Date(2024, 0, 26, 14, 0),
      end: new Date(2024, 0, 26, 14, 30),
      type: 'ad',
      content: 'Лучшие курсы по программированию...',
      status: 'scheduled'
    },
    {
      id: 3,
      title: '💡 Еженедельные советы',
      start: new Date(2024, 0, 28, 9, 0),
      end: new Date(2024, 0, 28, 9, 30),
      type: 'regular',
      content: 'Советы недели для развития канала...',
      status: 'scheduled'
    }
  ]

  const [posts, setPosts] = useState(scheduledPosts)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'regular',
    date: '',
    time: ''
  })

  // Обработчик создания нового поста
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.date || !newPost.time) return

    const postDate = new Date(`${newPost.date}T${newPost.time}`)
    const newPostEvent = {
      id: Date.now(),
      title: newPost.title,
      start: postDate,
      end: new Date(postDate.getTime() + 30 * 60000), // +30 минут
      type: newPost.type,
      content: newPost.content,
      status: 'scheduled'
    }

    setPosts([...posts, newPostEvent])
    setNewPost({ title: '', content: '', type: 'regular', date: '', time: '' })
    setShowNewPostDialog(false)
  }

  // Стили для событий календаря
  const eventStyleGetter = (event: any) => {
    let backgroundColor = '#007ACC'
    if (event.type === 'ad') {
      backgroundColor = '#F97316'
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const currentTime = new Date().toTimeString().slice(0, 5)

  return (
    <div className="p-6 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Планировщик постов</h1>
          <p className="text-muted-foreground mt-2">Планируйте и управляйте публикациями в вашем канале</p>
        </div>
        <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Plus" size={16} className="mr-2" />
              Запланировать пост
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Новый запланированный пост</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-foreground">Заголовок</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Введите заголовок поста"
                  className="bg-background border-border text-foreground"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="text-foreground">Содержание</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Введите текст поста"
                  className="bg-background border-border text-foreground min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-foreground">Дата</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newPost.date}
                    min={today}
                    onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground">Время</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newPost.time}
                    onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <Label className="text-foreground">Тип поста</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={newPost.type === 'regular' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewPost({ ...newPost, type: 'regular' })}
                  >
                    Обычный
                  </Button>
                  <Button
                    variant={newPost.type === 'ad' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewPost({ ...newPost, type: 'ad' })}
                  >
                    Реклама
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleCreatePost}
                  className="bg-primary hover:bg-primary/90 flex-1"
                  disabled={!newPost.title || !newPost.date || !newPost.time}
                >
                  Запланировать
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewPostDialog(false)}
                  className="border-border"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{posts.length}</p>
                <p className="text-sm text-muted-foreground">Запланировано постов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Icon name="Clock" size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">На этой неделе</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Icon name="Zap" size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Автопостинг активен</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Календарь */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Календарь публикаций</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96" style={{ 
            '--rbc-bg-color': 'hsl(var(--card))',
            '--rbc-text-color': 'hsl(var(--foreground))',
            '--rbc-border-color': 'hsl(var(--border))'
          } as any}>
            <Calendar
              localizer={localizer}
              events={posts}
              startAccessor="start"
              endAccessor="end"
              style={{ 
                height: '100%',
                backgroundColor: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))'
              }}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
              popup
              messages={{
                next: 'Следующий',
                previous: 'Предыдущий',
                today: 'Сегодня',
                month: 'Месяц',
                week: 'Неделя',
                day: 'День',
                agenda: 'Список',
                date: 'Дата',
                time: 'Время',
                event: 'Событие',
                noEventsInRange: 'Нет запланированных постов в этом диапазоне'
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Список запланированных постов */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Ближайшие публикации</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon 
                    name={post.type === 'ad' ? 'Megaphone' : 'FileText'} 
                    size={20} 
                    className={post.type === 'ad' ? 'text-orange-500' : 'text-primary'} 
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {moment(post.start).format('DD MMMM YYYY, HH:mm')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={post.type === 'ad' ? 'default' : 'secondary'} className="text-xs">
                  {post.type === 'ad' ? 'Реклама' : 'Пост'}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default PostScheduler