import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  // @ts-ignore
  account: {},

  /** @type {import('./models/Frog.js').Frog[]} */
  frogs: [],

  page: 0,
  totalPages: 0,
  totalFrogs: 0
})
