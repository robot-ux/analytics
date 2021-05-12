/**
 * Node implementation
 */

const pluginName = 'umami'

const noOp = () => {}

export default function umamiAnalyticsPlugin() {
  // Allow for userland overides of base methods
  return {
    name: pluginName,
    config: {},
    initialize: noOp,
  }
}
