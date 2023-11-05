//-------------ENUM GENDER----------------

const enumGenderOk = (gender) => {
    const enumGender = ['hombre', 'mujer', 'otros'];
    if (enumGender.includes(gender)) {
      console.log('entro en el true');
      return { check: true, gender };
    } else {
      return {
        check: false,
      };
    }
  };
  
//------------ENUM CCAA-------------------

const enumCcaaOk = (comunidad) => {
  const enumCcaa = ['Andalucia', 'Canarias', 'Catalunya', 'Baleares', 'Aragon', 'Asturias', 'Cantabria', 'Castilla y Leon', 'Castilla y la Mancha', 'Galicia', 'Madrid', 'Extremadura'];
  if (enumCcaa.includes(comunidad)) {
    console.log('entro en el true');
    return { check: true, comunidad };
  } else {
    return {
      check: false,
    };
  }
};

//-----------ENUM PROVINCIA-----------

const enumProvinciaOk = (provincia) => {
  const enumProvincia = ['Tenerife', 'Las Palmas', 'Lleida', 'Mallorca', 'Huesca', 'Asturias', 'Cantabria', 'Leon', 'Ciudad Real', 'Toledo', 'Pontevedra', 'A Coruña', 'Huelva', 'Sevilla', 'Cadiz', 'Malaga', 'Madrid', 'Segovia', 'Caceres', 'Almeria', 'Granada'];
  if (enumProvincia.includes(provincia)) {
    console.log('entro en el true');
    return { check: true, provincia };
  } else {
    return {
      check: false,
    };
  }
};

//---------------ENUM GENDER AVE-------------

const enumGenderAveOk = (gender) => {
  const enumGenderAve = ['macho', 'hembra'];
  if (enumGenderAve.includes(gender)) {
    console.log('entro en el true');
    return { check: true, gender };
  } else {
    return {
      check: false,
    };
  }
};

//--------------ENUM AGE-------------

const enumAgeAveOk = (age) => {
  const enumAgeAve = ['joven', 'adulto'];
  if (enumAgeAve.includes(age)) {
    console.log('entro en el true');
    return { check: true, age };
  } else {
    return {
      check: false,
    };
  }
};

//----------ENUM TYPE------------

const enumTypeAveOk = (type) => {
  const enumTypeAve = ['rapaces', 'pajaros', 'corredoras', 'zancudas', 'gallinaceas', 'anseriformes', 'Sphenisciformes'];
  if (enumTypeAve.includes(type)) {
    console.log('entro en el true');
    return { check: true, type };
  } else {
    return {
      check: false,
    };
  }
};

  module.exports = {
    enumGenderOk, 
    enumCcaaOk, 
    enumProvinciaOk,
    enumGenderAveOk,
    enumAgeAveOk,
    enumTypeAveOk};