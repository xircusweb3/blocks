import { XircusSDK } from "@xircus-web3/sdk"
// import RedisService from "../../services/RedisService"

const APP_QUERY = `
  _id 
  name
  domain
  logo
  subdomain
  domains
  url
  appType
  skin
  scaffold
  layout
  layouts
  provider
  providerUrl
  sync
  theme
  themes
  currencies
  chains
  categories
  metas
  fonts
  menus
  pages
  draftPages
  ownerAddr
`

export default async function handler(req, res) {
  // const redis = new RedisService()
  // redis.connect()

  const domain = req.headers.host.split(':')[0]

  const registry = XircusSDK.getRegistryAPI()
  registry.setUrl(process.env.NEXT_PUBLIC_REGISTRY_URL)

  const app = await registry.query('appByDomain', APP_QUERY, { domain })
  const api = XircusSDK.getProviderAPI()

  if (process.env.DEPLOY_ENV == 'production') {
    api.setUrl(app.providerUrl)
  } else {
    api.setUrl('http://localhost:8050')
  }

  // const data = await redis.get(domain)
  // if (data != null) {
  //   await redis.disconnect()
  //   return res.status(200).json(JSON.parse(data))
  // }

  if (!app) {
    res.status(500).json({ status: false, message: 'App Not Found' })
  }

  console.log("DATA", app)

  return res.status(200).json({ status: true, url: api.url, domain, app })

  // const queries = [
  //   {
  //     name: 'currencies',
  //     fields: '_id name symbol hashId address chain decimals stable',
  //     params: {}
  //   },
  //   {
  //     name: 'appByDomain',
  //     fields: APP_QUERY,
  //     params: { domain }
  //   },
  //   {
  //     name: 'accountsByApp',
  //     fields: '_id address app name email username followers followings likes lastLogin createdAt',
  //     params: { appId: app._id }
  //   },
  //   {
  //     name: 'itemsByApp',
  //     fields: '_id marketAddr listingId listingType nftId name desc image video audio preview unlockable extra assetAddr assetType nftId price attributes categories quantity currency currencyId soldAt buyFor startTime endTime seller chain visible history likers',
  //     params: { appId: app._id }
  //   },
  //   {
  //     name: 'marketsByApp',
  //     fields: '_id name address chain contractVersion contractType listFee txFee',
  //     params: { appId: app._id }
  //   },    
  // ]

  // const reply = await api.queryBatch('ALLDATA', queries)

  // console.log("REPLY", JSON.stringify(reply.errors))

  // if (reply.data) {
  //   const { appByDomain, accountsByApp, itemsByApp, marketsByApp, currencies } = reply.data

  //   const usernames = accountsByApp.filter(u => u.username != null).reduce((acc, u) => ({ ...acc, [u.address]: u.username }), {})
  //   const chains = Object.values(marketsByApp.map(m => m.chain))
  //   const chainList = CHAIN_LIST.filter(c => chains.indexOf(c.short) > -1)

  //   const ALLDATA = {
  //     usernames,
  //     chains,
  //     chainList,
  //     chain: chains.length > 0 ? chains[0] : 'bsc',
  //     currencies,
  //     app: appByDomain,
  //     sellers: accountsByApp,
  //     items: itemsByApp,
  //     markets: marketsByApp,
  //   }

  //   await redis.set(domain, JSON.stringify(ALLDATA))    
  //   await redis.disconnect()

  //   res.status(200).json(ALLDATA)
  // } else {
  //   res.status(200).json({ status: false, message: 'FAILED' })
  // }
}
