import { useState } from "react";

export const Boton = () => {
    const [button, setButton] = useState(false)

    return (
        <div><button onClick = {() => setButton(!button)}>Cambia el boolean</button>
        {button && <p>contenido renderizado al cambiar el valor</p>}</div>
    )
} 

