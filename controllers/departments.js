import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const department = await prisma.department.findUnique({
      where: { id: Number(id) },
    })

    if (!department) {
      return res.status(200).json({
        success: false,
        msg: `No department with the id: ${id} found`,
      })
    }

    return res.json({
      success: true,
      data: department,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting a player',
    })
  }
}

const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        courses: true,
      },
    })

    if (departments.length === 0) {
      return res.status(200).json({
        success: false,
        msg: 'No departments found',
      })
    }

    return res.json({
      success: true,
      data: departments,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting players',
    })
  }
}

const createDepartment = async (req, res) => {
  try {
    const { name, location, institutionName } = req.body

    await prisma.department.create({
      data: { name, location, institutionName },
    })

    const newDepartments = await prisma.department.findMany()

    return res.status(201).json({
      success: true,
      msg: 'Department successfully created',
      data: newDepartments,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while creating a department',
    })
  }
}

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params
    const { name, location, institutionName } = req.body

    let department = await prisma.department.findUnique({
      where: { id: Number(id) },
    })

    if (!department) {
      return res.status(200).json({
        success: false,
        msg: `No department with the id: ${id} found`,
      })
    }

    department = await prisma.department.update({
      where: { id: Number(id) },
      data: { name, location, institutionName },
    })

    return res.json({
      success: true,
      msg: `Department successfully updated`,
      data: department,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while updating a department',
    })
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params

    const department = await prisma.department.findUnique({
      where: { id: Number(id) },
    })

    if (!department) {
      return res.status(200).json({
        success: false,
        msg: `No department with the id: ${id} found`,
      })
    }

    await prisma.department.delete({
      where: { id: Number(id) },
    })

    return res.json({
      success: true,
      msg: `Department successfully deleted`,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while deleting department',
    })
  }
}

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
