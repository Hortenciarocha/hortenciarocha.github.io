enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString()
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.getTimestamp()
    const dataStr = data ? ` ${JSON.stringify(data)}` : ''
    return `[${timestamp}] [${level}] ${message}${dataStr}`
  }

  debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, data))
    }
  }

  info(message: string, data?: any) {
    console.log(this.formatMessage(LogLevel.INFO, message, data))
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage(LogLevel.WARN, message, data))
  }

  error(message: string, error?: Error | any) {
    const data = error instanceof Error ? { error: error.message } : error
    console.error(this.formatMessage(LogLevel.ERROR, message, data))
  }
}

export const logger = new Logger()
