import type { World } from "@/types/game";

const S = "/assets/illustrations/scenes";

export const mundo2: World = {
  id: "m2",
  name: "El Parque de los Sentimientos",
  blurb: "Decimos si una acción estuvo bien o no.",
  coverSrc: "/assets/illustrations/covers/mundo2.jpg",
  badgeName: "Detective de Emociones",
  badgeSrc: "/assets/illustrations/objects/insignia_mundo2.jpg",
  accent: "park",
  situations: [
    {
      id: "m2-s1",
      title: "El juego y el niño solo",
      mechanic: "yesno",
      hint: "Haz clic en SÍ o en NO",
      scenes: [
        {
          src: `${S}/mundo2_situacion1_escena.jpg`,
          alt: "Nico está solo y triste. Laura se acerca y le ofrece la mano para jugar.",
        },
      ],
      narration:
        "Nico estaba solito mirando a los demás jugar. Laura dejó el juego, fue donde él y lo invitó a jugar con todos. ¿Estuvo bien lo que hizo Laura?",
      optionsDescription: "¿Estuvo bien lo que hizo Laura? Levanten el pulgar arriba si creen que SÍ, o pulgar abajo si creen que NO.",
      feedbackCorrect:
        "¡Correcto! SÍ estuvo bien. Laura se dio cuenta de que Nico estaba solo y triste, entonces lo invitó a jugar.",
      feedbackIncorrect:
        "Mmm, pensemos. Nico estaba solito y Laura lo invitó a jugar. ¿Eso es bueno o malo? ¡Claro que es bueno!",
      choices: [
        { id: "yes", label: "SÍ, estuvo bien", correct: true },
        { id: "no", label: "NO, no estuvo bien", correct: false },
      ],
      closingSrc: `${S}/mundo2_situacion1_cierre.jpg`,
      closingAlt: "Todos juegan juntos, Nico incluido.",
    },
    {
      id: "m2-s2",
      title: "La niña que perdió su muñeca",
      mechanic: "yesno",
      hint: "Haz clic en SÍ o en NO",
      scenes: [
        {
          src: `${S}/mundo2_situacion2_escena.jpg`,
          alt: "Amanda llora buscando su muñeca. Javiera la mira y se va a jugar.",
        },
      ],
      narration:
        "Amanda perdió su muñeca y está llorando. Javiera la vio llorando, pero se fue a jugar al resbalín. ¿Estuvo bien lo que hizo Javiera?",
      optionsDescription: "¿Estuvo bien lo que hizo Javiera?",
      feedbackCorrect:
        "¡Muy bien! NO estuvo bien. Cuando vemos a alguien llorando, no debemos irnos. Lo correcto es quedarnos y ayudar.",
      feedbackIncorrect:
        "Pensemos. Amanda está muy triste. ¿Es bueno dejarla sola? No. Cuando alguien está triste, debemos quedarnos y ayudar.",
      choices: [
        { id: "yes", label: "SÍ, estuvo bien", correct: false },
        { id: "no", label: "NO, no estuvo bien", correct: true },
      ],
      closingSrc: `${S}/mundo2_situacion2_cierre.jpg`,
      closingAlt: "Javiera abraza a Amanda y la ayuda a buscar.",
    },
    {
      id: "m2-s3",
      title: "El niño que habla diferente",
      mechanic: "yesno",
      hint: "Haz clic en SÍ o en NO",
      scenes: [
        {
          src: `${S}/mundo2_situacion3_escena.jpg`,
          alt: "Kai se presenta con timidez. Felipe se acerca con una sonrisa y le ofrece amistad.",
        },
      ],
      narration:
        "Kai es nuevo y cuando habla, a veces se traba con las palabras. Felipe lo escuchó con paciencia, le sonrió y le ofreció ser su amigo. ¿Estuvo bien lo que hizo Felipe?",
      optionsDescription: "¿Estuvo bien lo que hizo Felipe?",
      feedbackCorrect:
        "¡Excelente! SÍ estuvo bien. Felipe fue paciente y amable con Kai aunque habla diferente. Todos somos diferentes y está bien.",
      feedbackIncorrect:
        "Mmm, veamos. Felipe fue amable con Kai. ¿Eso es malo? ¡No! Ser amable con todos es siempre lo correcto.",
      choices: [
        { id: "yes", label: "SÍ, estuvo bien", correct: true },
        { id: "no", label: "NO, no estuvo bien", correct: false },
      ],
      closingSrc: `${S}/mundo2_situacion3_cierre.jpg`,
      closingAlt: "Felipe y Kai juegan juntos.",
    },
    {
      id: "m2-s4",
      title: "El miedo al perro",
      mechanic: "yesno",
      hint: "Haz clic en SÍ o en NO",
      scenes: [
        {
          src: `${S}/mundo2_situacion4_escena.jpg`,
          alt: "Simón se tapa la cara de miedo. Joaquín se ríe y lo señala.",
        },
      ],
      narration:
        "Simón tiene miedo a los perros. Cuando pasó un perro grande, se asustó mucho. Joaquín se rió de él y le dijo que era miedoso, delante de todos. ¿Estuvo bien lo que hizo Joaquín?",
      optionsDescription: "¿Estuvo bien lo que hizo Joaquín?",
      feedbackCorrect:
        "¡Correcto! NO estuvo bien. Cuando alguien tiene miedo, no debemos reírnos. Todos tenemos miedo de cosas diferentes y está bien.",
      feedbackIncorrect:
        "Pensemos. Simón estaba muy asustado y Joaquín se rió de él. ¿Eso es bueno? No. Reírse del miedo de otros no es correcto.",
      choices: [
        { id: "yes", label: "SÍ, estuvo bien", correct: false },
        { id: "no", label: "NO, no estuvo bien", correct: true },
      ],
      closingSrc: `${S}/mundo2_situacion4_cierre.jpg`,
      closingAlt: "Joaquín acompaña a Simón hasta que se calma.",
    },
    {
      id: "m2-s5",
      title: "El columpio compartido",
      mechanic: "yesno",
      hint: "Haz clic en SÍ o en NO",
      scenes: [
        {
          src: `${S}/mundo2_situacion6_escena.jpg`,
          alt: "Catalina lleva mucho rato en el columpio. Matías espera triste a un lado.",
        },
      ],
      narration:
        "Catalina lleva mucho tiempo en el columpio. Matías le pidió si podía turnarse, pero Catalina le dijo que no. Catalina siguió columpiándose mucho rato más sin compartir. ¿Estuvo bien lo que hizo Catalina?",
      optionsDescription: "¿Estuvo bien lo que hizo Catalina?",
      feedbackCorrect:
        "¡Correcto! NO estuvo bien. Cuando jugamos con cosas que son de todos, debemos compartir y turnarnos.",
      feedbackIncorrect:
        "Pensemos. El columpio es de todos los niños del colegio. Catalina lo usó mucho tiempo y no quiso compartir. ¿Eso es justo? No.",
      choices: [
        { id: "yes", label: "SÍ, estuvo bien", correct: false },
        { id: "no", label: "NO, no estuvo bien", correct: true },
      ],
      closingSrc: `${S}/mundo2_situacion6_cierre.jpg`,
      closingAlt: "Catalina y Matías se turnan en el columpio.",
    },
  ],
};
