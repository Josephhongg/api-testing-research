import { 
    createInstitutions, 
    deleteInstitutions 
} from "../seed/institutionsSeed.js";

switch (process.argv[2]) {
    case "-d": {
        await deleteInstitutions();
        break;
    }
    default: {
        await createInstitutions();
    }
}

process.exit();