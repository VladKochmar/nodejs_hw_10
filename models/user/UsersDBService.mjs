import User from './User.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class UsersDBService extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const res = super.getList(filters, { password: 0 }, ['type'])
      return res
    } catch (err) {
      return []
    }
  }
}

export default new UsersDBService(User)
