import { dbContext } from "../db/DbContext.js"
import { FrogQuery } from "../models/Frog.js"
import { BadRequest } from "../utils/Errors.js"

class FrogsService {

  async create(data) {
    const frog = await dbContext.Frogs.create(data)
    return frog
  }

  async getFrogs(query) {
    const pageNumber = parseInt(query.page) || 1
    const frogLimit = 3
    const offset = frogLimit * (pageNumber - 1)

    const frogQuery = new FrogQuery(query)

    const frogs = await dbContext.Frogs
      .find(frogQuery)
      .limit(frogLimit)
      .skip(offset)
      .sort({ createdAt: 'descending' })

    const frogCount = await dbContext.Frogs.countDocuments(frogQuery)

    const paginatedResponseObject = {
      frogs,
      page: pageNumber,
      totalPages: Math.ceil(frogCount / frogLimit),
      totalFrogs: frogCount
    }

    return paginatedResponseObject
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