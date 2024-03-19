import { AppState } from "../AppState.js"
import { Frog } from "../models/Frog.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class FrogsService {
  async getFrogs(query) {
    const res = await api.get('api/frogs', { params: query })
    logger.log('got frogs', res.data)
    AppState.frogs = res.data.frogs.map(frogPOJO => new Frog(frogPOJO))
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.totalFrogs = res.data.count
  }
}

export const frogsService = new FrogsService()