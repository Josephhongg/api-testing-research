import {
    createCourses,
    deleteCourses
} from '../seed/coursesSeed.js'

switch (process.argv[2]) {
    case "-d": {
        await deleteCourses();
        break;
    }
    default: {
        await createCourses();
    }
}

process.exit();