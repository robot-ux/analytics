/* This module will shake out unused code and work in browser and node 🎉 */
import nodeCode from './node'
import browser from './browser'

export default typeof window !== 'undefined' ? browser : nodeCode
