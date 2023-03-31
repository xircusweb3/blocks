import { XircusSDK } from "@xircus-web3/sdk"

export default async function handler(req, res) {
  const domain = req.headers.host.split(':')[0]
  const registry = XircusSDK.getRegistryAPI()
  registry.setUrl(process.env.NEXT_PUBLIC_REGISTRY_URL)
  const app = await registry.query('appByDomain', '_id name domain logo subdomain domains url appType skin provider providerUrl dns', { domain })
  res.status(200).json(app)
}
