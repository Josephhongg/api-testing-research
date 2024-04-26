import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getCourse = async (req, res) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
    })

    if (!course) {
      return res.status(200).json({
        success: false,
        msg: `No course with the id: ${id} found`,
      })
    }

    return res.json({
      success: true,
      data: course,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting a course',
    })
  }
}

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany()

    if (courses.length === 0) {
      return res.status(200).json({
        success: false,
        msg: 'No courses found',
      })
    }

    return res.json({
      success: true,
      data: courses,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting courses',
    })
  }
}

const createCourse = async (req, res) => {
  try {
    const { name, departmentName } = req.body

    await prisma.course.create({
      data: { name, departmentName },
    })

    const newCourses = await prisma.course.findMany()

    return res.status(201).json({
      success: true,
      msg: 'Course successfully created',
      data: newCourses,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while getting a course',
    })
  }
}

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const { name, departmentName } = req.body

    let course = await prisma.course.findUnique({
      where: { id: Number(id) },
    })

    if (!course) {
      return res.status(200).json({
        success: false,
        msg: `No course with the id: ${id} found`,
      })
    }

    course = await prisma.course.update({
      where: { id: Number(id) },
      data: { name, departmentName },
    })

    return res.json({
      success: true,
      msg: `Course successfully updated`,
      data: course,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while updating a course',
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params

    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
    })

    if (!course) {
      return res.status(200).json({
        success: false,
        msg: `No course with the id: ${id} found`,
      })
    }

    await prisma.course.delete({
      where: { id: Number(id) },
    })

    return res.json({
      success: true,
      msg: `Course successfully deleted`,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message || 'Something went wrong while deleting a player',
    })
  }
}

export { 
  getCourse, 
  getCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse 
}
