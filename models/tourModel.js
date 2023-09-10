import mongoose from 'mongoose'
import slugify from 'slugify'

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    minLength: [10, 'A tour name must more or equal than 10'],
    maxLength: [40, 'A tour name must less or equal than 40'],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulity is either: easy, medium, difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1.0, 'The rating must above 1.0'],
    max: [5.0, 'The rating must below 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        return val > 0 && val < this.price
      },
      message: 'Discount price ({VALUE}) must below price',
    },
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}
)
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7
})

// DOCUMENT MIDDLEWARE: ruuns bewfore .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {lower: true})
  next()
})
tourSchema.post('save', function(doc, next) {
  console.log('🚀 ~ file: tourModel.js:70 ~ tourSchema.post ~ doc:', doc)
  next()
})

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function(next) {
  this.find({secretTour: {$ne: true}})
  this.startTime = Date.now()
  next()
})
tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query time : ${ Date.now() - this.startTime }`)
  next()
})

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  next()
})

const Tour = new mongoose.model('Tour', tourSchema)
export default Tour
