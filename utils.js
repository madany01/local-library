function formateValidationErrors(errors) {
  return errors
    .array()
    .map(error => [error.param, error])
    .reduce((acc, [param, e]) => {
      if (!acc[param]) acc[param] = []
      acc[param].push(e)
      return acc
    }, {})
}

module.exports = { formateValidationErrors }
