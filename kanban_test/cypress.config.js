const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://kanban-dusky-five.vercel.app/",
    viewportWidth: 1280,
    viewportHeight: 720
  },
});
