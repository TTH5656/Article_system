import { dayjs } from 'element-plus'
export const dateFormat = (date) => {
  return dayjs(date).format('YYYY年MM月DD日')
}
