import * as dotenv from "dotenv";
const environment = process.env.NODE_ENV || "dev";
dotenv.config({ path: `.env.${environment}` });

import { app } from "./app";
const PORT = process.env.PORT;

import { populateDummyData } from "./database/database_seed";

console.log(`🌍 Running in ${environment} environment`);

app.listen(PORT, () => {
	console.log(`🚂 Express started on port ${PORT}`);

	// Seed the database with some data
	if (environment === "dev") {
		populateDummyData();
	}
});
