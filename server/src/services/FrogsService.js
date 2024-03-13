import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class FrogsService {

  async create(data) {
    const frog = await dbContext.Frogs.create(data)
    return frog
  }
  async getFrogs() {
    const frogs = await dbContext.Frogs.find()
    return frogs
  }

  async getById(id) {
    const frog = await dbContext.Frogs.findById(id)
    if (!frog) throw new BadRequest(`Bad id: ${id}`)
    return frog
  }

  async update(frogId, data) {
    const frog = await this.getById(frogId)

    frog.name = data.name || frog.name
    frog.age = data.age || frog.age
    frog.color = data.color || frog.color
    frog.likes = data.likes || frog.likes
    frog.dislikes = data.dislikes || frog.dislikes
    frog.isPoisonous = data.isPoisonous != undefined ? data.isPoisonous : frog.isPoisonous
    frog.isToad = data.isToad != undefined ? data.isToad : frog.isToad

    await frog.save()

    return frog
  }
}

export const frogsService = new FrogsService()