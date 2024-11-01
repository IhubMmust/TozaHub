
import { connectToMongoDB } from "./payments/helpers/mongodb.js";
console.log("RUnning the workers ....")
connectToMongoDB()

import walletWorker from "./payments/jobs/workers/walletWorker.js";
import sensorWorker from "./payments/jobs/workers/sensorWorker.js";
import transactionWorker from "./payments/jobs/workers/transactionWorker.js";
import mailWorker from "./payments/jobs/queues/mailWorker.js";


export default {walletWorker, sensorWorker, transactionWorker, mailWorker}