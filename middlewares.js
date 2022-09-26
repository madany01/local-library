function ensureRequestPayloadItemIsArray({ itemName, lookIn = 'body' }) {
  if (!itemName) throw new Error('item name must be specified')

  return (req, res, next) => {
    const itemValue = req[lookIn][itemName]

    if (!Array.isArray(itemValue)) {
      const casted = typeof itemValue === 'undefined' ? [] : [itemValue]
      req[lookIn][itemName] = casted
    }
    next()
  }
}

module.exports = {
  ensureRequestPayloadItemIsArray,
}
