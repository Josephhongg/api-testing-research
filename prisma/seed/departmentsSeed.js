import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { departments } from "../../data/departments.js";

dotenv.config();

const createDepartments = async () => {
    try {
        await prisma.department.deleteMany({});

        const createMany = departments.map(department => {
            return prisma.department.create({
                data: department
            });
        });

        await Promise.all(createMany);

        console.log("Departments data successfully created")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const deleteDepartments = async () => {
    try {
        await prisma.department.deleteMany({})
        console.log("Departments data successfully deleted")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export { 
    createDepartments, 
    deleteDepartments
}