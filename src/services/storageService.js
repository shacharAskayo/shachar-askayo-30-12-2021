export default {
    query,
    save
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType))
    if(entities && entities.length > 0) return JSON.parse(JSON.stringify(entities))
    else return []
    
}

function save(entityType,entities) {
    var entitiesCopy = JSON.parse(JSON.stringify(entities))
    localStorage.setItem(entityType, JSON.stringify(entitiesCopy))
}