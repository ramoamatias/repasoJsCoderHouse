const getNumberRandoms = (cant = 100000000) => {
  const obj = {};
  for (let i = 1; i <= cant; i++) {
    const numRandom = Math.ceil(Math.random() * 1000);
    !obj[numRandom] ? (obj[numRandom] = 1) : (obj[numRandom] += 1);
  }
  return obj;
};

process.on("message", (message) => {
  const { cant } = JSON.parse(message);
  const resultado = getNumberRandoms(cant);
  process.send(resultado);
  process.exit();
});
