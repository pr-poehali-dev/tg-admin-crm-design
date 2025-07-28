interface TelegramConfig {
  botToken: string
  channelId: string
}

interface TelegramPost {
  title: string
  content: string
  type: 'regular' | 'ad'
  scheduledDate?: Date
}

interface TelegramResponse {
  ok: boolean
  result?: any
  error_code?: number
  description?: string
}

class TelegramAPI {
  private config: TelegramConfig

  constructor(config: TelegramConfig) {
    this.config = config
  }

  // Отправка поста в канал
  async sendMessage(post: TelegramPost): Promise<TelegramResponse> {
    try {
      const message = this.formatMessage(post)
      
      const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.channelId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: false
        })
      })

      const data = await response.json()
      return data as TelegramResponse
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error)
      return {
        ok: false,
        error_code: 500,
        description: 'Ошибка сети при отправке сообщения'
      }
    }
  }

  // Запланированная отправка поста
  async scheduleMessage(post: TelegramPost): Promise<boolean> {
    if (!post.scheduledDate) return false

    const delay = post.scheduledDate.getTime() - Date.now()
    
    if (delay <= 0) {
      // Отправляем сразу, если время уже прошло
      const result = await this.sendMessage(post)
      return result.ok
    }

    // Сохраняем в localStorage для демонстрации (в реальном приложении - база данных)
    const scheduledPosts = this.getScheduledPosts()
    scheduledPosts.push({
      ...post,
      id: Date.now().toString(),
      status: 'scheduled'
    })
    
    localStorage.setItem('scheduledPosts', JSON.stringify(scheduledPosts))
    
    // В реальном приложении здесь был бы cron job или queue система
    setTimeout(async () => {
      await this.sendMessage(post)
      this.removeScheduledPost(Date.now().toString())
    }, delay)

    return true
  }

  // Получение информации о канале
  async getChannelInfo(): Promise<TelegramResponse> {
    try {
      const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/getChat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.channelId
        })
      })

      return await response.json()
    } catch (error) {
      console.error('Ошибка получения информации о канале:', error)
      return {
        ok: false,
        error_code: 500,
        description: 'Ошибка при получении информации о канале'
      }
    }
  }

  // Проверка подключения
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`https://api.telegram.org/bot${this.config.botToken}/getMe`)
      const data = await response.json()
      return data.ok
    } catch (error) {
      return false
    }
  }

  // Форматирование сообщения
  private formatMessage(post: TelegramPost): string {
    let message = `<b>${post.title}</b>\n\n`
    
    if (post.content) {
      message += `${post.content}\n\n`
    }

    if (post.type === 'ad') {
      message += '<i>📢 Рекламный пост</i>'
    }

    return message
  }

  // Получение запланированных постов
  private getScheduledPosts(): any[] {
    const posts = localStorage.getItem('scheduledPosts')
    return posts ? JSON.parse(posts) : []
  }

  // Удаление запланированного поста
  private removeScheduledPost(id: string): void {
    const posts = this.getScheduledPosts()
    const filtered = posts.filter(post => post.id !== id)
    localStorage.setItem('scheduledPosts', JSON.stringify(filtered))
  }

  // Получение статистики канала (упрощенная версия)
  async getChannelStats(): Promise<any> {
    // В реальном приложении здесь были бы API запросы к Telegram
    // Возвращаем мок данные для демонстрации
    return {
      subscribers: Math.floor(Math.random() * 50000) + 40000,
      views: Math.floor(Math.random() * 1000000) + 800000,
      engagement: Math.random() * 10 + 5,
      reach: Math.floor(Math.random() * 300000) + 200000
    }
  }
}

// Утилиты для работы с Telegram API
export const telegramUtils = {
  // Проверка валидности токена
  isValidToken(token: string): boolean {
    const tokenRegex = /^\d{8,10}:[a-zA-Z0-9_-]{35}$/
    return tokenRegex.test(token)
  },

  // Проверка валидности ID канала
  isValidChannelId(channelId: string): boolean {
    return channelId.startsWith('-100') || channelId.startsWith('@')
  },

  // Получение имени канала из ID
  getChannelName(channelId: string): string {
    if (channelId.startsWith('@')) {
      return channelId
    }
    return `ID: ${channelId}`
  }
}

export { TelegramAPI }
export type { TelegramConfig, TelegramPost, TelegramResponse }