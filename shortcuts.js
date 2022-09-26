async function getObjectOr404(Model, objectId) {
  try {
    return await Model.findById(objectId).orFail()
  } catch {
    const error = new Error(`${Model.modelName} not found`)
    error.status = 404
    throw error
  }
}

// eslint-disable-next-line import/prefer-default-export
module.exports = { getObjectOr404 }
