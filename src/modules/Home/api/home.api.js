import axios from 'axios'

class SettingsAPI {
  constructor() {
    this.BASE_URL = 'http://localhost:5000/search'
  }

  async get(search) {
    return axios.get(this.BASE_URL, {params: {search}})
  }

}

export default new SettingsAPI()
