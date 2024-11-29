import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Type from './Type.mjs'

class TypesDBSerivce extends MongooseCRUDManager {
  static async getList(filters) {
    try {
      const res = await Type.find(filters, { title: 1 })
      return res
    } catch (err) {
      return []
    }
  }
}

export default new TypesDBSerivce(Type)
