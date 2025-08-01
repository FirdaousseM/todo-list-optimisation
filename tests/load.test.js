import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 100,
  duration: "10s",
};

export default function () {
  const API_URL = __ENV.API_URL;
  let randomNumber = Math.random();
  let postRes = http.post(
    `${API_URL}/todos`,
    JSON.stringify({ title: `Tâche créée par k6 ${randomNumber}` }),
    { headers: { "Content-Type": "application/json" } }
  );

  check(postRes, { "POST status is 201": (r) => r.status === 201 });

  const todo = postRes.json();
  const todoId = todo.id;

  let getRes = http.get(`${API_URL}/todos`);
  check(getRes, { "GET status is 200": (r) => r.status === 200 });

  let patchRes = http.patch(`${API_URL}/todos/${todoId}/done`);

  check(patchRes, { "PATCH status is 200": (r) => r.status === 200 });

  sleep(1);
}
