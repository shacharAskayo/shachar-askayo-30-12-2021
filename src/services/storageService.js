export default {
    query,
    save
}

function query(entityType) {
    const entities = JSON.parse(localStorage.getItem(entityType))
    if(entities && entities.length > 0) return [...entities]
    else return []
}

function save(entityType,entities) {
    const entitiesCopy = JSON.parse(JSON.stringify(entities))
    localStorage.setItem(entityType, JSON.stringify(entitiesCopy))
}