export const ArrayObjetos = () => {
    const info = [
        {
            name: 'Abel', age: 32
        },
        {
            name: 'Maria', age: 24
        },
        {
            name: 'Isabel', age: 27
        },
    ];
    return (
        <ul>{info.map((persona, index) => (
        <li key={index}>{persona.name}</li>
        ))}
        </ul>
    )
};

