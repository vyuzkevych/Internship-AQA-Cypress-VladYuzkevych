const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  projectId: "j9bidp",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
