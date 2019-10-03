import homeAPI from '../api/home.api'
import _ from 'lodash'

class HomeService {
  async get(search) {
    let { data }  = await homeAPI.get(search)
    let transformedData = transformData([data])
    return transformedData
  }
}

function transformData(data, parent) {
  return _.flatMapDeep(_.map(data, function(item){
    let id = `${parent? parent : ''}_${item.word}`
    return [{
      group: 'nodes',
      data: {
        id: id,
        word: item.word
      },
      selected: false, // whether the element is selected (default false)
      selectable: false, // whether the selection state is mutable (default true)
      locked: false, // when locked a node's position is immutable (default false)
      grabbable: true, // whether the node can be grabbed and moved by the user
      pannable: false, // whether dragging the node causes panning instead of grabbing
      classes: [] // an array (or a space separated string) of class names that the element has
    }, 
    parent ? {
      group: 'edges',
      data: {
        id: `edge_${parent}_${item.word}`,
        source: parent,
        target: id
      }
    } : []
    ,transformData(item.synonyms, id)]
  }))

}

export default new HomeService()
