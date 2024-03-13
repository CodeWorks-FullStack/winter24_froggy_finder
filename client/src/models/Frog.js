export class Frog {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.age = data.age
    this.isPoisonous = data.isPoisonous
    this.isToad = data.isToad
    this.color = data.color
    this.likes = data.likes
    this.dislikes = data.dislikes
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}