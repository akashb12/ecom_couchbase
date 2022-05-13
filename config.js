const couchbase = require("couchbase");
// const cluster = new couchbase.Cluster("couchbase://127.0.0.1:8091");
// cluster.authenticate("Administrator", "adit123");
const cluster = new couchbase.Cluster("couchbase://127.0.0.1:8091", {
  username: "Administrator",
  password: "adit123",
});
const bucket = cluster.bucket("ecom");
console.log("bucket connected");
module.exports = {
  bucket: bucket,
  cluster: cluster,
};
// async function mainFunc() {
//   const clusterConnStr = "couchbase://localhost";
//   const username = "Administrator";
//   const password = "adit123";
//   const bucketName = "ecom";

//   const cluster = await couchbase.connect(clusterConnStr, {
//     username: username,
//     password: password,
//     // timeouts: {
//     //   kvTimeout: 10000, // milliseconds
//     // },
//   });

//   var bucket = cluster.bucket(bucketName);
//   console.log("bucket connected");
//   return bucket;
//   // const collection = bucket.scope("_default").collection("Users");

//   // const user = {
//   //   type: "user",
//   //   name: "Michael",
//   //   email: "michael123@test.com",
//   //   interests: ["Swimming", "Rowing"],
//   // };

//   // // Create and store a document
//   // await collection.upsert("michael123", user);

//   // // Load the Document and print it
//   // // Prints Content and Metadata of the stored Document
//   // let getResult = await collection.get("michael123");
//   // console.log("Get Result: ", getResult);
// }
// module.exports = mainFunc;
