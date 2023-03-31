import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const fromNow = (timestamp) => dayjs.unix(timestamp).fromNow()
export const unixNow = () => dayjs().unix()
export const toUnix = (date) => dayjs(date).unix()
export const unixFormat = (date, format = 'MMMM YYYY') => dayjs.unix(date).format(format)
export const dayFormat = (date, format =  'MMMM YYYY') => dayjs(date).format(format)