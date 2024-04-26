import { Router } from 'express'
const router = Router() // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
} from '../controllers/institutions.js'

router.route('/').get(getInstitutions).post(createInstitution)
router.route('/:id').get(getInstitution).put(updateInstitution).delete(deleteInstitution)

export default router // You do not need to enclose router in curly braces