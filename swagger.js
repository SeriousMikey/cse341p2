const swaggerAutogen = require("swagger-autogen")();

const doc = {
    Info: {
        title: "Charity Donations API",
        description: "Charity Donations API"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);