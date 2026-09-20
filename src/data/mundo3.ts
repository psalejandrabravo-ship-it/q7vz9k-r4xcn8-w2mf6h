import type { World } from "@/types/game";

const S = "/assets/illustrations/scenes";
const C = "/assets/illustrations/cards";

export const mundo3: World = {
  id: "m3",
  name: "La Escuela del Compartir",
  blurb: "Reconocemos cómo se siente la otra persona.",
  coverSrc: "/assets/illustrations/covers/mundo3.jpg",
  badgeName: "Corazón Compartidor",
  badgeSrc: "/assets/illustrations/objects/insignia_mundo3.jpg",
  accent: "school",
  situations: [
    {
      id: "m3-s1",
      title: "El almuerzo olvidado",
      mechanic: "choose",
      hint: "Haz clic en la lámina que muestra cómo se siente",
      scenes: [
        {
          src: `${S}/mundo3_situacion1_escena.jpg`,
          alt: "Ignacio mira su mochila vacía mientras los demás comen.",
        },
      ],
      narration:
        "Ignacio olvidó su almuerzo en casa. Todos los demás tienen su comida, pero él no. ¿Cómo se siente Ignacio?",
      optionsDescription:
        "Miren las 4 láminas. ¿En cuál se ve cómo se siente Ignacio realmente? Levanten 1, 2, 3 o 4 dedos.",
      feedbackCorrect:
        "¡Sí! Ignacio se siente muy TRISTE porque no tiene almuerzo y todos los demás sí.",
      feedbackIncorrect:
        "Mmm, miremos bien. Ignacio no tiene comida y todos los demás sí. ¿Se siente feliz? ¿Asustado? ¿Enojado? No. Se siente TRISTE.",
      choices: [
        { id: "A", label: "Lámina 1. Feliz", src: `${C}/mundo3_situacion1_emocionA.jpg`, alt: "Ignacio feliz comiendo.", correct: false },
        { id: "B", label: "Lámina 2. Triste", src: `${C}/mundo3_situacion1_emocionB.jpg`, alt: "Ignacio triste frente a su mochila vacía.", correct: true },
        { id: "C", label: "Lámina 3. Asustado", src: `${C}/mundo3_situacion1_emocionC.jpg`, alt: "Ignacio asustado debajo de la mesa.", correct: false },
        { id: "D", label: "Lámina 4. Enojado", src: `${C}/mundo3_situacion1_emocionD.jpg`, alt: "Ignacio enojado pateando su mochila.", correct: false },
      ],
    },
    {
      id: "m3-s2",
      title: "El dibujo que no sale",
      mechanic: "choose",
      hint: "Haz clic en la lámina que muestra cómo se siente",
      scenes: [
        {
          src: `${S}/mundo3_situacion2_escena.jpg`,
          alt: "Antonia arruga papeles, tensa y enojada porque su dibujo no le sale.",
        },
      ],
      narration:
        "Antonia está tratando de dibujar una casa, pero no le sale como ella quiere. Lo intenta muchas veces pero no puede. ¿Cómo se siente Antonia?",
      optionsDescription: "Miren las 4 láminas. ¿Cómo se siente Antonia?",
      feedbackCorrect:
        "¡Correcto! Antonia se siente ENOJADA y frustrada porque su dibujo no le sale como quiere.",
      feedbackIncorrect:
        "Miremos bien su carita y su cuerpo. Su dibujo no le sale. ¿Está feliz? ¿Triste? ¿Asustada? No. Está ENOJADA y frustrada.",
      choices: [
        { id: "A", label: "Lámina 1. Feliz", src: `${C}/mundo3_situacion2_emocionA.jpg`, alt: "Antonia feliz con su dibujo.", correct: false },
        { id: "B", label: "Lámina 2. Triste", src: `${C}/mundo3_situacion2_emocionB.jpg`, alt: "Antonia triste llorando.", correct: false },
        { id: "C", label: "Lámina 3. Asustada", src: `${C}/mundo3_situacion2_emocionC.jpg`, alt: "Antonia asustada.", correct: false },
        { id: "D", label: "Lámina 4. Enojada", src: `${C}/mundo3_situacion2_emocionD.jpg`, alt: "Antonia enojada y frustrada arrugando el papel.", correct: true },
      ],
    },
    {
      id: "m3-s3",
      title: "El ruido fuerte",
      mechanic: "choose",
      hint: "Haz clic en la lámina que muestra cómo se siente",
      scenes: [
        {
          src: `${S}/mundo3_situacion3_escena.jpg`,
          alt: "Renato se agacha y se tapa los oídos, temblando, porque sonó una alarma.",
        },
      ],
      narration:
        "Sonó una alarma muy fuerte. Renato se tapó los oídos y se agachó. Está temblando. ¿Cómo se siente Renato?",
      optionsDescription: "Miren las 4 láminas. ¿Cómo se siente Renato?",
      feedbackCorrect:
        "¡Muy bien! Renato se siente ASUSTADO por el ruido fuerte. Algunos niños son más sensibles a los sonidos.",
      feedbackIncorrect:
        "Miremos su cuerpo. Se tapa los oídos, se agacha, tiembla. ¿Está feliz? ¿Triste? ¿Enojado? No. Está ASUSTADO.",
      choices: [
        { id: "A", label: "Lámina 1. Feliz", src: `${C}/mundo3_situacion3_emocionA.jpg`, alt: "Renato feliz bailando.", correct: false },
        { id: "B", label: "Lámina 2. Triste", src: `${C}/mundo3_situacion3_emocionB.jpg`, alt: "Renato triste llorando.", correct: false },
        { id: "C", label: "Lámina 3. Asustado", src: `${C}/mundo3_situacion3_emocionC.jpg`, alt: "Renato asustado tapándose los oídos.", correct: true },
        { id: "D", label: "Lámina 4. Enojado", src: `${C}/mundo3_situacion3_emocionD.jpg`, alt: "Renato enojado gritando.", correct: false },
      ],
    },
    {
      id: "m3-s4",
      title: "El juguete roto",
      mechanic: "choose",
      hint: "Haz clic en la lámina que muestra cómo se siente",
      scenes: [
        {
          src: `${S}/mundo3_situacion4_escena.jpg`,
          alt: "Elías llora sosteniendo las piezas de su autito roto.",
        },
      ],
      narration:
        "Bruno tropezó sin querer y pisó el autito favorito de Elías. El auto se rompió. ¿Cómo se siente Elías?",
      optionsDescription: "Miren las 4 láminas. Elías puede sentirse triste o enojado.",
      feedbackCorrect:
        "¡Sí! Elías se siente muy TRISTE o ENOJADO porque su juguete favorito se rompió. Es normal sentirse así cuando algo importante se daña.",
      feedbackIncorrect:
        "Miremos. Su juguete favorito se rompió. ¿Está feliz? ¿Asustado? No. Está TRISTE y también un poco ENOJADO.",
      choices: [
        { id: "A", label: "Lámina 1. Feliz", src: `${C}/mundo3_situacion4_emocionA.jpg`, alt: "Elías feliz con un auto.", correct: false },
        { id: "B", label: "Lámina 2. Triste", src: `${C}/mundo3_situacion4_emocionB.jpg`, alt: "Elías muy triste con las piezas rotas.", correct: true },
        { id: "C", label: "Lámina 3. Asustado", src: `${C}/mundo3_situacion4_emocionC.jpg`, alt: "Elías asustado alejándose.", correct: false },
        { id: "D", label: "Lámina 4. Enojado", src: `${C}/mundo3_situacion4_emocionD.jpg`, alt: "Elías enojado con las piezas del auto.", correct: true },
      ],
    },
    {
      id: "m3-s5",
      title: "El niño excluido del juego",
      mechanic: "choose",
      hint: "Haz clic en la lámina que muestra cómo se siente",
      scenes: [
        {
          src: `${S}/mundo3_situacion5_escena.jpg`,
          alt: "Un grupo cierra el círculo de juego y le dicen a Cristóbal que no puede jugar.",
        },
      ],
      narration:
        "Cristóbal quiere jugar con el grupo, pero le dicen que no puede porque ya son muchos. ¿Cómo se siente Cristóbal?",
      optionsDescription: "Miren las 4 láminas. ¿Cómo se siente Cristóbal?",
      feedbackCorrect:
        "¡Muy bien! Cristóbal se siente muy TRISTE porque lo excluyeron del juego. Quería jugar con sus amigos.",
      feedbackIncorrect:
        "Miremos bien. Le dijeron que no puede jugar. ¿Está feliz? ¿Asustado? ¿Enojado? No. Está TRISTE porque quería jugar con ellos.",
      choices: [
        { id: "A", label: "Lámina 1. Feliz", src: `${C}/mundo3_situacion5_emocionA.jpg`, alt: "Cristóbal feliz jugando solo.", correct: false },
        { id: "B", label: "Lámina 2. Triste", src: `${C}/mundo3_situacion5_emocionB.jpg`, alt: "Cristóbal triste mirando al grupo desde una banca.", correct: true },
        { id: "C", label: "Lámina 3. Asustado", src: `${C}/mundo3_situacion5_emocionC.jpg`, alt: "Cristóbal asustado corriendo lejos.", correct: false },
        { id: "D", label: "Lámina 4. Enojado", src: `${C}/mundo3_situacion5_emocionD.jpg`, alt: "Cristóbal enojado pateando.", correct: false },
      ],
    },
  ],
};
