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
    const skipNumber = (pageNumber - 1) * frogLimit


    // NOTE passes the request query through our FrogQuery constructor, which removes additional fields and applies regex to the properties
    const frogQuery = new FrogQuery(query)

    const frogs = await dbContext.Frogs
      .find(frogQuery)
      .limit(frogLimit) // limits how many documents to pull out of database
      .skip(skipNumber) // skips over a number of documents in database
      // .sort({ name: 'ascending' }) alphabetical sort
      .sort({ createdAt: 'descending' }) // shows newest created documents first

    const frogCount = await dbContext.Frogs.countDocuments(frogQuery) // counts total documents in database

    const responseObject = {
      frogs: frogs,
      page: pageNumber,
      count: frogCount,
      totalPages: Math.ceil(frogCount / 3)
    }

    return responseObject
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