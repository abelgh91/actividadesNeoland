const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}
for (datos in alien){
    console.log(`alien tiene la clave `+ datos + ` con valor: ` +alien[datos])
}