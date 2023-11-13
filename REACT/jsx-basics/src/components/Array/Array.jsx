
export const Array = () => {
    const heroes = ['superman', 'ironman', 'hulk'];

    return (
        <ul>{heroes.map((heroe, index) => (
            <li key={index}>{heroe}</li>
        ))}</ul>
    )
}