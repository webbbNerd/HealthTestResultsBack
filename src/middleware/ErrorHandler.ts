import { Request, Response, NextFunction } from "express";
import { CustomErrorResponse } from "../../types";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    // If headers have already been sent, delegate to the default Express error handler
    return next(err);
  }

  const response: CustomErrorResponse = {
    success: false,
    error: true,
    message: err.message || "Internal server error",
  };

  res.status(500).json(response);
};
