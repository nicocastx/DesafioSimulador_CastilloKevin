let frasesInteresantes = ["Cáete siete veces, levántate ocho",
"La fantasía nunca arrastra a la locura; lo que arrastra a la locura es precisamente la razón. Los poetas no se vuelven locos, pero sí los jugadores de ajedrez",
"Las palabras están llenas de falsedad o de arte; la mirada es el lenguaje del corazón",
" Las palabras cera, las obras acero",
"El hombre que más ha vivido no es aquel que más años ha cumplido, sino aquel que más ha experimentado la vida"
];

let frasesMotivacion = ["No te dejes vencer, sigue intentándolo",
"Cuéntamelo y me olvidaré. enséñamelo y lo recordaré. involúcrame y lo aprenderé ",
"Un sueño no se hace realidad por arte de magia, necesita sudor, determinación y trabajo duro ",
"Escoge un trabajo que te guste, y nunca tendrás que trabajar ni un solo día de tu vida",
"Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades de que salga bien no te acompañan"
];

let inspire = document.getElementById("inspire");
let motive = document.getElementById("motive");
let text = document.getElementById("text");

inspire.addEventListener("click", () =>{
    let random = Math.floor(Math.random() * frasesInteresantes.length);
    frasesInteresantes[random];
    text.innerHTML = `" ${frasesInteresantes[random]} "`;
});

motive.addEventListener("click", () =>{
    let random = Math.floor(Math.random() * frasesMotivacion.length);
    frasesInteresantes[random];
    text.innerHTML = `" ${frasesMotivacion[random]} "`;
});




