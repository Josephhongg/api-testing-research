import { Router } from 'express'
const router = Router() // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courses.js'

router.route('/').get(getCourses).post(createCourse)
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse)

export default router // You do not need to enclose router in curly braces