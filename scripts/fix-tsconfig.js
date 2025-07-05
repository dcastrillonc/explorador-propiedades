const fs = require("fs");

const TS_CONFIG_PATH = "./tsconfig.json";

try {
  const tsconfig = JSON.parse(fs.readFileSync(TS_CONFIG_PATH, "utf8"));

  if (tsconfig.include) {
    tsconfig.include = tsconfig.include.filter(
      (entry) => !entry.includes(".next/types")
    );
  }

  fs.writeFileSync(
    TS_CONFIG_PATH,
    JSON.stringify(tsconfig, null, 2) + "\n",
    "utf8"
  );

  console.log("Limpieza completada: '.next/types' eliminado de tsconfig.json");
} catch (err) {
  console.error("Error limpiando tsconfig.json:", err);
  process.exit(1);
}
