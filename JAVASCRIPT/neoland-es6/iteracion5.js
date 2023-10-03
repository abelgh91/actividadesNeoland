//5.1

const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
const newArray = ages.filter((element)=> element > 18)
console.log(newArray)

//5.2

const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
const agesPar = ages.filter((element)=> element % 2 === 0)
console.log(agesPar)

//5.3

const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'}, 
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}]


    const newStreamers = streamers.filter((streamer)=> streamer.gameMorePlayed === 'League of Legends')
    console.log(newStreamers)

//5.4

const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

const streamersConU = streamers.filter((streamer)=> streamer.name.includes(`u`))
console.log(streamersConU)

//5.5

const streamers = [
	{name: 'Rubius', age: 32, gameMorePlayed: 'Minecraft'},
	{name: 'Ibai', age: 25, gameMorePlayed: 'League of Legends'},
	{name: 'Reven', age: 43, gameMorePlayed: 'League of Legends'},
	{name: 'AuronPlay', age: 33, gameMorePlayed: 'Among Us'}
];

const streamersCondiciones = streamers.filter((streamer)=> streamer.gameMorePlayed.includes (`Legends`));
streamersCondiciones.forEach((streamer)=>{
    if (streamer.age > 35) {
streamer.gameMorePlayed = streamer.gameMorePlayed.toUpperCase()
    }
})
console.log(streamersCondiciones)

