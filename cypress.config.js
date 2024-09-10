const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  projectId: "j9bidp",
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: "https://bookcart.azurewebsites.net/",
    }
  },
});
