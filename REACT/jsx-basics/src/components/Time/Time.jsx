import React from "react";
import { x } from "../../utils/hours";

export const Time = () => {
const saludos = x >= 6 && x < 12 ? 'Buenos dias' : x >= 12 && x < 20 ? 'Buenas tardes' : 'Buenas noches'

return (
    <div>
        <h2>{saludos}</h2>
      </div>
)
}




