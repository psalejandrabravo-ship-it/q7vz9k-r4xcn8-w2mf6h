import type { World } from "@/types/game";

const S = "/assets/illustrations/scenes";
const C = "/assets/illustrations/cards";

export const mundo1: World = {
  id: "m1",
  name: "El Jardín de la Amistad",
  blurb: "Elegimos la lámina que muestra una buena acción.",
  coverSrc: "/assets/illustrations/covers/mundo1.jpg",
  badgeName: "Amigo Invitador",
  badgeSrc: "/assets/illustrations/objects/insignia_mundo1.jpg",
  accent: "garden",
  situations: [
    {
      id: "m1-s1",
      title: "El amigo nuevo",
      mechanic: "choose",
      hint: "Haz clic en la opción correcta",
      scenes: [
        {
          src: `${S}/mundo1_situacion1_escena1.jpg`,
          alt: "Mateo está sentado solo en el patio, abrazando su mochila, mientras un grupo juega a la pelota.",
        },
        {
          src: `${S}/mundo1_situacion1_escena3.jpg`,
          alt: "Camila ofrece la mano a Mateo y lo invita a jugar. Mateo comienza a sonreír.",
        },
      ],
      narration:
        "Mateo es nuevo en el colegio. No conoce a nadie y se siente solito. ¿Qué podemos hacer para ayudarlo?",
      optionsDescription:
        "En la lámina 1, los niños invitan a Mateo a jugar. En la lámina 2, los niños siguen jugando sin él. En la lámina 3, los niños se ríen de Mateo. ¿Cuál es la correcta? Levanten 1, 2 o 3 dedos.",
      feedbackCorrect:
        "¡Muy bien! Invitar a Mateo a jugar es lo correcto. Cuando vemos a alguien solo, lo invitamos a jugar con nosotros. Así Mateo se siente bienvenido y feliz.",
      feedbackIncorrect:
        "Mmm, pensemos otra vez. Mateo está solito y triste. ¿Qué lo haría sentir mejor? ¡Claro! Que lo inviten a jugar. La lámina correcta es la número 1.",
      choices: [
        {
          id: "A",
          label: "Lámina 1. Lo invitan a jugar.",
          src: `${C}/mundo1_situacion1_opcionA.jpg`,
          alt: "Todos los niños, incluyendo a Mateo y Camila, juegan juntos a la pelota.",
          correct: true,
        },
        {
          id: "B",
          label: "Lámina 2. Siguen sin él.",
          src: `${C}/mundo1_situacion1_opcionB.jpg`,
          alt: "El grupo juega de espaldas a Mateo, que sigue sentado solo.",
          correct: false,
        },
        {
          id: "C",
          label: "Lámina 3. Se ríen de él.",
          src: `${C}/mundo1_situacion1_opcionC.jpg`,
          alt: "Tres niños señalan a Mateo y se ríen.",
          correct: false,
        },
      ],
      closingSrc: `${C}/mundo1_situacion1_opcionA.jpg`,
      closingAlt: "Mateo ya está incluido en el juego.",
    },
    {
      id: "m1-s2",
      title: "La rodilla raspada",
      mechanic: "choose",
      hint: "Haz clic en la opción correcta",
      scenes: [
        {
          src: `${S}/mundo1_situacion2_escena2.jpg`,
          alt: "Sofía está en el suelo, se toca la rodilla, con expresión de dolor.",
        },
        {
          src: `${S}/mundo1_situacion2_escena3.jpg`,
          alt: "Sofía llora sentada en el suelo, con la rodilla raspada.",
        },
      ],
      narration:
        "¡Oh no! Sofía se cayó y se raspó la rodilla. Le duele mucho y está llorando. ¿Qué debemos hacer?",
      optionsDescription:
        "En la lámina 1, un niño la ayuda a levantarse y la lleva con la profesora. En la lámina 2, los niños siguen jugando sin ayudarla. En la lámina 3, los niños solo la miran pero no hacen nada.",
      feedbackCorrect:
        "¡Excelente! Cuando alguien se lastima, lo ayudamos a levantarse y buscamos a un adulto. Eso es ser un buen amigo.",
      feedbackIncorrect:
        "Pensemos juntos. Sofía está llorando y le duele. ¿Es correcto dejarla sola? No. Debemos ayudarla.",
      choices: [
        {
          id: "A",
          label: "Lámina 1. La ayudan.",
          src: `${C}/mundo1_situacion2_opcionA.jpg`,
          alt: "Lucas ayuda a Sofía a levantarse. La educadora se acerca con un botiquín.",
          correct: true,
        },
        {
          id: "B",
          label: "Lámina 2. Siguen jugando.",
          src: `${C}/mundo1_situacion2_opcionB.jpg`,
          alt: "Sofía llora sola. El grupo sigue jugando lejos.",
          correct: false,
        },
        {
          id: "C",
          label: "Lámina 3. Solo la miran.",
          src: `${C}/mundo1_situacion2_opcionC.jpg`,
          alt: "Tres niños miran a Sofía desde lejos, sin ayudar.",
          correct: false,
        },
      ],
      closingSrc: `${C}/mundo1_situacion2_opcionA.jpg`,
      closingAlt: "Sofía es ayudada por un compañero y una adulta.",
    },
    {
      id: "m1-s3",
      title: "La colación difícil",
      mechanic: "choose",
      hint: "Haz clic en la opción correcta",
      scenes: [
        {
          src: `${S}/mundo1_situacion3_escena1.jpg`,
          alt: "Hora de colación. Diego saca una caja de jugo de su lonchera.",
        },
        {
          src: `${S}/mundo1_situacion3_escena2.jpg`,
          alt: "Diego intenta abrir la caja de jugo y no puede.",
        },
      ],
      narration:
        "Diego no puede abrir su jugo. Lo intenta y lo intenta pero no puede. Se está poniendo triste y frustrado. ¿Qué hacemos?",
      optionsDescription:
        "En la lámina 1, un niño le ayuda a abrir el jugo. En la lámina 2, un niño le quita el jugo y se lo toma él. En la lámina 3, un niño se ríe de él.",
      feedbackCorrect:
        "¡Perfecto! Ayudar a los demás cuando tienen dificultades es ser empático. Todos necesitamos ayuda a veces.",
      feedbackIncorrect:
        "Mmm, eso no es correcto. Cuando alguien necesita ayuda, lo ayudamos. No le quitamos sus cosas ni nos reímos.",
      choices: [
        {
          id: "A",
          label: "Lámina 1. Lo ayudan.",
          src: `${C}/mundo1_situacion3_opcionA.jpg`,
          alt: "Emma ayuda a Diego a abrir su caja de jugo.",
          correct: true,
        },
        {
          id: "B",
          label: "Lámina 2. Le quitan el jugo.",
          src: `${C}/mundo1_situacion3_opcionB.jpg`,
          alt: "Un niño toma el jugo de Diego y se lo bebe.",
          correct: false,
        },
        {
          id: "C",
          label: "Lámina 3. Se ríen.",
          src: `${C}/mundo1_situacion3_opcionC.jpg`,
          alt: "Dos niños se ríen de Diego.",
          correct: false,
        },
      ],
      closingSrc: `${C}/mundo1_situacion3_opcionA.jpg`,
      closingAlt: "Emma y Diego abren el jugo juntos.",
    },
    {
      id: "m1-s4",
      title: "El juguete prestado",
      mechanic: "choose",
      hint: "Haz clic en la opción correcta",
      scenes: [
        {
          src: `${S}/mundo1_situacion4_escena1.jpg`,
          alt: "Valentina juega con un auto rojo. Tomás se acerca con interés.",
        },
        {
          src: `${S}/mundo1_situacion4_escena2.jpg`,
          alt: "Tomás pide prestado el auto. Valentina piensa si prestárselo.",
        },
      ],
      narration:
        "Tomás quiere jugar con el auto de Valentina. Le pide prestado el auto por un ratito. ¿Qué debería hacer Valentina?",
      optionsDescription:
        "En la lámina 1, Valentina le presta el auto con gusto. En la lámina 2, Valentina se niega y se lo guarda. En la lámina 3, Valentina esconde el auto.",
      feedbackCorrect:
        "¡Muy bien! Prestar nuestros juguetes a los amigos es ser generoso. Después Tomás se lo devolverá y ambos pueden jugar felices.",
      feedbackIncorrect:
        "Pensemos. Cuando compartimos, hacemos felices a nuestros amigos. Valentina puede prestar el auto y después se lo devuelven.",
      choices: [
        {
          id: "A",
          label: "Lámina 1. Se lo presta.",
          src: `${C}/mundo1_situacion4_opcionA.jpg`,
          alt: "Valentina entrega el auto a Tomás con una sonrisa.",
          correct: true,
        },
        {
          id: "B",
          label: "Lámina 2. Se niega.",
          src: `${C}/mundo1_situacion4_opcionB.jpg`,
          alt: "Valentina abraza el auto y le da la espalda a Tomás.",
          correct: false,
        },
        {
          id: "C",
          label: "Lámina 3. Lo esconde.",
          src: `${C}/mundo1_situacion4_opcionC.jpg`,
          alt: "Valentina esconde el auto y corre a su mochila.",
          correct: false,
        },
      ],
      closingSrc: `${C}/mundo1_situacion4_opcionA.jpg`,
      closingAlt: "Valentina presta el auto a Tomás.",
    },
    {
      id: "m1-s5",
      title: "El compañero perdido",
      mechanic: "choose",
      hint: "Haz clic en la opción correcta",
      scenes: [
        {
          src: `${S}/mundo1_situacion5_escena1.jpg`,
          alt: "Benjamín está perdido en el patio, buscando a su curso.",
        },
        {
          src: `${S}/mundo1_situacion5_escena2.jpg`,
          alt: "Ana se da cuenta de que Benjamín está perdido.",
        },
      ],
      narration:
        "Benjamín se perdió en el patio del colegio. No encuentra a su curso y está muy preocupado. Ana lo ve perdido. ¿Qué debería hacer Ana?",
      optionsDescription:
        "En la lámina 1, Ana busca a un adulto que los ayude. En la lámina 2, Ana lo mira y se va a jugar. En la lámina 3, Ana se ríe de él.",
      feedbackCorrect:
        "¡Excelente! Cuando un compañero está perdido, buscamos a un adulto que nos ayude. Ana hizo lo correcto.",
      feedbackIncorrect:
        "Pensemos. Benjamín está perdido y asustado. Lo más seguro es buscar a un adulto que los ayude. La lámina correcta es la número 1.",
      choices: [
        {
          id: "A",
          label: "Lámina 1. Busca a un adulto.",
          src: `${C}/mundo1_situacion5_opcionA.jpg`,
          alt: "Ana lleva a Benjamín de la mano hacia una educadora adulta para pedir ayuda.",
          correct: true,
        },
        {
          id: "B",
          label: "Lámina 2. Se va a jugar.",
          src: `${C}/mundo1_situacion5_opcionB.jpg`,
          alt: "Ana mira a Benjamín y vuelve a jugar con sus amigas.",
          correct: false,
        },
        {
          id: "C",
          label: "Lámina 3. Se ríe.",
          src: `${C}/mundo1_situacion5_opcionC.jpg`,
          alt: "Ana y sus amigas se ríen de Benjamín.",
          correct: false,
        },
      ],
      closingSrc: `${C}/mundo1_situacion5_opcionA.jpg`,
      closingAlt: "Ana y Benjamín piden ayuda a una adulta.",
    },
  ],
};
