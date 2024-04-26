import dotenv from "dotenv"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { institutions } from '../../data/institutions.js'

dotenv.config();

const createInstitutions = async () => {
  try {
    await prisma.institution.deleteMany({}) // Delete all records in the institutions table

    const createMany = institutions.map((institution) => {
      return prisma.institution.create({
        data: institution,
      })
    })

    await Promise.all(createMany) // Insert records in the institutions table

    console.log('Institution data successfully created')
  } catch (err) {
    console.log(err)
    process.exit(1) // Exit the process with an error
  }
};

const deleteInstitutions = async () => {
  try {
    await prisma.institution.deleteMany({})
    console.log('Institution data successfully deleted')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
};

export { 
  createInstitutions, 
  deleteInstitutions 
}