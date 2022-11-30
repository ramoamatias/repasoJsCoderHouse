console.log("Argumentos de Entrada", process.argv.splice(2));
console.log("Nombre de la plataforma (Sistema Operativo)", process.platform);
console.log("Version de Node", process.version);
console.log("Memoria total reservada", process.memoryUsage().rss);
console.log("Path de Ejecucion", process.execPath);
console.log("Id del Proceso", process.pid);
console.log("Directorio Actual", process.cwd());


