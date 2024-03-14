import { Schema } from "mongoose";

/**
 * @param {String} pictureValue
 */
function _validateURL(pictureValue) {
  return pictureValue.startsWith('https://') || pictureValue.startsWith('http://')
}

/**
 * @param {String[]} likesValue
 */
function _validateLikes(likesValue) {
  return likesValue.every(like => like.length < 26)
}

export const FrogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 30
    },
    picture: {
      type: String,
      required: true,
      maxLength: 1000,
      validate: { validator: _validateURL, message: "Please supply a valid URL" },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100
    },
    isPoisonous: {
      type: Boolean,
      required: true,
      default: false
    },
    isToad: {
      type: Boolean,
      required: true,
      default: false
    },
    color: {
      type: String,
      maxLength: 50
    },
    likes: {
      type: [String],
      validate: { validator: _validateLikes, message: "A like can only be up to 25 characters" },
    },
    dislikes: {
      type: [String],
      validate: { validator: _validateLikes, message: "A dislike can only be up to 25 characters" },
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

export class FrogQuery {
  constructor(queryObject) {
    // NOTE creates regex string for match, i denotes ignore case, g denotes looks through whole string for match
    this.name = new RegExp(queryObject.name, 'ig')
    this.color = new RegExp(queryObject.color, 'ig')
  }
}