module.exports = {
  apps: [
    {
      name: "todo-list-optimisation",
      script: "src/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        DATABASE_URL: "file:./dev.db",
      },
    },
  ],
};
