export const querify = (query) => Object.keys(query).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])).join('&')

export const request = async(method = 'GET', url = '', data = {}, headers = {}) => {
  try {
    data = ['PUT', 'DELETE'].indexOf(method) > -1 ? { _method: method, ...data } : data;
    const query = (method == 'GET' && Object.keys(data).length > 0) ? '?' + querify(data) : '';
    const body = ['GET', 'HEAD'].indexOf(method) == -1 ? { body: JSON.stringify(data) } : {}
    const reply = await fetch(`${url}${query}`, {
      method: method != 'GET' ? 'POST' : 'GET',
      ...body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    logger("REQUEST SUCCESS", { method, url, data, headers, reply })
    return await reply.json()
  } catch (error) {
    logger("REQUEST FAILED", { method, url, data, headers, error })
    return false
  }
}

export const logger = (...args) => {
  if (process.env.NEXT_PUBLIC_ENV == 'development') {
    console.log(...args);
  }
}

export const pageView = (url) => {
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

export const pageEvent = ({ action, params }) => {
  if (window.gtag) {
    window.gtag('event', action, params)
  }
}

export const filterMethods = (methods) => Object.keys(methods)
  .filter(m => !m.startsWith('0x'))
  .reduce((a, m) => ({ ...a, [m]: methods[m] }), {})

export const shortAddr = (address) => (address && address.length > 30) && `${address.substr(0, 6)}...${address.substr(-4)}`

export const isZeroAddr = (address) => (address.startsWith('0x') && address == '0x0000000000000000000000000000000000000000') ? true : false

export const ipfsUrl = (hash, domain = 'xircus') => `https://${domain}.infura-ipfs.io/ipfs/${hash}`