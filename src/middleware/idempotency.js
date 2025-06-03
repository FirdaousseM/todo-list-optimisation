const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});
client.connect();

module.exports = async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];

  if (!key) return next();

  const redisKey = `idempotency:${key}`;
  const cached = await client.get(redisKey);

  if (cached) {
    const parsed = JSON.parse(cached);
    return res.status(parsed.statusCode).json(parsed.body);
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const responseToCache = {
      statusCode: res.statusCode || 200,
      body
    };
    client.set(redisKey, JSON.stringify(responseToCache), {
      EX: 86400 // expire après 24h
    });
    return originalJson(body);
  };

  next();
};
