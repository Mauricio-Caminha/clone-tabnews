export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An internal server error ocurred.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Get in touch with the support team.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Method not allowed.");
    this.name = "MethodNotAllowedError";
    this.message = "Method not allowed.";
    this.action = "Verify if the HTTP method is valid for the route.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
