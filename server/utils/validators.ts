import { body, ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response, RequestHandler } from "express";


export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(422).json({ errors: errors.array() });
  };
};

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("Message is required"),
];