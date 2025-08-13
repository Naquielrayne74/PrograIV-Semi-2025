function expandirIPv6(ipv6) {
  const bloques = ipv6.split("::");
  let parte1 = bloques[0] ? bloques[0].split(":") : [];
  let parte2 = bloques[1] ? bloques[1].split(":") : [];
  const faltantes = 8 - (parte1.length + parte2.length);
  const ceros = Array(faltantes).fill("0000");
  const grupos = [...parte1, ...ceros, ...parte2];
  return grupos.map(g => g.padStart(4, '0'));
}

function formatearBinarioIPv6(binarios) {
  let bloques = binarios.map(bin => bin.match(/.{1,4}/g).join(" "));
  while (bloques.length && bloques[bloques.length - 1] === "0000 0000 0000 0000") {
    bloques.pop();
  }
  return bloques.join(": ") + "::";
}

function binarioAIPv6(binario) {
  const limpio = binario.replace(/\s|:/g, '');
  const grupos = limpio.match(/.{1,16}/g);
  if (!grupos || grupos.length > 8) throw new Error("Binario inválido. Asegúrese de ingresar 128 bits.");
  return grupos.map(g => parseInt(g, 2).toString(16).padStart(4, '0')).join(":");
}

function convertir() {
  const modo = document.getElementById("modo").value;
  const mascara = document.getElementById("mascara").value.trim();
  const resultado = document.getElementById("resultado");
  const btnCopiar = document.getElementById("btnCopiar");

  try {
    let salida = "";
    if (modo === "ipv6-bin") {
      const ipv6 = document.getElementById("ipv6").value.trim();
      const grupos = expandirIPv6(ipv6);
      const binarios = grupos.map(hex =>
        parseInt(hex, 16).toString(2).padStart(16, '0')
      );
      salida = formatearBinarioIPv6(binarios);
    } else {
      const bin = document.getElementById("binario").value.trim();
      salida = binarioAIPv6(bin);
    }
    if (mascara) salida += " " + mascara;
    
    resultado.textContent = salida;
    resultado.style.display = "block";
    btnCopiar.style.display = "inline-block";
  } catch (error) {
    resultado.textContent = "Error: " + error.message;
    resultado.style.display = "block";
    btnCopiar.style.display = "none";
  }
}

function cambiarModo() {
  const modo = document.getElementById("modo").value;
  document.getElementById("ipv6-input").style.display = modo === "ipv6-bin" ? "block" : "none";
  document.getElementById("binario-input").style.display = modo === "bin-ipv6" ? "block" : "none";
}

function copiarResultado() {
  const texto = document.getElementById("resultado").textContent;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById("btnCopiar");
    btn.textContent = "¡Copiado!";
    setTimeout(() => btn.textContent = "Copiar", 1500);
  });
}
