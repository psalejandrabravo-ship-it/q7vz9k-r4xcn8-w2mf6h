import type { World } from "@/types/game";

const S = "/assets/illustrations/scenes";
const C = "/assets/illustrations/cards";

export const mundo4: World = {
  id: "m4",
  name: "El Reino de la Bondad",
  blurb: "Ordenamos los pasos: mirar, comprender y actuar.",
  coverSrc: "/assets/illustrations/covers/mundo4.jpg",
  badgeName: "Héroe de la Bondad",
  badgeSrc: "/assets/illustrations/objects/insignia_mundo4.jpg",
  accent: "kingdom",
  situations: [
    {
      id: "m4-s1",
      title: "Los amigos peleados",
      mechanic: "sequence",
      hint: "Arrastra cada lámina al recuadro correcto",
      scenes: [
        {
          src: `${S}/mundo4_situacion1_problema.jpg`,
          alt: "Emilia y Vicente están de espaldas, enojados, en esquinas opuestas junto a un columpio vacío.",
        },
      ],
      narration:
        "Emilia y Vicente pelearon porque ambos querían el columpio. Ahora no se hablan. ¿Qué pasos seguimos para ayudarlos?",
      optionsDescription: "Arrastra las láminas: primero escuchar, luego proponer una solución, y al final celebrar.",
      feedbackCorrect:
        "¡Perfecto! Primero escuchamos a ambos, luego buscamos una solución justa, y finalmente celebramos que volvieron a ser amigos.",
      feedbackIncorrect:
        "Pensemos en el orden. Primero: escuchar. Luego: buscar solución. Finalmente: celebrar.",
      sequenceCards: [
        { id: "B", title: "Escuchar a los dos", src: `${C}/mundo4_situacion1_tarjetaA.jpg`, alt: "Daniela escucha a Emilia y a Vicente." },
        { id: "C", title: "Proponer una solución justa", src: `${C}/mundo4_situacion1_tarjetaB.jpg`, alt: "Daniela propone turnos." },
        { id: "A", title: "Celebrar la amistad", src: `${C}/mundo4_situacion1_tarjetaC.jpg`, alt: "Emilia y Vicente se reconcilian." },
      ],
      correctOrder: ["B", "C", "A"],
      closingSrc: `${S}/mundo4_situacion1_cierre.jpg`,
      closingAlt: "Emilia y Vicente vuelven a ser amigos.",
    },
    {
      id: "m4-s2",
      title: "El niño en silla de ruedas",
      mechanic: "sequence",
      hint: "Arrastra cada lámina al recuadro correcto",
      scenes: [
        {
          src: `${S}/mundo4_situacion2_problema.jpg`,
          alt: "Andrés, en silla de ruedas, mira triste hacia un juego con escaleras.",
        },
      ],
      narration:
        "Andrés quiere jugar pero el juego es en un lugar con escaleras. No puede subir. ¿Qué pasos seguimos para incluirlo?",
      optionsDescription: "Arrastra: darse cuenta, cambiar el juego, jugar todos juntos.",
      feedbackCorrect:
        "¡Muy bien! Primero nos damos cuenta del problema, luego adaptamos el juego, y finalmente jugamos todos juntos.",
      feedbackIncorrect:
        "Pensemos. Primero: darnos cuenta. Luego: cambiar el juego. Finalmente: jugar todos juntos.",
      sequenceCards: [
        { id: "C", title: "Darse cuenta", src: `${C}/mundo4_situacion2_tarjetaA.jpg`, alt: "Max se da cuenta de que Andrés está triste." },
        { id: "A", title: "Cambiar el juego", src: `${C}/mundo4_situacion2_tarjetaB.jpg`, alt: "Max propone jugar en una zona plana." },
        { id: "B", title: "Jugar todos juntos", src: `${C}/mundo4_situacion2_tarjetaC.jpg`, alt: "Todos juegan en un lugar accesible." },
      ],
      correctOrder: ["C", "A", "B"],
      closingSrc: `${C}/mundo4_situacion2_tarjetaC.jpg`,
      closingAlt: "El grupo incluye a Andrés.",
    },
    {
      id: "m4-s3",
      title: "La mascota asustada",
      mechanic: "sequence",
      hint: "Arrastra cada lámina al recuadro correcto",
      scenes: [
        {
          src: `${S}/mundo4_situacion3_problema.jpg`,
          alt: "Copito el conejo se esconde temblando en su casita.",
        },
      ],
      narration:
        "Copito el conejo está muy asustado por los ruidos fuertes. Se escondió temblando. ¿Qué pasos seguimos para ayudarlo?",
      optionsDescription: "Arrastra: silencio, acercarse despacio, acariciar con cuidado.",
      feedbackCorrect:
        "¡Excelente! Primero hacemos silencio, luego nos acercamos despacio, y finalmente lo acariciamos con cuidado.",
      feedbackIncorrect:
        "Pensemos. Primero: silencio. Luego: acercarnos despacio. Finalmente: acariciar con cuidado.",
      sequenceCards: [
        { id: "B", title: "Hacer silencio", src: `${C}/mundo4_situacion3_tarjetaA.jpg`, alt: "Los niños hacen silencio." },
        { id: "A", title: "Acercarse despacio", src: `${C}/mundo4_situacion3_tarjetaB.jpg`, alt: "Florencia se acerca despacio a Copito." },
        { id: "C", title: "Acariciar con cuidado", src: `${C}/mundo4_situacion3_tarjetaC.jpg`, alt: "Florencia acaricia a Copito ya calmado." },
      ],
      correctOrder: ["B", "A", "C"],
      closingSrc: `${C}/mundo4_situacion3_tarjetaC.jpg`,
      closingAlt: "Copito está calmado.",
    },
    {
      id: "m4-s4",
      title: "El cumpleaños olvidado",
      mechanic: "sequence",
      hint: "Arrastra cada lámina al recuadro correcto",
      scenes: [
        {
          src: `${S}/mundo4_situacion4_problema.jpg`,
          alt: "Carla llega ilusionada con una corona y se pone triste porque nadie la espera.",
        },
      ],
      narration:
        "Hoy es el cumpleaños de Carla pero nadie se acordó. Está muy triste. ¿Qué pasos seguimos para alegrarla?",
      optionsDescription: "Arrastra: darse cuenta, preparar una sorpresa, celebrar juntos.",
      feedbackCorrect:
        "¡Perfecto! Primero nos damos cuenta del error, luego trabajamos juntos para arreglarlo, y finalmente celebramos haciendo feliz a nuestra amiga.",
      feedbackIncorrect:
        "Pensemos. Primero: darnos cuenta. Luego: preparar sorpresa. Finalmente: celebrar con ella.",
      sequenceCards: [
        { id: "C", title: "Darse cuenta del olvido", src: `${C}/mundo4_situacion4_tarjetaA.jpg`, alt: "Sebastián se da cuenta del cumpleaños." },
        { id: "B", title: "Preparar una sorpresa", src: `${C}/mundo4_situacion4_tarjetaB.jpg`, alt: "El grupo prepara dibujos y una corona." },
        { id: "A", title: "Celebrar juntos", src: `${C}/mundo4_situacion4_tarjetaC.jpg`, alt: "Todos celebran a Carla." },
      ],
      correctOrder: ["C", "B", "A"],
      closingSrc: `${C}/mundo4_situacion4_tarjetaC.jpg`,
      closingAlt: "El grupo celebra a Carla.",
    },
    {
      id: "m4-s5",
      title: "El material compartido",
      mechanic: "sequence",
      hint: "Arrastra cada lámina al recuadro correcto",
      scenes: [
        {
          src: `${S}/mundo4_situacion5_problema.jpg`,
          alt: "Isidora y Pablo alcanzan las mismas tijeras al mismo tiempo.",
        },
      ],
      narration:
        "Isidora y Pablo necesitan las mismas tijeras al mismo tiempo. Solo hay unas tijeras. ¿Qué pasos seguimos para resolver esto?",
      optionsDescription: "Arrastra: escuchar las necesidades, buscar soluciones, trabajar felices.",
      feedbackCorrect:
        "¡Muy bien! Primero escuchamos por qué cada uno las necesita, luego buscamos soluciones juntos, y finalmente ambos trabajan felices con la solución.",
      feedbackIncorrect:
        "Pensemos. Primero: escuchar a ambos. Luego: buscar soluciones. Finalmente: trabajar felices.",
      sequenceCards: [
        { id: "B", title: "Escuchar las necesidades", src: `${C}/mundo4_situacion5_tarjetaA.jpg`, alt: "La educadora escucha a Isidora y a Pablo." },
        { id: "A", title: "Buscar soluciones juntos", src: `${C}/mundo4_situacion5_tarjetaB.jpg`, alt: "Piensan en turnarse o buscar otras tijeras." },
        { id: "C", title: "Trabajar felices", src: `${C}/mundo4_situacion5_tarjetaC.jpg`, alt: "Isidora y Pablo se turnan y ambos están contentos." },
      ],
      correctOrder: ["B", "A", "C"],
      closingSrc: `${C}/mundo4_situacion5_tarjetaC.jpg`,
      closingAlt: "Isidora y Pablo se turnan con las tijeras.",
    },
  ],
};
