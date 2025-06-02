import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "1s",
};

export default function () {
  const API_URL = __ENV.API_URL;
  let randomNumber = Math.random();
  let postRes = http.post(
    `${API_URL}/todos`,
    JSON.stringify({ title: `Tâche créée par k6 ${randomNumber}` }),
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("POST status:", postRes.status);
  console.log("POST body:", postRes.body);
  console.log("POST json.json:", postRes.json().json);

  check(postRes, { "POST status is 201": (r) => r.status === 201 });

  const todo = postRes.json();
  const todoId = todo.id;

  let getRes = http.get(`${API_URL}/todos`);
  check(getRes, { "GET status is 200": (r) => r.status === 200 });

  let patchRes = http.patch(`${API_URL}/${todoId}/done`);
  check(patchRes, { "PATCH status is 200": (r) => r.status === 200 });

  sleep(1);
}
