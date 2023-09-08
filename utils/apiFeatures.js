class APIFeatures {
  constructor(query, queryObj) {
    this.query = query
    this.queryObj = queryObj
  }

  filter() {
    const queryObj = {...this.queryObj}
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, '$$$1')
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    const { sort: sortBy = '-createdAt' } = this.queryObj
    this.query = this.query.sort(sortBy)
    return this
  }

  limitFields() {
    const { fields = '-__v' } = this.queryObj
    this.query = this.query.select(fields)
    return this
  }

  paginate() {
    const page = this.queryObj.page * 1 || 1
    const limit = this.queryObj.limit * 1 || 100
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

export default APIFeatures
