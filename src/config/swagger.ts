export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voucher application API",
      version: "1.0.0",
      description: "A simple Express - GraphQL application",
    },
  },
  apis: ["src/server.ts"],
};
