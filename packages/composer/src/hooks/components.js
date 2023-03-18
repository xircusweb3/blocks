export default class Components {
  constructor() {
    this.components = {
      main: {},
      header: {},
      footer: {},
      left: {},
      right: {},
      guard: {},
      wallet: {}
    }
    this.defaults = {}
  }

  add(name, group = 'main', Component) {
    this.components[group][name] = props => <Component {...props} />
  }

  all(group = 'main') {
    return this.components[group]
  }

} 