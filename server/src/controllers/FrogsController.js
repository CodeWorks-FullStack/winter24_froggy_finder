import { frogsService } from "../services/FrogsService.js";
import BaseController from "../utils/BaseController.js";

export class FrogsController extends BaseController {
  constructor() {
    super('api/frogs')
    this.router
      .post('', this.create)
      .get('', this.getFrogs)
      .put('/:id', this.update)
  }
  async create(req, res, next) {
    try {
      const frog = await frogsService.create(req.body)
      res.send(frog)
    } catch (error) {
      next(error)
    }
  }
  async getFrogs(req, res, next) {
    try {
      const frogs = await frogsService.getFrogs()
      res.send(frogs)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const frog = await frogsService.update(req.params.id, req.body)
      res.send(frog)
    } catch (error) {
      next(error)
    }
  }
}