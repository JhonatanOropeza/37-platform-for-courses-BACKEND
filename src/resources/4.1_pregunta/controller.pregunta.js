const preguntaController = {};
const Pregunta = require('./model.pregunta');

preguntaController.preguntaPrueba = (req, res) => {
    res.status(200).send({ message: 'preguntaPrueba' });
}
preguntaController.preguntaPruebaAuth = (req, res) => {
    res.status(200).send({ message: 'preguntaPruebaAuth' });
}

preguntaController.post_Pregunta = async (req, res) => {
    const idLeccion = req.params.id;
    const { pregunta, reCorrecta, re1, re2, re3, re4 } = req.body;
    //1.1 Validating form
    if (!pregunta || !reCorrecta || !re1 || !re2 || !re3 || !re4) {
        return res.status(422).send({
            message: 'Enter complete data'
        });
    }
    //1.3 Trying to save the new object in db
    const preguntaToSave = new Pregunta({
        pregunta, reCorrecta, re1, re2, re3, re4, idLeccion
    });
    try {
        let result = await preguntaToSave.save();
        res.status(200).send({ message: 'Question saved', result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error to save the question' })
    }
}

preguntaController.get_PreguntasForOneTest = async (req, res) => {
    const idLeccion = req.params.id;
    //1.- Getting all the questions of the lesson through the id stored in idLEccion
    try {
        const result = await Pregunta.find({ idLeccion });
        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        //2.- Shuffling the results in the array
        const result2 = shuffle(result);
        //3.- Getting only the first 5 elements
        const result3 = result2.slice(0, 5)
        res.status(200).send({ message: 'result', result3 })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Server error" });
    }
}

preguntaController.post_QualifyTest = async (req, res) => {
    try {
        let qualification = [];
        let examPoints = 0;
        //Searching all the questions that match with the lesson
        const idLeccion = req.params.id;
        const lessonQuestions = await Pregunta.find({ idLeccion });
        //Searching an specific question
        const studentResponses = req.body;
        //Checking answers
        for (let i = 0; i < studentResponses.length; i++) {//5 elements in array
            for (let j = 0; j < lessonQuestions.length; j++) {//7 elements in array
                if (studentResponses[i][0] === lessonQuestions[j]._id.toString()) {
                    if (studentResponses[i][1] === lessonQuestions[j].reCorrecta) {
                        qualification[i] = true;
                        examPoints += 2;
                    } else {
                        qualification[i] = false;
                    }
                }
            }
        }
        res.status(200).send({ message: 'result (qualification):', qualification, examPoints });
    } catch (error) {
        res.status(401).send({ message: 'Error al calificar el examen' })
    }
}

module.exports = preguntaController;