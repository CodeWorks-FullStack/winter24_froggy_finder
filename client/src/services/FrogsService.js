import { AppState } from "../AppState.js"
import { Frog } from "../models/Frog.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class FrogsService {
  async getFrogs() {
    const res = await api.get('api/frogs')
    logger.log('got frogs', res.data)
    AppState.frogs = res.data.map(frogPOJO => new Frog(frogPOJO))
  }
}

export const frogsService = new FrogsService()