import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { courses } from "../../data/courses.js";

dotenv.config();

const createCourses = async () => {
    try {
        await prisma.course.deleteMany({});

        const createMany = courses.map(course => {
            return prisma.course.create({
                data: course
            })
        })

        await Promise.all(createMany)

        console.log('Courses data successfully created')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const deleteCourses = async () => {
    try {
        await prisma.course.deleteMany({});
        console.log("Courses data successfully deleted");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export {
    createCourses,
    deleteCourses
}