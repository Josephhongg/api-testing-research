import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getInstitution = async (req, res) => {
  try {
    const { id } = req.params

    const institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    })

    if (!institution) {
      return res.status(200).json({
        success: true,
        msg: `No institution with the id: ${id} found`,
      })
    }

    return res.json({
      success: true,
      data: institution,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting a institution',
    })
  }
}

const getInstitutions = async (req, res) => {
  try {
    const institutions = await prisma.institution.findMany({
      include: {
        departments: true,
      },
    })

    if (institutions.length === 0) {
      return res.status(200).json({
        success: false,
        msg: 'No institutions found',
      })
    }

    return res.json({
      success: true,
      data: institutions,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting institutions',
    })
  }
}

const createInstitution = async (req, res) => {
  try {
    const { name, country } = req.body // destructuring object

    await prisma.institution.create({
      data: { name, country },
    })

    const newInstitutions = await prisma.institution.findMany({
      include: {
        departments: true,
      },
    })

    return res.status(201).json({
      success: true,
      msg: 'Institution successfully created',
      data: newInstitutions,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while creating a institution',
    })
  }
}

const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params
    const { name, country } = req.body

    let institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    })

    if (!institution) {
      return res.status(200).json({
        success: false,
        msg: `No institution with the id: ${id} found`,
      })
    }

    institution = await prisma.institution.update({
      where: { id: Number(id) },
      data: { name, country },
    })

    return res.json({
      success: true,
      msg: `Institution successfully updated`,
      data: institution,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong updating a institution',
    })
  }
}

const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params

    const institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    })

    if (!institution) {
      return res.status(200).json({
        success: false,
        msg: `No institution with the id: ${id} found`,
      })
    }

    await prisma.institution.delete({
      where: { id: Number(id) },
    })

    return res.json({
      success: true,
      msg: `Institution successfully deleted`,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while deleting an institution',
    })
  }
}

export {
  getInstitution,
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
}
