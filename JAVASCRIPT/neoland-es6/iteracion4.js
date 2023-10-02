//4.1

const users = [
{id: 1, name: 'Abel'},
{id:2, name: 'Julia'},
{id:3, name: 'Pedro'},
{id:4, name: 'Amanda'}
];

const nombres = users.map((persona) => persona.name);

console.log(nombres);

//4.2

const users = [
{id: 1, name: 'Abel'},
{id:2, name: 'Julia'},
{id:3, name: 'Pedro'},
{id:4, name: 'Amanda'}
];

const nombresModificados = users.map((persona)=> persona.name.startsWith(`A`) ? `Anacleto` : persona.name)
console.log(nombresModificados)

//4.3

const cities = [
	{isVisited:true, name: 'Tokyo'}, 
	{isVisited:false, name: 'Madagascar'},
	{isVisited:true, name: 'Amsterdam'}, 
	{isVisited:false, name: 'Seul'}
];

const citiesVisited = cities.map((city)=> city.isVisited == true ? city.name + ` (Visitado)` : city.name)
console.log(citiesVisited)