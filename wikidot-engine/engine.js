const express = require("express");
const fs = require("fs");
const path = require("path");
const markdown = require("marked");

const app = express();
const PORT = 3000;

// Config
const SITE_CONFIG = require("./config/site.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));
app.use(express.static("public"));

// Page loader
function loadPage(pageName) {
  const filePath = path.join(__dirname, "pages", `${pageName}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  return markdown.parse(raw);
}

// Routes
app.get("/", (req, res) => {
  const content = loadPage("main");
  res.render("page", {
    title: SITE_CONFIG.title,
    content
  });
});

app.get("/:page", (req, res) => {
  const content = loadPage(req.params.page);
  if (!content) {
    return res.status(404).send("Page not found");
  }

  res.render("page", {
    title: req.params.page.toUpperCase(),
    content
  });
});

app.listen(PORT, () => {
  console.log(`Wikidot-like engine running on http://localhost:${PORT}`);
});
