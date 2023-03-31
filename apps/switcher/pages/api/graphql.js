import { XircusSDK } from '@xircus-web3/sdk'
import { createYoga, createSchema } from 'graphql-yoga'
import { createAppSourceSchema } from '@xircus-web3/graph'

const schema = createAppSourceSchema({})

const yoga = createYoga({
  graphqlEndpoint: '/api/graphql',
  schema: createSchema(schema),
  context: async({ req }) => {
    const domain = req.headers.host.split(':')[0]

    const registry = XircusSDK.getRegistryAPI()
    registry.setUrl(process.env.NEXT_PUBLIC_REGISTRY_URL)

    const app = await registry.query('appByDomain', '_id name domain logo subdomain domains url appType skin provider providerUrl sync', { domain })
    const api = XircusSDK.getProviderAPI()

    if (process.env.DEPLOY_ENV == 'production') {
      api.setUrl(app.providerUrl)
    } else {
      api.setUrl('http://localhost:8050')
    }

    return {
      app,
      api,
    }
  }
})

export default yoga