var _ = require('lodash');
const cursoHelpers = {}

cursoHelpers.buscarID_DeMaterialesEnCurso = (NIVELES) => {
    let idMateriales = []
    for (let i = 0; i < NIVELES.length; i++) {
        //console.log(`Nivel ${i+1}:`+ MATERIALES[i]);
        let LECCIONES = NIVELES[i].LECCIONES;
        for (let j = 0; j < LECCIONES.length; j++) {
            //console.log(`Materiales ${i+1}:` + LECCIONES[j].MATERIALES);
            let MATERIALES = LECCIONES[j].MATERIALES;
            for (let k = 0; k < MATERIALES.length; k++) {
                //console.log(`idMaterial de NIVEL ${i+1}:` + MATERIALES[k]._id);
                idMateriales.push(MATERIALES[k]._id);
            }
        }
    }
    return idMateriales;
}

//-------------------------------------------------------------------------------------
//---------------------- funciones para sección AVANCES -------------------------------
//-------------------------------------------------------------------------------------
cursoHelpers.recorridoEnCursosDelAlumno = (cursos, materialesAlumnoTipoExamen) => {
    const ctrlEstadisticas = [];
    let sumatoriasExamenes = [];
    let evalPresentadas = [];
    let evalAcreditadas = [];
    //Estableciendo la cantidad de sumatorias que tendremos, cada elemento del arreglo representa un curso
    for (let i = 0; i < cursos.length; i++) {
        sumatoriasExamenes[i] = 0;
        evalPresentadas[i] = 0;
        evalAcreditadas[i]= 0;
    }
    cursos.forEach(((curso, i) => {
        curso.NIVELES.forEach(((nivel, j) => {
            nivel.LECCIONES.forEach((leccion, k) => {
                leccion.MATERIALES.forEach((material, l) => {
                    materialesAlumnoTipoExamen.forEach((materialAlumno, m) => {
                        if (materialAlumno.idMaterial.equals(material._id)) {
                            sumatoriasExamenes[i] = sumatoriasExamenes[i] + materialAlumno.calificacionExamen;
                            evalPresentadas[i] = evalPresentadas[i] + 1;
                            if (materialAlumno.calificacionExamen >= 8) {
                                evalAcreditadas[i] = evalAcreditadas[i] + 1;
                            }
                        }
                    })
                })
            })
        }))
    }));
    ctrlEstadisticas.push(sumatoriasExamenes, evalPresentadas, evalAcreditadas);
    return ctrlEstadisticas;
}

cursoHelpers.agregarALosCursosDelAlumnoSuPromedio = (cursos, estadisticas) => {
    const sumatoriasExamenes = estadisticas[0];
    const evalPresentadas =estadisticas[1];
    const evalAcreditadas = estadisticas[2];
    cursos.forEach((curso, i) => {
        curso.puntuacion = (Math.round((sumatoriasExamenes[i] / curso.totalLecciones) * 100) / 100);
        curso.evalPresentadas = evalPresentadas[i];
        curso.evalAcreditadas = evalAcreditadas[i];
    });
    return cursos;
}

module.exports = cursoHelpers;