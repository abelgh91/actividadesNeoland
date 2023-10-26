const enumOk = (gender) => {
    const enumGender = ["hombre", "mujer", "otro"];
    if(enumGender.includes(gender)){
        console.log("Entro a true ✔")
        return { check: true, gender}
    }else {
        return { check: false,
        };
    }
};

module.exports = enumOk;