import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '300s', target: 20 },
  ],
};

export default function () {
  const res = http.get('http://local.sima-land.ru:3000/');

  check(res, {
    'is status 200': r => r.status === 200,
  });
}
