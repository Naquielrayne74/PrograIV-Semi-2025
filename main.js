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
    let bloques = binarios.map(bin =>
      bin.match(/.{1,4}/g).join(" ")
    );
  
    // Eliminar bloques de ceros al final
    while (bloques.length && bloques[bloques.length - 1] === "0000 0000 0000 0000") {
      bloques.pop();
    }
  
    // Agregar "::" al final para indicar ceros comprimidos
    return bloques.join(": ") + "::";
  }
  
  function convertirIPv6() {
    const ipv6 = document.getElementById("ipv6").value.trim();
    try {
      const grupos = expandirIPv6(ipv6);
      const binarios = grupos.map(hex =>
        parseInt(hex, 16).toString(2).padStart(16, '0')
      );
      const resultadoFormateado = formatearBinarioIPv6(binarios);
      document.getElementById("resultado").innerText = resultadoFormateado;
    } catch (error) {
      document.getElementById("resultado").innerText = "Dirección no válida.";
    }
  }
  
  
  