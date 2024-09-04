import { Bucket, connect, Collection, Scope } from "couchbase";

const DB_CONN_STR = process.env.DB_CONN_STR || "";
const DB_ADMINISTRATOR_USERNAME = process.env.DB_ADMINISTRATOR_USERNAME;
const DB_ADMINISTRATOR_PASSWORD = process.env.DB_ADMINISTRATOR_PASSWORD;

export async function getCouchbaseConnection() {
  const cluster = await connect(DB_CONN_STR, {
    username: DB_ADMINISTRATOR_USERNAME,
    password: DB_ADMINISTRATOR_PASSWORD,
  });

  const Bucket: Bucket = cluster.bucket("UserTodoDB");
  const Scope: Scope = Bucket.scope("user-todo");
  const users: Collection = Scope.collection("User_Todo");

  return {
    cluster,
    users,
  };
}
