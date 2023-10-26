const rollDice=(caras)=> {
    const numeroAleatorio = Math.floor (Math.random() * (caras - 1) + 1)
    return numeroAleatorio
}
const numeroAleatorio7 = rollDice(8)
console.log(`El resultado del dado de 7 caras es: ${numeroAleatorio7}`);
