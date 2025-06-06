export function getRcaData(service: string, env: string) {
  return {
    logs: `[ERROR] ${service} - DB connection timeout at 2024-06-01T13:45Z
[WARN] ${service} - Retry attempt failed
[INFO] Deployment started for ${service}:${env}
[INFO] Health check failed post deployment`,
    health: {
      pre: {
        status: "healthy",
        latency_ms: 120,
        error_rate: "0.1%",
      },
      post: {
        status: "degraded",
        latency_ms: 800,
        error_rate: "6.5%",
      },
    },
    configDiff: `- DB_TIMEOUT=5\n+ DB_TIMEOUT=1  <-- Likely cause`,
    suggestion:
      "Root cause is likely a misconfigured `DB_TIMEOUT`. Recommend reverting to previous value and redeploying.",
  };
}