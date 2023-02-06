import { z, ZodError } from 'zod';
import AppError from '../errors/AppError/AppError.js';
import BadRequest from '../errors/BadRequest/BadRequest.js';
import JwtInvalidError from '../errors/JwtInvalidError/JwtInvalidError.js';
import JwtExpiredError from '../errors/JwtExpiredError/JwtExpiredError.js';
import InternalServerError from '../errors/InternalServerError/InternalServerError.js';
import ConflictError from '../errors/ConflictError/ConflictError.js';
import logger from '../config/logger.js';


const userLogin = z.object ({
    email: z.string().email(),
    password: z.string().passmax(16).min(6),
})

const formsContact = z.object ({
    company: z.string(),
    representative: z.string(),
    email: z.string().email(),
    telephone: z.string().max(15),
    menssage: z.string().max(1500).min(20),
});

const formsBudget = z.object ({
    name: z.string().max(40).min(10),
    company: z.string(),
    email: z.string().email(),
    telephone: z.string().max(15),
    country: z.string().max(30).min(4),
    state: z.string().max(30).min(4),
    city: z.string().max(30).min(4),
    ZIPcode: z.string().max(8).min(5),
    address: z.string().max(50).min(5),
});

async function errorHandler(
  rawData: any
): Promise<{success: Boolean; errors: any}> {
    try{
        const data = userLogin.parse(rawData);
    }
    catch(e) {
        if(e instanceof ZodError) {
            return { succes: false, errors: e.flatten()}
        } else {
          throw e;
        }
    }



};
export default errorHandler;