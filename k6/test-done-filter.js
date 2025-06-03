import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // virtual users
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:3000/todos?done=true');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(0.1);
}
