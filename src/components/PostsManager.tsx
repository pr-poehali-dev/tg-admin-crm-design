import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"

const PostsManager = () => {
  const recentPosts = [
    {
      id: 1,
      title: "🚀 Новые возможности нашего сервиса",
      date: "2024-01-20",
      views: 12543,
      likes: 234,
      shares: 45,
      comments: 67,
      type: "regular",
      status: "published"
    },
    {
      id: 2,
      title: "📢 Реклама: Лучшие курсы программирования",
      date: "2024-01-19",
      views: 8765,
      likes: 123,
      shares: 23,
      comments: 34,
      type: "ad",
      status: "published"
    },
    {
      id: 3,
      title: "💡 Советы по продвижению канала",
      date: "2024-01-18",
      views: 15432,
      likes: 345,
      shares: 78,
      comments: 89,
      type: "regular",
      status: "published"
    },
    {
      id: 4,
      title: "🎯 Черновик: Планы на следующий месяц",
      date: "2024-01-21",
      views: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      type: "regular",
      status: "draft"
    }
  ]

  const PostCard = ({ post }: { post: any }) => (
    <Card className="bg-card border-border hover:bg-card/80 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-foreground">{post.title}</h3>
              <Badge variant={post.type === 'ad' ? 'default' : 'secondary'} className="text-xs">
                {post.type === 'ad' ? 'Реклама' : 'Пост'}
              </Badge>
              <Badge 
                variant={post.status === 'published' ? 'outline' : 'secondary'} 
                className={`text-xs ${post.status === 'published' ? 'text-green-400 border-green-400/20' : 'text-orange-400 border-orange-400/20'}`}
              >
                {post.status === 'published' ? 'Опубликован' : 'Черновик'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
            
            {post.status === 'published' && (
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
            )}
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button variant="ghost" size="sm">
              <Icon name="Edit" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Copy" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Управление постами</h1>
          <p className="text-muted-foreground mt-2">Создавайте, редактируйте и анализируйте ваши посты</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Upload" size={16} className="mr-2" />
            Импорт
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="Plus" size={16} className="mr-2" />
            Новый пост
          </Button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Icon name="FileText" size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Всего постов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">21</p>
                <p className="text-sm text-muted-foreground">Опубликовано</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Icon name="Clock" size={24} className="text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Черновики</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Запланировано</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Посты */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="published">Опубликованные</TabsTrigger>
          <TabsTrigger value="drafts">Черновики</TabsTrigger>
          <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="published" className="space-y-4 mt-6">
          {recentPosts.filter(post => post.status === 'published').map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4 mt-6">
          {recentPosts.filter(post => post.status === 'draft').map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4 mt-6">
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Нет запланированных постов</h3>
            <p className="text-muted-foreground mb-4">Используйте планировщик для создания запланированных постов</p>
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Plus" size={16} className="mr-2" />
              Запланировать пост
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PostsManager