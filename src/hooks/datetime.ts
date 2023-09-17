import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export default function useDatetime() {
  const date = (datetime: string | undefined) => {
    if (!datetime) {
      return ''
    }
    return dayjs(datetime).locale('zh-cn').format('YYYY-MM-DD')
  }

  const time = (datetime: string | undefined) => {
    if (!datetime) {
      return ''
    }
    return dayjs(datetime).locale('zh-cn').format('HH:mm:ss')
  }

  const datetime = (datetime: string | undefined) => {
    if (!datetime) {
      return ''
    }

    return dayjs(datetime).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
  }

  return { date, time, datetime }
}
