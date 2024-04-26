import { 
    createDepartments,
    deleteDepartments
} from '../seed/departmentsSeed.js';

switch (process.argv[2]) {
    case "-d": {
        await deleteDepartments();
        break;
    }
    default: {
        await createDepartments();
    }
}

process.exit();