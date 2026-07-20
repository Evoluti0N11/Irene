window.CiaoData = {
  days: [],
  locations: [],
  dailyWords: [],
  dailyTips: [],
  mahmoodSongs: [],
  recipes: []
};

const locationsData = [
  { id: "roma", name: "Roma", nameEs: "Roma", lat: 41.9028, lng: 12.4964, unlockedByDay: 1, icon: "🏛️", description: "La Ciudad Eterna, capital de Italia y cuna de la civilización romana.", funFacts: ["Roma tiene más de 2000 fuentes públicas donde puedes beber agua gratis", "El Coliseo podía albergar hasta 80.000 espectadores"], mustVisit: ["Colosseo", "Fontana di Trevi", "Pantheon", "Piazza Navona"], hiddenGems: [{ name: "Quartiere Coppedè", description: "Un barrio secreto con arquitectura de cuento de hadas" }, { name: "Giardino degli Aranci", description: "Un jardín con la mejor vista de Roma" }], relatedVocabulary: ["città", "monumento", "piazza", "fontana", "storia"] },
  { id: "trastevere", name: "Trastevere", nameEs: "Trastevere, Roma", lat: 41.8892, lng: 12.4700, unlockedByDay: 4, icon: "🍝", description: "El barrio más bohemio y auténtico de Roma.", funFacts: ["Su nombre significa 'más allá del Tíber'", "Es famoso por sus trattorias tradicionales"], mustVisit: ["Piazza Santa Maria in Trastevere", "Gianicolo", "Villa Farnesina"], hiddenGems: [{ name: "Orto Botanico", description: "Un oasis verde en el centro" }], relatedVocabulary: ["quartiere", "fiume", "trattoria", "cena", "passeggiata"] },
  { id: "trevi", name: "Fontana di Trevi", nameEs: "Fontana di Trevi", lat: 41.9009, lng: 12.4833, unlockedByDay: 7, icon: "⛲", description: "La fuente más famosa y hermosa del mundo.", funFacts: ["Se recogen unos 3000€ diarios en monedas", "El dinero se dona a Cáritas"], mustVisit: ["Fontana di Trevi", "Piazza di Spagna"], hiddenGems: [{ name: "Vicus Caprarius", description: "La ciudad del agua subterránea" }], relatedVocabulary: ["moneta", "desiderio", "acqua", "scultura", "marmo"] },
  { id: "firenze", name: "Firenze", nameEs: "Florencia", lat: 43.7696, lng: 11.2558, unlockedByDay: 8, icon: "⚜️", description: "Cuna del Renacimiento italiano.", funFacts: ["Fue la capital de Italia entre 1865 y 1871", "El síndrome de Stendhal nació aquí"], mustVisit: ["Duomo", "Uffizi", "Ponte Vecchio"], hiddenGems: [{ name: "Giardino Bardini", description: "Jardín menos conocido pero espectacular" }], relatedVocabulary: ["arte", "rinascimento", "ponte", "museo", "quadro"] },
  { id: "mercatocentrale", name: "Mercato Centrale", nameEs: "Mercado Central Florencia", lat: 43.7763, lng: 11.2533, unlockedByDay: 10, icon: "🥩", description: "El paraíso de la gastronomía toscana.", funFacts: ["El edificio es de hierro y cristal del s. XIX", "La planta baja es mercado tradicional, la alta es food court"], mustVisit: ["Puestos de Lampredotto", "Queserías"], hiddenGems: [{ name: "Scuola di Cucina", description: "Clases de cocina en el piso superior" }], relatedVocabulary: ["mercato", "formaggio", "carne", "comprare", "assaggiare"] },
  { id: "napoli", name: "Napoli", nameEs: "Nápoles", lat: 40.8518, lng: 14.2681, unlockedByDay: 12, icon: "🌋", description: "La ciudad más vibrante y auténtica del sur de Italia.", funFacts: ["Aquí se inventó la pizza Margherita", "Tiene una ciudad subterránea enorme"], mustVisit: ["Spaccanapoli", "Castel dell'Ovo", "Vesuvio"], hiddenGems: [{ name: "Cimitero delle Fontanelle", description: "Antiguo osario fascinante" }], relatedVocabulary: ["vulcano", "sud", "caos", "meraviglia", "castello"] },
  { id: "venezia", name: "Venezia", nameEs: "Venecia", lat: 45.4408, lng: 12.3155, unlockedByDay: 14, icon: "🛶", description: "La ciudad de los canales, única en el mundo.", funFacts: ["Está construida sobre 118 islas", "No hay coches, solo barcos"], mustVisit: ["Piazza San Marco", "Canal Grande", "Ponte di Rialto"], hiddenGems: [{ name: "Libreria Acqua Alta", description: "Librería que se inunda con libros en góndolas" }], relatedVocabulary: ["canale", "ponte", "barca", "isola", "maschera"] },
  { id: "milano", name: "Milano", nameEs: "Milán", lat: 45.4642, lng: 9.1900, unlockedByDay: 15, icon: "👔", description: "Capital de la moda y motor económico de Italia.", funFacts: ["El Duomo tardó casi 600 años en terminarse", "Tiene tranvías de los años 20 aún funcionando"], mustVisit: ["Duomo", "Castello Sforzesco", "Navigli"], hiddenGems: [{ name: "Villa Invernizzi", description: "Flamencos rosas en el centro de Milán" }], relatedVocabulary: ["moda", "lavoro", "aperitivo", "nebbia", "moderno"] },
  { id: "galleria", name: "Galleria Vittorio Emanuele", nameEs: "Galería Vittorio Emanuele", lat: 45.4660, lng: 9.1899, unlockedByDay: 17, icon: "🛍️", description: "El salón de Milán, una galería comercial histórica.", funFacts: ["Pisarle los testículos al toro del suelo da buena suerte", "Fue el primer edificio de Italia con luz eléctrica"], mustVisit: ["Mosaico del Toro", "Tiendas de lujo"], hiddenGems: [{ name: "Camparino", description: "Bar histórico para tomar un Campari" }], relatedVocabulary: ["vetrina", "lusso", "eleganza", "tetto", "mosaico"] },
  { id: "cinqueterre", name: "Cinque Terre", nameEs: "Cinque Terre", lat: 44.1461, lng: 9.6439, unlockedByDay: 19, icon: "🏖️", description: "Cinco pueblos coloridos colgados sobre el mar.", funFacts: ["Están conectados por un tren panorámico", "Producen un vino dulce llamado Sciacchetrà"], mustVisit: ["Manarola", "Vernazza", "Sentiero Azzurro"], hiddenGems: [{ name: "Corniglia", description: "El único pueblo que no toca el mar" }], relatedVocabulary: ["mare", "villaggio", "scogliera", "treno", "colorato"] },
  { id: "amalfi", name: "Costiera Amalfitana", nameEs: "Costa Amalfitana", lat: 40.6333, lng: 14.6029, unlockedByDay: 21, icon: "🍋", description: "Una costa escarpada de belleza inigualable.", funFacts: ["Famosa por sus limones gigantes", "La carretera es una de las más espectaculares del mundo"], mustVisit: ["Positano", "Amalfi", "Ravello"], hiddenGems: [{ name: "Fiordo di Furore", description: "Una pequeña playa escondida en un fiordo" }], relatedVocabulary: ["limone", "costiera", "curva", "panorama", "sole"] },
  { id: "sicilia", name: "Sicilia", nameEs: "Sicilia (Taormina)", lat: 37.8516, lng: 15.2853, unlockedByDay: 22, icon: "☀️", description: "La isla más grande del Mediterráneo.", funFacts: ["El Etna es el volcán activo más alto de Europa", "Tienen el postre cannolo"], mustVisit: ["Teatro Greco de Taormina", "Etna", "Valle dei Templi"], hiddenGems: [{ name: "Isola Bella", description: "Una pequeña isla unida por una franja de arena" }], relatedVocabulary: ["isola", "caldo", "spiaggia", "vulcano", "antico"] },
  { id: "sardegna", name: "Sardegna", nameEs: "Cerdeña (Costa Smeralda)", lat: 41.0846, lng: 9.5155, unlockedByDay: 25, icon: "🌊", description: "Playas de aguas turquesas que parecen el Caribe.", funFacts: ["Tiene una de las mayores esperanzas de vida del mundo", "Tienen ruinas megalíticas llamadas Nuraghi"], mustVisit: ["Costa Smeralda", "Arcipelago di La Maddalena"], hiddenGems: [{ name: "Spiaggia Rosa", description: "Una playa con arena rosa (solo se puede ver de lejos)" }], relatedVocabulary: ["sabbia", "cristallino", "vento", "pecora", "natura"] },
  { id: "como", name: "Lago di Como", nameEs: "Lago de Como", lat: 45.9880, lng: 9.2573, unlockedByDay: 27, icon: "🏞️", description: "El lago más glamuroso de Italia, a los pies de los Alpes.", funFacts: ["Tiene forma de Y invertida", "George Clooney tiene una villa aquí"], mustVisit: ["Bellagio", "Varenna", "Villa del Balbianello"], hiddenGems: [{ name: "Orrido di Bellano", description: "Una garganta natural con pasarelas" }], relatedVocabulary: ["lago", "montagna", "villa", "barca", "tranquillità"] },
  { id: "pompei", name: "Pompei", nameEs: "Pompeya", lat: 40.7462, lng: 14.4989, unlockedByDay: 29, icon: "🏛️", description: "La ciudad romana sepultada por el Vesubio.", funFacts: ["Quedó congelada en el tiempo en el año 79 d.C.", "Aún hay zonas sin excavar"], mustVisit: ["Foro", "Anfiteatro", "Villa dei Misteri"], hiddenGems: [{ name: "Lupanare", description: "El antiguo prostíbulo con frescos" }], relatedVocabulary: ["rovine", "scavi", "storia", "cenere", "antico"] },
  { id: "capri", name: "Capri", nameEs: "Capri", lat: 40.5507, lng: 14.2224, unlockedByDay: 30, icon: "🛥️", description: "La isla del lujo y la belleza eterna.", funFacts: ["Los emperadores romanos ya venían de vacaciones aquí", "Da nombre a los pantalones pirata y la ensalada caprese"], mustVisit: ["Grotta Azzurra", "Faraglioni", "Piazzetta"], hiddenGems: [{ name: "Villa Jovis", description: "Las ruinas de la villa del emperador Tiberio" }], relatedVocabulary: ["esclusivo", "grotta", "profumo", "limoncello", "barca"] }
];

const wordsData = [
  { word: "Meraviglioso", pronunciation: "me-ra-vi-LLIO-so", meaningEs: "Maravilloso", exampleIt: "Che giornata meravigliosa!", exampleEs: "¡Qué día maravilloso!", category: "adjective" },
  { word: "Sprezzatura", pronunciation: "spre-tsa-TU-ra", meaningEs: "Arte de hacer que algo difícil parezca fácil", exampleIt: "Si veste con una certa sprezzatura.", exampleEs: "Se viste con cierta naturalidad calculada.", category: "noun" },
  { word: "Passeggiata", pronunciation: "pas-se-DJIA-ta", meaningEs: "Paseo (especialmente el de la tarde)", exampleIt: "Facciamo una passeggiata in centro?", exampleEs: "¿Damos un paseo por el centro?", category: "noun" },
  { word: "Boh", pronunciation: "bo", meaningEs: "No sé / Ni idea", exampleIt: "Dov'è Marco? - Boh!", exampleEs: "¿Dónde está Marco? - ¡Ni idea!", category: "interjection" },
  { word: "Magari", pronunciation: "ma-GA-ri", meaningEs: "Ojalá / Quizás", exampleIt: "Vieni in Italia? - Magari!", exampleEs: "¿Vienes a Italia? - ¡Ojalá!", category: "adverb" },
  { word: "Allora", pronunciation: "al-LO-ra", meaningEs: "Entonces / Pues", exampleIt: "Allora, andiamo?", exampleEs: "Entonces, ¿vamos?", category: "adverb" },
  { word: "Daje", pronunciation: "DA-ye", meaningEs: "¡Vamos! (Expresión romana)", exampleIt: "Daje Roma!", exampleEs: "¡Vamos Roma!", category: "interjection" },
  { word: "Abbiocco", pronunciation: "ab-BIOK-ko", meaningEs: "Sueño después de comer", exampleIt: "Mi è venuto un abbiocco pazzesco.", exampleEs: "Me ha entrado un sueño tremendo.", category: "noun" },
  { word: "Pisolino", pronunciation: "pi-zo-LI-no", meaningEs: "Siesta", exampleIt: "Faccio un pisolino.", exampleEs: "Voy a echarme una siesta.", category: "noun" },
  { word: "Chiacchierare", pronunciation: "kiak-kie-RA-re", meaningEs: "Charlar", exampleIt: "Mi piace chiacchierare con te.", exampleEs: "Me gusta charlar contigo.", category: "verb" },
  { word: "Mozzafiato", pronunciation: "mo-tsa-FIA-to", meaningEs: "Impresionante (que quita el aliento)", exampleIt: "Una vista mozzafiato.", exampleEs: "Una vista impresionante.", category: "adjective" },
  { word: "Golosone", pronunciation: "go-lo-SO-ne", meaningEs: "Goloso", exampleIt: "Sei proprio un golosone!", exampleEs: "¡Eres un goloso!", category: "noun" },
  { word: "Dolce far niente", pronunciation: "DOL-ce far NIAN-te", meaningEs: "Lo dulce de no hacer nada", exampleIt: "Oggi mi godo il dolce far niente.", exampleEs: "Hoy disfruto del placer de no hacer nada.", category: "phrase" },
  { word: "Mica", pronunciation: "MI-ka", meaningEs: "No (para enfatizar) / Para nada", exampleIt: "Mica male!", exampleEs: "¡Nada mal!", category: "adverb" },
  { word: "Figurati", pronunciation: "fi-GU-ra-ti", meaningEs: "De nada / Faltaría más / Imagínate", exampleIt: "Grazie! - Figurati!", exampleEs: "¡Gracias! - ¡De nada!", category: "interjection" },
  { word: "Mamma mia", pronunciation: "MAM-ma MI-a", meaningEs: "¡Madre mía!", exampleIt: "Mamma mia che buono!", exampleEs: "¡Madre mía qué rico!", category: "interjection" },
  { word: "Spaghettata", pronunciation: "spa-ghet-TA-ta", meaningEs: "Comida de espaguetis con amigos", exampleIt: "Facciamo una spaghettata stasera?", exampleEs: "¿Hacemos una espaguetada esta noche?", category: "noun" },
  { word: "Pantofolaio", pronunciation: "pan-to-fo-LA-io", meaningEs: "Persona hogareña (de zapatillas)", exampleIt: "Oggi sono molto pantofolaio.", exampleEs: "Hoy estoy muy hogareño.", category: "noun" },
  { word: "Che palle!", pronunciation: "ke PAL-le", meaningEs: "¡Qué rollo! / ¡Qué pesado!", exampleIt: "Piove ancora, che palle!", exampleEs: "Llueve otra vez, ¡qué rollo!", category: "interjection" },
  { word: "In bocca al lupo", pronunciation: "in BOK-ka al LU-po", meaningEs: "Buena suerte (en la boca del lobo)", exampleIt: "In bocca al lupo per l'esame! - Crepi!", exampleEs: "¡Suerte en el examen! - ¡Que muera (el lobo)!", category: "phrase" },
  { word: "Aperitivo", pronunciation: "a-pe-ri-TI-vo", meaningEs: "Bebida y picoteo antes de cenar", exampleIt: "Ci vediamo per l'aperitivo?", exampleEs: "¿Nos vemos para el aperitivo?", category: "noun" },
  { word: "Senza parole", pronunciation: "SEN-tsa pa-RO-le", meaningEs: "Sin palabras", exampleIt: "Sono rimasto senza parole.", exampleEs: "Me he quedado sin palabras.", category: "phrase" },
  { word: "Gattara", pronunciation: "gat-TA-ra", meaningEs: "Señora de los gatos", exampleIt: "A Roma ci sono molte gattare.", exampleEs: "En Roma hay muchas señoras de los gatos.", category: "noun" },
  { word: "Passeggero", pronunciation: "pas-se-DJE-ro", meaningEs: "Pasajero", exampleIt: "Il passeggero è stanco.", exampleEs: "El pasajero está cansado.", category: "noun" },
  { word: "Tramonto", pronunciation: "tra-MON-to", meaningEs: "Atardecer", exampleIt: "Guardiamo il tramonto.", exampleEs: "Miremos el atardecer.", category: "noun" },
  { word: "Alba", pronunciation: "AL-ba", meaningEs: "Amanecer", exampleIt: "Mi sveglio all'alba.", exampleEs: "Me despierto al amanecer.", category: "noun" },
  { word: "Stupendo", pronunciation: "stu-PEN-do", meaningEs: "Estupendo", exampleIt: "Un posto stupendo.", exampleEs: "Un lugar estupendo.", category: "adjective" },
  { word: "Menefreghista", pronunciation: "me-ne-fre-GHIS-ta", meaningEs: "Persona a la que todo le da igual", exampleIt: "Non essere menefreghista.", exampleEs: "No seas pasota.", category: "noun" },
  { word: "Trattoria", pronunciation: "trat-to-RI-a", meaningEs: "Restaurante tradicional e informal", exampleIt: "Mangiamo in una trattoria tipica.", exampleEs: "Comemos en un restaurante típico.", category: "noun" },
  { word: "Capolavoro", pronunciation: "ca-po-la-VO-ro", meaningEs: "Obra maestra", exampleIt: "La scultura è un capolavoro.", exampleEs: "La escultura es una obra maestra.", category: "noun" }
];

const tipsData = [
  "🇮🇹 In italiano, tutte le parole finiscono in vocale! (casi todas las palabras terminan en vocal)",
  "🇮🇹 La 'C' seguida de 'I' o 'E' suena como 'CH' en español. Ciao se pronuncia 'Chao'.",
  "🇮🇹 La 'CH' en italiano suena como 'K' en español. Bruschetta se pronuncia 'Brus-ke-ta'.",
  "🇮🇹 'GLI' suena parecido a la 'LL' española pero más suave. Famiglia = Fami-llia.",
  "🇮🇹 'GN' suena exactamente como la 'Ñ' española. Gnocchi = Ño-ki.",
  "🇮🇹 ¡Cuidado con los dobles consonantes! 'Penne' (pasta) no es lo mismo que 'Pene'.",
  "🇮🇹 Los italianos usan mucho las manos al hablar. ¡Aprender los gestos es tan importante como el idioma!",
  "🇮🇹 En Italia, el desayuno (colazione) suele ser dulce: un cappuccino y un cornetto (croissant).",
  "🇮🇹 ¡El Cappuccino es solo para la mañana! Pedirlo después de comer es casi un delito en Italia.",
  "🇮🇹 La pasta no es un plato principal (secondo), es un primer plato (primo).",
  "🇮🇹 ¡Nunca pongas piña en la pizza! Te arriesgas a que te echen del país.",
  "🇮🇹 'Prego' tiene muchos significados: de nada, adelante, pase, ¿qué desea?, aquí tiene.",
  "🇮🇹 La ensalada se come después del plato principal, no antes, para limpiar el paladar.",
  "🇮🇹 En Italia se cena tarde, pero no tanto como en España. Normalmente entre las 20:00 y las 21:00.",
  "🇮🇹 Para brindar se dice 'Cin cin' (chin chin), mirándose a los ojos y sin cruzar las copas.",
  "🇮🇹 El agua del grifo es buena y gratis, pero en los restaurantes siempre te cobrarán el agua embotellada.",
  "🇮🇹 El 'coperto' es un pequeño cargo por sentarte en el restaurante, incluye el pan.",
  "🇮🇹 En las iglesias italianas debes entrar con los hombros cubiertos y pantalones/faldas por debajo de la rodilla.",
  "🇮🇹 La hora del 'Aperitivo' (18:30-20:30) es sagrada: pagas la bebida y comes gratis de un buffet.",
  "🇮🇹 'Scusa' es disculpa (informal), 'Scusi' es disculpe (formal).",
  "🇮🇹 El helado (gelato) artesanal no debe tener colores fosforescentes. ¡Busca colores naturales!",
  "🇮🇹 Para decir 'Te quiero' a familiares o amigos se usa 'Ti voglio bene'. 'Ti amo' es solo para parejas.",
  "🇮🇹 La 'S' entre vocales suele sonar como un zumbido (como en inglés). Casa = Ca-za.",
  "🇮🇹 La 'Z' se pronuncia 'TS' o 'DZ'. Pizza = Pit-tsa.",
  "🇮🇹 El billete de tren o autobús siempre debe validarse en las máquinas antes de subir.",
  "🇮🇹 Los domingos casi todas las tiendas están cerradas en Italia, es día de descanso y familia.",
  "🇮🇹 El pan no se pone en el plato, se deja directamente sobre el mantel.",
  "🇮🇹 'Fare la scarpetta' es limpiar la salsa del plato con un trozo de pan. ¡Delicioso y aceptado!",
  "🇮🇹 Ferragosto (15 de agosto) es la fiesta de verano por excelencia. Las ciudades se vacían.",
  "🇮🇹 La propina no es obligatoria ni esperada en Italia, aunque siempre se agradece si el servicio fue excepcional."
];

const mahmoodSongsData = [
  {
    title: "Soldi",
    year: 2019,
    theme: "Money, family relationships",
    vocabularyFromSong: [
      { italian: "soldi", spanish: "dinero", inContext: "È vero che non ho i soldi" },
      { italian: "padre", spanish: "padre", inContext: "Mio padre mi diceva" },
      { italian: "bere", spanish: "beber", inContext: "Come va? Bevi un caffè?" }
    ],
    lyrics_excerpt: "Lasci la città ma nessuno lo sa\nIeri eri qua, ora dove sei papà?\nMi chiedi come va, come va, come va\nSai già come va, come va, come va",
    youtubeLink: "https://www.youtube.com/watch?v=22lISUXgSUw",
    culturalContext: "Esta canción ganó Sanremo 2019 y representó a Italia en Eurovisión. Habla sobre la relación de Mahmood con su padre ausente y cómo el dinero afecta a la familia. Tiene influencias de la música árabe, reflejando sus raíces egipcias."
  },
  {
    title: "Brividi",
    year: 2022,
    theme: "Love, fear of commitment, feelings",
    vocabularyFromSong: [
      { italian: "brividi", spanish: "escalofríos", inContext: "E ti vorrei amare, ma ho sempre sbagliato. E mi vengono i brividi" },
      { italian: "sbagliare", spanish: "equivocarsi", inContext: "ho sempre sbagliato" },
      { italian: "scappare", spanish: "escapar", inContext: "Vuoi scappare da me" }
    ],
    lyrics_excerpt: "Nudo con i brividi\nA volte non so esprimermi\nE ti vorrei amare, ma ho sempre sbagliato\nE mi vengono i brividi",
    youtubeLink: "https://www.youtube.com/watch?v=MA_5Pt3hq0s",
    culturalContext: "Ganadora de Sanremo 2022 a dúo con Blanco. Trata sobre la vulnerabilidad y el miedo a expresar los sentimientos en una relación moderna."
  },
  {
    title: "Tuta Gold",
    year: 2024,
    theme: "Youth, growing up, modern slang",
    vocabularyFromSong: [
      { italian: "tuta", spanish: "chándal", inContext: "Con la tuta gold" },
      { italian: "ricordare", spanish: "recordar", inContext: "Non mi ricordare" },
      { italian: "ragazzo", spanish: "chico", inContext: "Ero un ragazzo" }
    ],
    lyrics_excerpt: "E non mi ricordare\nCome ero prima\nCon la tuta gold\nNella nebbia",
    youtubeLink: "https://www.youtube.com/watch?v=Vl3-JgN5oN4",
    culturalContext: "Un éxito masivo en 2024. Mahmood reflexiona sobre su pasado creciendo en los suburbios de Milán y cómo ha cambiado su vida desde entonces."
  },
  {
    title: "Barrio",
    year: 2019,
    theme: "Neighborhood, romance, urban life",
    vocabularyFromSong: [
      { italian: "quartiere", spanish: "barrio", inContext: "Nel mio quartiere" },
      { italian: "ballare", spanish: "bailar", inContext: "Vieni a ballare" },
      { italian: "luna", spanish: "luna", inContext: "Sotto questa luna" }
    ],
    lyrics_excerpt: "Nel barrio, barrio, barrio\nFacciamo finta di non conoscerci\nNel barrio, barrio, barrio\nMi cerchi e poi mi dici no",
    youtubeLink: "https://www.youtube.com/watch?v=7W-Tq8iOqO0",
    culturalContext: "Una canción con fuertes ritmos urbanos y latinos que habla de amores secretos en el barrio. El videoclip fue grabado en Marruecos."
  }
];

const recipesData = [
  {
    name: "Pasta alla Carbonara",
    nameEs: "Pasta a la Carbonara",
    origin: "Roma",
    difficulty: "Media",
    time: "25 minutos",
    ingredients: [
      { italian: "Spaghetti o Rigatoni", spanish: "Espaguetis o Rigatoni", amount: "400g" },
      { italian: "Guanciale", spanish: "Carrillada de cerdo curada", amount: "200g" },
      { italian: "Uova", spanish: "Huevos", amount: "4 yemas y 1 entero" },
      { italian: "Pecorino Romano", spanish: "Queso Pecorino Romano", amount: "100g" },
      { italian: "Pepe nero", spanish: "Pimienta negra", amount: "abundante" }
    ],
    steps: [
      { italian: "Tagliare il guanciale a listarelle e rosolarlo in padella senza olio.", spanish: "Cortar el guanciale en tiras y dorarlo en la sartén sin aceite." },
      { italian: "In una ciotola, mescolare le uova con il Pecorino e il pepe.", spanish: "En un bol, mezclar los huevos con el Pecorino y la pimienta." },
      { italian: "Cuocere la pasta in acqua salata.", spanish: "Cocinar la pasta en agua con sal." },
      { italian: "Scolare la pasta (tenendo un po' d'acqua di cottura) e metterla nella padella con il guanciale (fuoco spento!).", spanish: "Escurrir la pasta (guardando un poco de agua de cocción) y ponerla en la sartén con el guanciale (¡fuego apagado!)." },
      { italian: "Aggiungere la crema di uova e formaggio, mescolando velocemente. Aggiungere acqua di cottura se necessario.", spanish: "Añadir la crema de huevos y queso, mezclando rápidamente. Añadir agua de cocción si es necesario." }
    ],
    tip: "¡NUNCA uses nata/crema! La auténtica carbonara solo lleva huevos, guanciale y pecorino. Los italianos se ofenden mucho con la nata 😄"
  },
  {
    name: "Tiramisù",
    nameEs: "Tiramisú",
    origin: "Treviso (Véneto)",
    difficulty: "Fácil",
    time: "30 minutos + reposo",
    ingredients: [
      { italian: "Savoiardi", spanish: "Bizcochos de soletilla", amount: "300g" },
      { italian: "Mascarpone", spanish: "Queso Mascarpone", amount: "500g" },
      { italian: "Uova", spanish: "Huevos (fresquísimos)", amount: "4" },
      { italian: "Zucchero", spanish: "Azúcar", amount: "100g" },
      { italian: "Caffè espresso", spanish: "Café espresso (frío)", amount: "300ml" },
      { italian: "Cacao amaro", spanish: "Cacao amargo en polvo", amount: "al gusto" }
    ],
    steps: [
      { italian: "Preparare il caffè e lasciarlo raffreddare.", spanish: "Preparar el café y dejarlo enfriar." },
      { italian: "Separare i tuorli dagli albumi. Montare i tuorli con lo zucchero.", spanish: "Separar las yemas de las claras. Batir las yemas con el azúcar." },
      { italian: "Aggiungere il mascarpone ai tuorli.", spanish: "Añadir el mascarpone a las yemas." },
      { italian: "Montare gli albumi a neve e aggiungerli delicatamente alla crema.", spanish: "Montar las claras a punto de nieve y añadirlas delicadamente a la crema." },
      { italian: "Inzuppare velocemente i savoiardi nel caffè e creare il primo strato.", spanish: "Mojar rápidamente los bizcochos en el café y crear la primera capa." },
      { italian: "Coprire con metà della crema. Ripetere con un altro strato.", spanish: "Cubrir con la mitad de la crema. Repetir con otra capa." },
      { italian: "Lasciare in frigo per 4 ore. Spolverare con cacao prima di servire.", spanish: "Dejar en la nevera 4 horas. Espolvorear con cacao antes de servir." }
    ],
    tip: "Significa literalmente 'tira de mí hacia arriba' o 'levántame el ánimo', gracias a la energía del café y el azúcar."
  },
  {
    name: "Pizza Margherita",
    nameEs: "Pizza Margarita",
    origin: "Napoli",
    difficulty: "Difícil",
    time: "4 horas (con reposo)",
    ingredients: [
      { italian: "Farina tipo 00", spanish: "Harina de fuerza", amount: "500g" },
      { italian: "Acqua", spanish: "Agua tibia", amount: "300ml" },
      { italian: "Lievito di birra fresco", spanish: "Levadura fresca", amount: "5g" },
      { italian: "Sale", spanish: "Sal", amount: "10g" },
      { italian: "Pomodori Pelati San Marzano", spanish: "Tomates pelados", amount: "400g" },
      { italian: "Mozzarella di Bufala", spanish: "Mozzarella de Búfala", amount: "250g" },
      { italian: "Basilico fresco", spanish: "Albahaca fresca", amount: "un manojo" }
    ],
    steps: [
      { italian: "Sciogliere il lievito nell'acqua.", spanish: "Disolver la levadura en el agua." },
      { italian: "Impastare farina, acqua, lievito e alla fine il sale.", spanish: "Amasar harina, agua, levadura y al final la sal." },
      { italian: "Lasciare lievitare coperto per almeno 3 ore.", spanish: "Dejar fermentar tapado durante al menos 3 horas." },
      { italian: "Schiacciare i pomodori a mano e condirli con sale.", spanish: "Aplastarlos los tomates a mano y aliñarlos con sal." },
      { italian: "Stendere l'impasto con le mani (niente mattarello!).", spanish: "Estirar la masa con las manos (¡nada de rodillo!)." },
      { italian: "Condire con pomodoro, mozzarella e basilico. Cuocere in forno caldissimo.", spanish: "Aliñar con tomate, mozzarella y albahaca. Hornear en horno muy caliente." }
    ],
    tip: "La pizza Margherita se inventó en honor a la reina Margarita de Saboya, y sus ingredientes representan la bandera italiana (verde, blanco, rojo)."
  }
];

// Helper to generate days easily
const daysData = [];

// Helper functions to generate exercises
function mc(id, instr, opts, corr, expl, audio, xp = 10) {
  return { id, type: "multiple_choice", instruction: instr, options: opts, correctAnswer: corr, explanation: expl, audioWord: audio, xp };
}
function speak(id, instr, target, trans, hint, xp = 20) {
  return { id, type: "speaking", instruction: instr, targetPhrase: target, translationEs: trans, hint: hint, xp };
}
function write(id, instr, corr, acc, expl, xp = 15) {
  return { id, type: "writing", instruction: instr, correctAnswer: corr, acceptableAnswers: acc, explanation: expl, xp };
}
function conv(id, instr, dialogue, xp = 25) {
  return { id, type: "conversation", instruction: instr, dialogue: dialogue, xp };
}

// Generate 30 days
for (let i = 1; i <= 30; i++) {
  let theme = "foundations";
  let mapUnlock = null;
  let title = "Giorno " + i;
  let titleEs = "Día " + i;
  let desc = "Learn basic topics";
  let descEs = "Aprende temas básicos";
  let icon = "📚";
  let exercises = [];
  let vocab = [];
  let cultural = "";
  
  if (i === 1) {
    theme = "foundations"; mapUnlock = "roma"; title = "Ciao! Saluti e Presentazioni"; titleEs = "¡Hola! Saludos y Presentaciones"; icon = "👋";
    desc = "Learn basic greetings and how to introduce yourself"; descEs = "Aprende saludos básicos y cómo presentarte";
    exercises = [
      mc("d1e1", "¿Cómo se dice 'Hola' en italiano?", ["Ciao", "Hola", "Bonjour", "Hello"], "Ciao", "En italiano, 'Ciao' se usa tanto para saludar como para despedirse. ¡Es informal y muy común!", "Ciao"),
      speak("d1e2", "Pronuncia esta frase en italiano:", "Buongiorno, mi chiamo Maria", "Buenos días, me llamo María", "'Buongiorno' suena como 'buon-JIOR-no'."),
      write("d1e3", "Escribe en italiano: 'Buenas noches'", "Buona sera", ["Buona sera", "Buonasera"], "'Buona sera' se usa a partir de la tarde."),
      conv("d1e4", "Practica este diálogo. Tú eres 'Tu'.", [
        { speaker: "Italian", text: "Ciao! Come ti chiami?", translationEs: "¡Hola! ¿Cómo te llamas?" },
        { speaker: "Tu", text: "Mi chiamo Maria. E tu?", translationEs: "Me llamo Maria. ¿Y tú?" },
        { speaker: "Italian", text: "Mi chiamo Marco. Piacere!", translationEs: "Me llamo Marco. ¡Encantado!" },
        { speaker: "Tu", text: "Piacere mio!", translationEs: "¡El placer es mío!" }
      ]),
      mc("d1e5", "¿Qué saludo es formal?", ["Ciao", "Salve", "Ehi", "Uella"], "Salve", "'Salve' es una forma cortés y neutral de saludar a alguien que no conoces bien.", "Salve")
    ];
    vocab = [{ italian: "Ciao", spanish: "Hola/Adiós", pronunciation: "chao" }, { italian: "Buongiorno", spanish: "Buenos días", pronunciation: "buon-JIOR-no" }];
    cultural = "En Italia, el saludo varía según la hora: 'Buongiorno' hasta las 17h, luego 'Buona sera'. Entre amigos siempre 'Ciao'!";
  } else if (i === 4) {
    theme = "food"; mapUnlock = "trastevere"; title = "Al Ristorante"; titleEs = "En el Restaurante"; icon = "🍝";
    desc = "At the Restaurant, ordering basics"; descEs = "En el restaurante, conceptos básicos para pedir";
    exercises = [
      mc("d4e1", "¿Cómo pides la cuenta?", ["Il conto, per favore", "La cuenta", "Pago io", "Scontrino"], "Il conto, per favore", "Siempre añade 'per favore' (por favor).", "Il conto"),
      speak("d4e2", "Pide un agua:", "Un'acqua naturale, per favore", "Un agua natural (sin gas), por favor", "Recuerda que natural es sin gas."),
      write("d4e3", "Escribe: 'Para mí, una pizza'", "Per me, una pizza", ["Per me una pizza", "Per me, una pizza"], "'Per me' es la forma más común de pedir algo para uno mismo."),
      conv("d4e4", "Pidiendo comida:", [
        { speaker: "Cameriere", text: "Cosa vi porto?", translationEs: "¿Qué les traigo?" },
        { speaker: "Tu", text: "Per me, un piatto di pasta.", translationEs: "Para mí, un plato de pasta." }
      ]),
      mc("d4e5", "¿Qué significa 'Coperto' en la cuenta?", ["La propina", "El pan y el servicio de mesa", "Los impuestos", "El postre"], "El pan y el servicio de mesa", "Es un cargo fijo por sentarse a comer.", "Coperto")
    ];
    vocab = [{ italian: "Il conto", spanish: "La cuenta", pronunciation: "il con-to" }, { italian: "Per favore", spanish: "Por favor", pronunciation: "per fa-vo-re" }];
    cultural = "El 'coperto' es un pequeño coste adicional por usar la mesa y los cubiertos. Suele incluir el pan.";
  } else if (i === 6) {
    theme = "music"; mapUnlock = null; title = "La Musica: Soldi"; titleEs = "La Música: Soldi"; icon = "🎵";
    desc = "Mahmood 'Soldi' vocabulary"; descEs = "Vocabulario de la canción 'Soldi' de Mahmood";
    exercises = [
      mc("d6e1", "¿Qué significa 'Soldi'?", ["Soldados", "Dinero", "Suelo", "Solo"], "Dinero", "Soldi significa dinero.", "Soldi"),
      speak("d6e2", "Pronuncia el título:", "Soldi", "Dinero", "La S es fuerte."),
      write("d6e3", "Escribe: 'Beber un café'", "Bere un caffè", ["Bere un caffè", "bere un caffe"], "Bere es el verbo beber."),
      conv("d6e4", "Diálogo musical:", [
        { speaker: "Fan", text: "Ti piace Mahmood?", translationEs: "¿Te gusta Mahmood?" },
        { speaker: "Tu", text: "Sì, la sua musica è bellissima.", translationEs: "Sí, su música es preciosa." }
      ]),
      mc("d6e5", "¿Qué festival ganó esta canción en Italia?", ["Festivalbar", "Sanremo", "Zecchino d'Oro", "X Factor"], "Sanremo", "El Festival de Sanremo es el certamen musical más importante de Italia.", "Sanremo")
    ];
    vocab = [{ italian: "Soldi", spanish: "Dinero", pronunciation: "sol-di" }];
    cultural = "Mahmood ganó Sanremo en 2019 con 'Soldi', fusionando ritmos urbanos, pop e influencias árabes.";
  } else if (i === 7) {
    theme = "review"; mapUnlock = "trevi"; title = "Ripasso Settimana 1"; titleEs = "Repaso Semana 1"; icon = "📚";
    desc = "Review & Conversation Practice"; descEs = "Repaso y práctica de conversación";
    exercises = [
      mc("d7e1", "¿Cómo te presentas?", ["Mi chiamo", "Io sono chiamato", "Me llamo", "Nome mio è"], "Mi chiamo", "Mi chiamo significa literalmente 'me llamo'.", "Mi chiamo"),
      speak("d7e2", "Pide la cuenta", "Il conto, per favore", "La cuenta, por favor", "No olvides el por favor."),
      write("d7e3", "Escribe: 'Buenos días'", "Buongiorno", ["Buongiorno", "Buon giorno"], "Buongiorno!"),
      conv("d7e4", "Repaso de saludos:", [
        { speaker: "Marco", text: "Ciao, come stai?", translationEs: "Hola, ¿cómo estás?" },
        { speaker: "Tu", text: "Bene, grazie. E tu?", translationEs: "Bien, gracias. ¿Y tú?" }
      ]),
      mc("d7e5", "¿Cuál de estos NO es un saludo de llegada?", ["Ciao", "Buongiorno", "Buona notte", "Buonasera"], "Buona notte", "Buona notte solo se usa para ir a dormir.", "Buona notte")
    ];
    vocab = [{ italian: "Ripasso", spanish: "Repaso", pronunciation: "ri-pas-so" }];
    cultural = "Lanzar una moneda a la Fontana di Trevi asegura tu regreso a Roma.";
  } else if (i === 8) {
    theme = "travel"; mapUnlock = "firenze"; title = "In Viaggio"; titleEs = "De Viaje"; icon = "🚂";
    exercises = [
      mc("d8e1", "¿Cómo se dice Tren?", ["Treno", "Macchina", "Autobus", "Aereo"], "Treno", "Treno es tren.", "Treno"),
      speak("d8e2", "Pregunta dónde está la estación:", "Dov'è la stazione?", "¿Dónde está la estación?", "Dov'è = Dónde está."),
      write("d8e3", "Escribe 'Billete'", "Biglietto", ["Biglietto", "Il biglietto"], "GLI suena como LL."),
      conv("d8e4", "Comprando un billete:", [
        { speaker: "Addetto", text: "Dove vuole andare?", translationEs: "¿A dónde quiere ir?" },
        { speaker: "Tu", text: "Un biglietto per Firenze, per favore.", translationEs: "Un billete para Florencia, por favor." }
      ]),
      mc("d8e5", "¿Qué significa Destra y Sinistra?", ["Arriba y abajo", "Derecha e izquierda", "Delante y detrás", "Dentro y fuera"], "Derecha e izquierda", "Destra (derecha), Sinistra (izquierda).", "Destra")
    ];
    vocab = [{ italian: "Treno", spanish: "Tren", pronunciation: "tre-no" }];
    cultural = "En Italia debes validar tu billete de tren regional en las máquinas antes de subir.";
  } else if (i === 10) {
    theme = "culture"; mapUnlock = "mercatocentrale"; title = "Al Mercato"; titleEs = "En el Mercado"; icon = "🛍️";
    exercises = [
      mc("d10e1", "¿Cómo preguntas el precio?", ["Quanto costa?", "Come vale?", "Prezzo?", "Quanti soldi?"], "Quanto costa?", "Quanto costa = ¿Cuánto cuesta?", "Quanto costa"),
      speak("d10e2", "Pide medio kilo de manzanas:", "Mezzo chilo di mele", "Medio kilo de manzanas", "Chilo se pronuncia kilo."),
      write("d10e3", "Escribe 'Demasiado caro'", "Troppo caro", ["Troppo caro", "È troppo caro"], "Troppo = demasiado."),
      conv("d10e4", "En el mercado:", [
        { speaker: "Venditore", text: "Desidera?", translationEs: "¿Desea?" },
        { speaker: "Tu", text: "Vorrei due pomodori.", translationEs: "Querría dos tomates." }
      ]),
      mc("d10e5", "Un 'etto' en el mercado significa...", ["Un kilo", "Cien gramos", "Una docena", "Un litro"], "Cien gramos", "Los italianos piden los embutidos por 'etti' (plural de etto, 100g).", "Etto")
    ];
    vocab = [{ italian: "Mercato", spanish: "Mercado", pronunciation: "mer-ca-to" }];
    cultural = "En el mercado central de Florencia puedes comer un bocadillo de 'Lampredotto'.";
  } else if (i === 12) {
    theme = "food"; mapUnlock = "napoli"; title = "Cucinare la Carbonara"; titleEs = "Cocinar la Carbonara"; icon = "🍳";
    exercises = [
      mc("d12e1", "¿Qué carne lleva la verdadera carbonara?", ["Bacon", "Pancetta", "Guanciale", "Prosciutto"], "Guanciale", "El Guanciale es la carrillera del cerdo curada.", "Guanciale"),
      speak("d12e2", "Di: Sin nata", "Senza panna", "Sin nata", "Panna = Nata. ¡NUNCA en la carbonara!"),
      write("d12e3", "Escribe 'Huevo'", "Uovo", ["Uovo", "Un uovo"], "En plural es uova (femenino irregular)."),
      conv("d12e4", "Cocina:", [
        { speaker: "Chef", text: "E ora mettiamo la panna?", translationEs: "¿Y ahora ponemos la nata?" },
        { speaker: "Tu", text: "No! Solo uova e pecorino!", translationEs: "¡No! ¡Solo huevos y pecorino!" }
      ]),
      mc("d12e5", "¿Qué queso se usa?", ["Parmigiano", "Pecorino Romano", "Mozzarella", "Gorgonzola"], "Pecorino Romano", "Es un queso de oveja muy sabroso y salado.", "Pecorino")
    ];
    vocab = [{ italian: "Guanciale", spanish: "Carrillada", pronunciation: "guan-cia-le" }];
    cultural = "La pasta a la Carbonara nació en Roma, y es uno de los platos más versionados (y destrozados) del mundo.";
  } else if (i === 14) {
    theme = "review"; mapUnlock = "venezia"; title = "Ripasso Settimana 2"; titleEs = "Repaso Semana 2"; icon = "🛶";
    exercises = [
      mc("d14e1", "¿Dónde tomas el tren?", ["In aeroporto", "In stazione", "Al porto", "In piazza"], "In stazione", "Estación de tren.", "Stazione"),
      speak("d14e2", "Pregunta cuánto cuesta", "Quanto costa?", "¿Cuánto cuesta?", "Quanto costa"),
      write("d14e3", "Escribe 'Mercado'", "Mercato", ["Mercato", "Il mercato"], "Mercato"),
      conv("d14e4", "Repaso general:", [
        { speaker: "Amico", text: "Andiamo a mangiare una pizza?", translationEs: "¿Vamos a comer una pizza?" },
        { speaker: "Tu", text: "Sì, andiamo in pizzeria!", translationEs: "¡Sí, vamos a la pizzería!" }
      ]),
      mc("d14e5", "¿Qué es un 'Gondoliere'?", ["Un panadero", "El conductor de la góndola", "Un policía", "Un postre"], "El conductor de la góndola", "Los gondoleros son típicos de Venecia.", "Gondoliere")
    ];
    vocab = [{ italian: "Venezia", spanish: "Venecia", pronunciation: "ve-ne-zia" }];
    cultural = "Venecia tiene 400 puentes y ningún coche.";
  } else if (i === 15) {
    theme = "culture"; mapUnlock = "milano"; title = "Vita Quotidiana"; titleEs = "Vida Diaria"; icon = "👔";
    exercises = [
      mc("d15e1", "¿Cómo se dice 'Trabajo'?", ["Lavoro", "Studio", "Casa", "Macchina"], "Lavoro", "Lavoro es trabajo.", "Lavoro"),
      speak("d15e2", "Di qué hora es:", "Sono le otto", "Son las ocho", "Sono le... se usa para decir la hora."),
      write("d15e3", "Escribe 'Moda'", "Moda", ["Moda", "La moda"], "Milán es la capital de la moda."),
      conv("d15e4", "La rutina:", [
        { speaker: "Collega", text: "A che ora finisci di lavorare?", translationEs: "¿A qué hora terminas de trabajar?" },
        { speaker: "Tu", text: "Finisco alle sei.", translationEs: "Termino a las seis." }
      ]),
      mc("d15e5", "¿Qué tomas por la mañana?", ["Aperitivo", "Colazione", "Cena", "Pranzo"], "Colazione", "Colazione es el desayuno.", "Colazione")
    ];
    vocab = [{ italian: "Lavoro", spanish: "Trabajo", pronunciation: "la-vo-ro" }];
    cultural = "Milán es el centro financiero y de moda de Italia, la gente allí siempre camina rápido.";
  } else if (i === 17) {
    theme = "culture"; mapUnlock = "galleria"; title = "La Moda"; titleEs = "La Moda"; icon = "🛍️";
    exercises = [
      mc("d17e1", "¿Qué significa 'Vestito'?", ["Vestido/Traje", "Zapato", "Sombrero", "Camisa"], "Vestido/Traje", "Vestito es una prenda de vestir.", "Vestito"),
      speak("d17e2", "Di: Me gusta esta camisa", "Mi piace questa camicia", "Me gusta esta camisa", "Camicia es camisa."),
      write("d17e3", "Escribe 'Zapatos'", "Scarpe", ["Scarpe", "Le scarpe"], "Zapatos en italiano."),
      conv("d17e4", "De compras:", [
        { speaker: "Commessa", text: "Posso aiutarla?", translationEs: "¿Puedo ayudarla?" },
        { speaker: "Tu", text: "Sto solo guardando, grazie.", translationEs: "Solo estoy mirando, gracias." }
      ]),
      mc("d17e5", "¿Cómo se dice 'talla'?", ["Misura", "Taglia", "Numero", "Grandezza"], "Taglia", "Taglia se usa para la ropa, numero para los zapatos.", "Taglia")
    ];
    vocab = [{ italian: "Scarpe", spanish: "Zapatos", pronunciation: "scar-pe" }];
    cultural = "Los italianos tienen el concepto de 'fare bella figura' (dar una buena impresión), y vestir bien es parte de ello.";
  } else if (i === 19) {
    theme = "food"; mapUnlock = "cinqueterre"; title = "Il Tiramisù"; titleEs = "El Tiramisú"; icon = "🍰";
    exercises = [
      mc("d19e1", "¿Qué queso lleva el Tiramisú?", ["Ricotta", "Mascarpone", "Gorgonzola", "Parmigiano"], "Mascarpone", "El Mascarpone es clave para la crema.", "Mascarpone"),
      speak("d19e2", "Di: Un postre delicioso", "Un dolce delizioso", "Un postre delicioso", "Dolce es postre."),
      write("d19e3", "Escribe 'Café'", "Caffè", ["Caffè", "Caffe"], "Lleva acento en la e."),
      conv("d19e4", "En la pastelería:", [
        { speaker: "Pasticcere", text: "Cosa prende?", translationEs: "¿Qué toma?" },
        { speaker: "Tu", text: "Una fetta di tiramisù.", translationEs: "Un trozo de tiramisú." }
      ]),
      mc("d19e5", "¿Qué significa Tiramisù literalmente?", ["Postre de café", "Levántame el ánimo", "Tarta suave", "Dulce italiano"], "Levántame el ánimo", "Viene de tira-mi-sù (tira de mí hacia arriba).", "Tiramisù")
    ];
    vocab = [{ italian: "Dolce", spanish: "Postre/Dulce", pronunciation: "dol-ce" }];
    cultural = "El tiramisú es un postre relativamente moderno, inventado en los años 60 o 70 en el norte de Italia.";
  } else if (i === 21) {
    theme = "review"; mapUnlock = "amalfi"; title = "Ripasso Settimana 3"; titleEs = "Repaso Semana 3"; icon = "🍋";
    exercises = [
      mc("d21e1", "¿Cómo dices 'Termino a las seis'?", ["Finisco alle sei", "Sono le sei", "Vado a sei", "Sei ore"], "Finisco alle sei", "Finisco viene del verbo finire.", "Finisco"),
      speak("d21e2", "Di: Zapatos bonitos", "Belle scarpe", "Zapatos bonitos", "Belle scarpe"),
      write("d21e3", "Escribe 'Limón'", "Limone", ["Limone", "Il limone"], "La costa Amalfitana es famosa por ellos."),
      conv("d21e4", "Haciendo amigos:", [
        { speaker: "Nuovo Amico", text: "Ti piace l'Italia?", translationEs: "¿Te gusta Italia?" },
        { speaker: "Tu", text: "Sì, è un paese meraviglioso!", translationEs: "¡Sí, es un país maravilloso!" }
      ]),
      mc("d21e5", "¿Qué es un 'Limoncello'?", ["Un helado", "Un licor de limón", "Un caramelo", "Una playa"], "Un licor de limón", "Se toma muy frío después de cenar para digerir.", "Limoncello")
    ];
    vocab = [{ italian: "Limone", spanish: "Limón", pronunciation: "li-mo-ne" }];
    cultural = "En el sur de Italia son muy cálidos y acogedores, hacer amigos es muy fácil.";
  } else if (i === 22) {
    theme = "travel"; mapUnlock = "sicilia"; title = "In Albergo"; titleEs = "En el Hotel"; icon = "🏨";
    exercises = [
      mc("d22e1", "¿Cómo se dice Habitación?", ["Camera", "Bagno", "Letto", "Chiave"], "Camera", "Camera (o Stanza) es habitación.", "Camera"),
      speak("d22e2", "Pide la llave:", "La chiave, per favore", "La llave, por favor", "Chiave se pronuncia kia-ve."),
      write("d22e3", "Escribe 'Cama'", "Letto", ["Letto", "Il letto"], "Letto."),
      conv("d22e4", "En recepción:", [
        { speaker: "Reception", text: "Ha una prenotazione?", translationEs: "¿Tiene una reserva?" },
        { speaker: "Tu", text: "Sì, a nome di Maria.", translationEs: "Sí, a nombre de María." }
      ]),
      mc("d22e5", "¿Qué significa 'Colazione inclusa'?", ["Cena incluida", "Desayuno incluido", "Impuestos incluidos", "Piscina incluida"], "Desayuno incluido", "Colazione = Desayuno.", "Colazione")
    ];
    vocab = [{ italian: "Camera", spanish: "Habitación", pronunciation: "ca-me-ra" }];
    cultural = "Al hacer check-in en Italia, es obligatorio por ley mostrar tu pasaporte o DNI para que te registren.";
  } else if (i === 25) {
    theme = "food"; mapUnlock = "sardegna"; title = "La Vera Pizza"; titleEs = "La Verdadera Pizza"; icon = "🍕";
    exercises = [
      mc("d25e1", "¿Qué significa 'Pomodoro'?", ["Queso", "Tomate", "Albahaca", "Aceite"], "Tomate", "Pomo d'oro significa literalmente 'Manzana de oro'.", "Pomodoro"),
      speak("d25e2", "Di: Una pizza Margarita", "Una pizza Margherita", "Una pizza Margarita", "Con tomate, mozzarella y albahaca."),
      write("d25e3", "Escribe 'Albahaca'", "Basilico", ["Basilico", "Il basilico"], "El verde de la bandera italiana."),
      conv("d25e4", "En la Pizzería:", [
        { speaker: "Pizzaiolo", text: "Vuoi l'ananas sulla pizza?", translationEs: "¿Quieres piña en la pizza?" },
        { speaker: "Tu", text: "Mai! Che orrore!", translationEs: "¡Nunca! ¡Qué horror!" }
      ]),
      mc("d25e5", "¿Qué es la Mozzarella di Bufala?", ["Un queso de vaca", "Un queso de búfala", "Un tipo de tomate", "Una salsa"], "Un queso de búfala", "Es el queso tradicional de la Campania para la pizza.", "Mozzarella")
    ];
    vocab = [{ italian: "Pomodoro", spanish: "Tomate", pronunciation: "po-mo-do-ro" }];
    cultural = "La pizza napolitana original es suave y de bordes gruesos, a diferencia de la romana que es fina y crujiente.";
  } else if (i === 27) {
    theme = "music"; mapUnlock = "como"; title = "Playlist Italiana"; titleEs = "Playlist Italiana"; icon = "🎧";
    exercises = [
      mc("d27e1", "¿Qué significa 'Canzone'?", ["Cantante", "Canción", "Cantar", "Concierto"], "Canción", "Canzone es canción.", "Canzone"),
      speak("d27e2", "Di: Me encanta esta canción", "Adoro questa canzone", "Me encanta esta canción", "Adoro = me encanta."),
      write("d27e3", "Escribe 'Cantante'", "Cantante", ["Cantante", "Il cantante", "La cantante"], "Igual que en español."),
      conv("d27e4", "Hablando de música:", [
        { speaker: "Amico", text: "Ascolti musica italiana?", translationEs: "¿Escuchas música italiana?" },
        { speaker: "Tu", text: "Sì, tutto il giorno!", translationEs: "¡Sí, todo el día!" }
      ]),
      mc("d27e5", "¿Cuál de estos artistas italianos NO es cantante?", ["Laura Pausini", "Mahmood", "Tiziano Ferro", "Federico Fellini"], "Federico Fellini", "Fellini fue un famosísimo director de cine.", "Fellini")
    ];
    vocab = [{ italian: "Canzone", spanish: "Canción", pronunciation: "can-zo-ne" }];
    cultural = "La música pop italiana moderna tiene mucha influencia del rap y el trap, pero nunca pierde la melodía clásica.";
  } else if (i === 29) {
    theme = "review"; mapUnlock = "pompei"; title = "Grande Sfida"; titleEs = "Gran Reto"; icon = "🏆";
    exercises = [
      mc("d29e1", "¿Cuál es el saludo formal?", ["Ciao", "Buongiorno", "Ehi", "Uella"], "Buongiorno", "O Salve.", "Buongiorno"),
      speak("d29e2", "Di: Un billete para Roma", "Un biglietto per Roma", "Un billete para Roma", "Biglietto!"),
      write("d29e3", "Escribe 'La cuenta por favor'", "Il conto per favore", ["Il conto, per favore", "Il conto per favore"], "¡Muy útil!"),
      conv("d29e4", "Conversación final:", [
        { speaker: "Italiano", text: "Parli molto bene l'italiano!", translationEs: "¡Hablas muy bien italiano!" },
        { speaker: "Tu", text: "Grazie mille, ho studiato molto.", translationEs: "Muchas gracias, he estudiado mucho." }
      ]),
      mc("d29e5", "¿Qué NO debes poner en la carbonara?", ["Uova", "Pecorino", "Panna", "Guanciale"], "Panna", "La nata es un sacrilegio.", "Panna")
    ];
    vocab = [{ italian: "Sfida", spanish: "Reto", pronunciation: "sfi-da" }];
    cultural = "Has aprendido muchísimo sobre Italia. ¡Casi eres un italiano más!";
  } else if (i === 30) {
    theme = "review"; mapUnlock = "capri"; title = "L'Esame Finale"; titleEs = "El Examen Final"; icon = "🎓";
    exercises = [
      mc("d30e1", "¿Cómo pides una pizza Margarita para ti?", ["Per me, una Margherita", "Io voglio pizza", "Dammi pizza", "Pizza io"], "Per me, una Margherita", "Es la forma correcta y educada.", "Margherita"),
      speak("d30e2", "Di: Te quiero mucho (a un amigo)", "Ti voglio bene", "Te quiero mucho", "¡Recuerda que 'Ti amo' es solo para parejas!"),
      write("d30e3", "Escribe 'Maravilloso'", "Meraviglioso", ["Meraviglioso"], "Palabra del día 1."),
      conv("d30e4", "El diploma:", [
        { speaker: "Maestro", text: "Complimenti! Hai completato il corso!", translationEs: "¡Felicidades! ¡Has completado el curso!" },
        { speaker: "Tu", text: "Evviva! Andiamo a festeggiare!", translationEs: "¡Viva! ¡Vamos a celebrarlo!" }
      ]),
      mc("d30e5", "¿Qué vas a hacer ahora?", ["Andare in Italia", "Mangiare una pizza", "Ascoltare Mahmood", "Tutte le precedenti"], "Tutte le precedenti", "¡Todas las anteriores!", "Italia")
    ];
    vocab = [{ italian: "Complimenti", spanish: "Felicidades", pronunciation: "com-pli-men-ti" }];
    cultural = "¡Enhorabuena! Estás lista para tu viaje a Italia. Buon viaggio e divertiti un mondo!";
  } else if (i === 2) {
    theme = "foundations"; icon = "🔢";
    title = "Numeri ed Età";
    titleEs = "Números y Edades";
    desc = "Numeri da 1 a 20, età e numeri di telefono";
    descEs = "Números del 1 al 20, números de teléfono y edades";
    exercises = [
      mc("d2e1", "¿Cómo se dice el número '15'?", ["Quindici", "Sedici", "Quattordici", "Dodici"], "Quindici", "15 en italiano es quindici.", "Quindici"),
      speak("d2e2", "Di: Tengo veinte años", "Ho venti anni", "Tengo veinte años", "Ho venti anni"),
      write("d2e3", "Escribe el número '18'", "Diciotto", ["Diciotto", "diciotto"], "Recuerda la doble t."),
      conv("d2e4", "Scambio di numeri:", [
        { speaker: "Amico", text: "Qual è il tuo numero di telefono?", translationEs: "¿Cuál es tu número de teléfono?" },
        { speaker: "Tu", text: "Il mio numero è tre tre tre...", translationEs: "Mi número es tres tres tres..." }
      ]),
      mc("d2e5", "¿Qué significa 'Quanti anni hai?'?", ["¿Cómo te llamas?", "¿Cuántos años tienes?", "¿De dónde eres?", "¿Qué hora es?"], "¿Cuántos años tienes?", "Significa ¿Cuántos años tienes?.", "Anni")
    ];
    vocab = [{ italian: "Quindici", spanish: "Quince", pronunciation: "quin-di-ci" }];
    cultural = "En Italia, los números de teléfono móviles suelen empezar con 3.";
  } else if (i === 3) {
    theme = "foundations"; icon = "🎨";
    title = "Colori e Aggettivi";
    titleEs = "Colores y Adjetivos";
    desc = "Colori base e aggettivi comuni";
    descEs = "Aprende colores y adjetivos básicos para describir cosas";
    exercises = [
      mc("d3e1", "¿Qué color es 'Giallo'?", ["Amarillo", "Verde", "Rojo", "Azul"], "Amarillo", "Giallo significa amarillo.", "Giallo"),
      speak("d3e2", "Di: El cielo es azul", "Il cielo è blu", "El cielo es azul", "Il cielo è blu"),
      write("d3e3", "Escribe el color 'Rojo'", "Rosso", ["Rosso", "rosso"], "Termina en o."),
      conv("d3e4", "Descrivendo le cose:", [
        { speaker: "Amico", text: "Com'è la tua macchina nuova?", translationEs: "¿Cómo es tu coche nuevo?" },
        { speaker: "Tu", text: "È bella e rossa!", translationEs: "¡Es bonito y rojo!" }
      ]),
      mc("d3e5", "Elige el adjetivo contrario a 'Grande'", ["Piccolo", "Bello", "Brutto", "Nuovo"], "Piccolo", "Piccolo significa pequeño.", "Piccolo")
    ];
    vocab = [{ italian: "Rosso", spanish: "Rojo", pronunciation: "ros-so" }];
    cultural = "El rojo ('rosso') es el color icónico de Ferrari y del automovilismo italiano.";
  } else if (i === 5) {
    theme = "foundations"; icon = "👨‍👩‍👧";
    title = "La Famiglia";
    titleEs = "La Familia";
    desc = "Membri della famiglia e possessivi";
    descEs = "Miembros de la familia y adjetivos posesivos";
    exercises = [
      mc("d5e1", "¿Cómo se dice 'Hermano'?", ["Fratello", "Sorella", "Padre", "Zio"], "Fratello", "Fratello es hermano.", "Fratello"),
      speak("d5e2", "Di: Mi madre", "Mia madre", "Mi madre", "Mia madre"),
      write("d5e3", "Escribe 'Hermana'", "Sorella", ["Sorella", "sorella"], "Termina en a."),
      conv("d5e4", "La famiglia:", [
        { speaker: "Maria", text: "Quanti fratelli hai?", translationEs: "¿Cuántos hermanos tienes?" },
        { speaker: "Tu", text: "Ho un fratello e due sorelle.", translationEs: "Tengo un hermano y dos hermanas." }
      ]),
      mc("d5e5", "¿Qué significa 'Zio'?", ["Tío", "Primo", "Abuelo", "Sobrino"], "Tío", "Zio es tío en italiano.", "Zio")
    ];
    vocab = [{ italian: "Famiglia", spanish: "Familia", pronunciation: "fa-mi-glia" }];
    cultural = "La familia es el pilar central de la sociedad italiana tradicional.";
  } else if (i === 9) {
    theme = "food"; icon = "🍕";
    title = "Cibo e Ingredienti";
    titleEs = "Comida e Ingredientes";
    desc = "Vocabolario del cibo italiano";
    descEs = "Vocabulario de la comida italiana e ingredientes";
    exercises = [
      mc("d9e1", "¿Qué es 'Formaggio'?", ["Queso", "Carne", "Pan", "Agua"], "Queso", "Formaggio es queso.", "Formaggio"),
      speak("d9e2", "Di: Tomate", "Pomodoro", "Tomate", "Pomodoro"),
      write("d9e3", "Escribe 'Pan'", "Pane", ["Pane", "pane"], "Empieza con P."),
      conv("d9e4", "Al mercato:", [
        { speaker: "Venditore", text: "Cosa desidera?", translationEs: "¿Qué desea?" },
        { speaker: "Tu", text: "Un chilo di pomodori, per favore.", translationEs: "Un kilo de tomates, por favor." }
      ]),
      mc("d9e5", "¿Cuál de estos es una verdura?", ["Melanzana", "Prosciutto", "Pollo", "Manzo"], "Melanzana", "Melanzana es berenjena.", "Melanzana")
    ];
    vocab = [{ italian: "Pomodoro", spanish: "Tomate", pronunciation: "po-mo-do-ro" }];
    cultural = "Muchos platos italianos famosos usan muy pocos ingredientes de muy alta calidad.";
  } else if (i === 11) {
    theme = "travel"; icon = "☀️";
    title = "Il Meteo";
    titleEs = "El Clima";
    desc = "Le stagioni e il tempo";
    descEs = "Las estaciones y el clima";
    exercises = [
      mc("d11e1", "¿Cómo se dice 'Hace sol'?", ["C'è il sole", "Piove", "Fa freddo", "Nevica"], "C'è il sole", "C'è il sole significa hace sol.", "Sole"),
      speak("d11e2", "Di: Hace frío", "Fa freddo", "Hace frío", "Fa freddo"),
      write("d11e3", "Escribe 'Llueve'", "Piove", ["Piove", "piove"], "Del verbo piovere."),
      conv("d11e4", "Parlando del tempo:", [
        { speaker: "Amico", text: "Che tempo fa oggi?", translationEs: "¿Qué tiempo hace hoy?" },
        { speaker: "Tu", text: "Oggi fa molto caldo!", translationEs: "¡Hoy hace mucho calor!" }
      ]),
      mc("d11e5", "¿Qué estación es 'Inverno'?", ["Invierno", "Verano", "Otoño", "Primavera"], "Invierno", "Inverno es invierno.", "Inverno")
    ];
    vocab = [{ italian: "Estate", spanish: "Verano", pronunciation: "e-sta-te" }];
    cultural = "En agosto, muchos italianos se van de vacaciones a la playa durante el 'Ferragosto'.";
  } else if (i === 13) {
    theme = "music"; icon = "💕";
    title = "Mahmood - Brividi";
    titleEs = "Mahmood - Brividi";
    desc = "Musica ed emozioni con 'Brividi'";
    descEs = "Música y emociones con la canción 'Brividi' de Mahmood y Blanco";
    exercises = [
      mc("d13e1", "¿Qué significa 'Brividi'?", ["Escalofríos", "Lágrimas", "Sonrisas", "Abrazos"], "Escalofríos", "Brividi significa escalofríos.", "Brividi"),
      speak("d13e2", "Di: Te amo", "Ti amo", "Te amo", "Ti amo"),
      write("d13e3", "Escribe 'Escalofríos' en italiano", "Brividi", ["Brividi", "brividi"], "La palabra del título de la canción."),
      conv("d13e4", "Parlando di musica:", [
        { speaker: "Fan", text: "Questa canzone mi fa piangere.", translationEs: "Esta canción me hace llorar." },
        { speaker: "Tu", text: "Sì, mi fa venire i brividi.", translationEs: "Sí, me da escalofríos." }
      ]),
      mc("d13e5", "¿Qué significa 'Sbagliare' en la canción?", ["Equivocarse", "Cantar", "Bailar", "Dormir"], "Equivocarse", "Sbagliare es cometer un error.", "Sbagliare")
    ];
    vocab = [{ italian: "Brividi", spanish: "Escalofríos", pronunciation: "bri-vi-di" }];
    cultural = "'Brividi' ganó el Festival de Sanremo en 2022 e fue un gran éxito en Italia.";
  } else if (i === 16) {
    theme = "food"; icon = "☕";
    title = "Al Bar";
    titleEs = "En el Bar";
    desc = "Ordinare il caffè e la cultura del bar";
    descEs = "Pedir café y la cultura del bar en Italia";
    exercises = [
      mc("d16e1", "Si pides 'un caffè' en Italia, ¿qué te dan?", ["Un espresso", "Un americano", "Un cappuccino", "Un café con leche"], "Un espresso", "Por defecto, 'un caffè' es un espresso.", "Caffè"),
      speak("d16e2", "Di: Un cappuccino, por favor", "Un cappuccino, per favore", "Un capuchino, por favor", "Un cappuccino"),
      write("d16e3", "Escribe 'Croissant' en italiano", "Cornetto", ["Cornetto", "cornetto"], "También se llama brioche en el norte."),
      conv("d16e4", "Al bar:", [
        { speaker: "Barista", text: "Buongiorno, cosa le preparo?", translationEs: "Buenos días, ¿qué le preparo?" },
        { speaker: "Tu", text: "Un caffè e un cornetto, grazie.", translationEs: "Un café y un cornetto, gracias." }
      ]),
      mc("d16e5", "¿Cuándo es normal tomar Cappuccino en Italia?", ["Por la mañana", "Después de comer", "Por la noche", "Con la pizza"], "Por la mañana", "Los italianos solo toman cappuccino en el desayuno.", "Cappuccino")
    ];
    vocab = [{ italian: "Cornetto", spanish: "Croissant", pronunciation: "cor-net-to" }];
    cultural = "El café se toma rápido en la barra ('al banco'). Si te sientas ('al tavolo'), cuesta más.";
  } else if (i === 18) {
    theme = "travel"; icon = "💊";
    title = "In Farmacia";
    titleEs = "En la Farmacia";
    desc = "Salute e farmacia";
    descEs = "Salud, vocabulario médico y la farmacia";
    exercises = [
      mc("d18e1", "¿Qué significa 'Mal di testa'?", ["Dolor de cabeza", "Dolor de estómago", "Fiebre", "Tos"], "Dolor de cabeza", "Testa es cabeza.", "Testa"),
      speak("d18e2", "Di: No me siento bien", "Non mi sento bene", "No me siento bien", "Non mi sento bene"),
      write("d18e3", "Escribe 'Fiebre'", "Febbre", ["Febbre", "febbre"], "Lleva doble b."),
      conv("d18e4", "In farmacia:", [
        { speaker: "Farmacista", text: "Come posso aiutarla?", translationEs: "¿Cómo puedo ayudarle?" },
        { speaker: "Tu", text: "Ho un forte mal di gola.", translationEs: "Tengo un fuerte dolor de garganta." }
      ]),
      mc("d18e5", "¿Cómo se dice 'Tos'?", ["Tosse", "Raffreddore", "Febbre", "Cerotto"], "Tosse", "Tosse es tos en italiano.", "Tosse")
    ];
    vocab = [{ italian: "Farmacia", spanish: "Farmacia", pronunciation: "far-ma-cia" }];
    cultural = "En Italia, los farmacéuticos suelen dar muchos consejos médicos básicos.";
  } else if (i === 20) {
    theme = "music"; icon = "🔥";
    title = "Mahmood - Tuta Gold";
    titleEs = "Mahmood - Tuta Gold";
    desc = "Musica e slang con 'Tuta Gold'";
    descEs = "Música moderna y jerga con la canción 'Tuta Gold' de Mahmood";
    exercises = [
      mc("d20e1", "¿Qué significa 'Tuta' en español?", ["Chándal", "Camiseta", "Pantalón", "Zapatos"], "Chándal", "Tuta es un chándal o traje deportivo.", "Tuta"),
      speak("d20e2", "Di: Qué guay (slang)", "Che figo", "Qué guay", "Che figo"),
      write("d20e3", "Escribe 'Oro' en italiano", "Oro", ["Oro", "oro"], "Es igual que en español."),
      conv("d20e4", "Parlando della canzone:", [
        { speaker: "Amico", text: "Hai sentito la nuova canzone di Mahmood?", translationEs: "¿Has escuchado la nueva canción de Mahmood?" },
        { speaker: "Tu", text: "Sì, spacca di brutto!", translationEs: "Sí, ¡mola muchísimo!" }
      ]),
      mc("d20e5", "En jerga italiana, ¿qué significa 'Fra' o 'Frà'?", ["Hermano (bro)", "Fresa", "Frío", "Francia"], "Hermano (bro)", "Viene de fratello, usado como 'bro'.", "Fra")
    ];
    vocab = [{ italian: "Tuta", spanish: "Chándal", pronunciation: "tu-ta" }];
    cultural = "'Tuta Gold' es una canción de Mahmood presentada en el Festival de Sanremo 2024.";
  } else if (i === 23) {
    theme = "food"; icon = "🍷";
    title = "L'Aperitivo";
    titleEs = "El Aperitivo";
    desc = "La cultura dell'aperitivo italiano";
    descEs = "Vino y la cultura del aperitivo italiano";
    exercises = [
      mc("d23e1", "¿Qué es un 'Aperitivo' en Italia?", ["Bebida con comida antes de cenar", "Un postre", "Un café por la mañana", "Un tipo de pasta"], "Bebida con comida antes de cenar", "Es una tradición para abrir el apetito.", "Aperitivo"),
      speak("d23e2", "Di: Salud (al brindar)", "Cin cin", "Salud", "Cin cin"),
      write("d23e3", "Escribe 'Vino tinto'", "Vino rosso", ["Vino rosso", "vino rosso"], "Rosso es rojo."),
      conv("d23e4", "Al bar per l'aperitivo:", [
        { speaker: "Cameriere", text: "Cosa vi porto?", translationEs: "¿Qué les traigo?" },
        { speaker: "Tu", text: "Due Spritz con patatine, grazie.", translationEs: "Dos Spritz con patatas fritas, gracias." }
      ]),
      mc("d23e5", "¿Cuál de estos es un cóctel típico de aperitivo?", ["Spritz", "Limoncello", "Grappa", "Amaretto"], "Spritz", "El Spritz (Aperol o Campari) es el rey del aperitivo.", "Spritz")
    ];
    vocab = [{ italian: "Cin cin", spanish: "Salud (brindis)", pronunciation: "chin-chin" }];
    cultural = "Milán es considerada la capital del aperitivo en Italia.";
  } else if (i === 24) {
    theme = "travel"; icon = "🚨";
    title = "Emergenze";
    titleEs = "Emergencias";
    desc = "Chiedere aiuto in situazioni di emergenza";
    descEs = "Pedir ayuda en situaciones de emergencia";
    exercises = [
      mc("d24e1", "¿Cómo gritas '¡Ayuda!'?", ["Aiuto!", "Attenzione!", "Fermo!", "Scusa!"], "Aiuto!", "Aiuto es ayuda.", "Aiuto"),
      speak("d24e2", "Di: ¡Llama a la policía!", "Chiama la polizia!", "Llama a la policía", "Chiama la polizia"),
      write("d24e3", "Escribe 'Médico'", "Medico", ["Medico", "medico", "Dottore", "dottore"], "Empieza con M o D."),
      conv("d24e4", "In un'emergenza:", [
        { speaker: "Passante", text: "Cosa è successo? Serve aiuto?", translationEs: "¿Qué ha pasado? ¿Necesita ayuda?" },
        { speaker: "Tu", text: "Sì, ho perso il portafoglio.", translationEs: "Sí, he perdido la cartera." }
      ]),
      mc("d24e5", "¿Qué significa 'Attenzione'?", ["Cuidado", "Alto", "Rápido", "Lento"], "Cuidado", "Significa atención o cuidado.", "Attenzione")
    ];
    vocab = [{ italian: "Aiuto", spanish: "Ayuda", pronunciation: "a-iu-to" }];
    cultural = "El número de emergencias en Italia y en toda la UE es el 112.";
  } else if (i === 26) {
    theme = "culture"; icon = "🎬";
    title = "Il Cinema";
    titleEs = "El Cine";
    desc = "Cinema italiano ed espressioni artistiche";
    descEs = "Cine italiano y expresiones relacionadas con el arte";
    exercises = [
      mc("d26e1", "¿Cómo se dice 'Película'?", ["Film", "Cinema", "Video", "Spettacolo"], "Film", "Los italianos usan la palabra inglesa 'film'.", "Film"),
      speak("d26e2", "Di: Qué obra maestra", "Che capolavoro", "Qué obra maestra", "Che capolavoro"),
      write("d26e3", "Escribe 'Actor'", "Attore", ["Attore", "attore"], "Lleva doble t."),
      conv("d26e4", "Parlando di film:", [
        { speaker: "Amico", text: "Ti piace il cinema italiano?", translationEs: "¿Te gusta el cine italiano?" },
        { speaker: "Tu", text: "Sì, adoro La Dolce Vita di Fellini.", translationEs: "Sí, me encanta La Dolce Vita de Fellini." }
      ]),
      mc("d26e5", "¿Qué significa 'Regista'?", ["Director", "Actor", "Guionista", "Productor"], "Director", "Regista es el director de la película.", "Regista")
    ];
    vocab = [{ italian: "Capolavoro", spanish: "Obra maestra", pronunciation: "ca-po-la-vo-ro" }];
    cultural = "Fellini, Pasolini y Sorrentino son algunos de los directores italianos más famosos.";
  } else if (i === 28) {
    theme = "review"; icon = "💬";
    title = "Simulazione";
    titleEs = "Simulación";
    desc = "Simulazione completa di conversazione";
    descEs = "Repaso y simulación completa de conversación";
    exercises = [
      mc("d28e1", "¿Cuál es la respuesta correcta a 'Come stai?'?", ["Sto bene, grazie.", "Mi chiamo Marco.", "Ho venti anni.", "Sono di Roma."], "Sto bene, grazie.", "Sto bene, grazie significa Estoy bien, gracias.", "Bene"),
      speak("d28e2", "Di: Ha sido un placer", "È stato un piacere", "Ha sido un placer", "È stato un piacere"),
      write("d28e3", "Escribe 'Nos vemos pronto'", "A presto", ["A presto", "a presto", "Ci vediamo presto", "ci vediamo presto"], "Significa hasta pronto."),
      conv("d28e4", "I saluti finali:", [
        { speaker: "Amico", text: "Allora, a domani!", translationEs: "¡Entonces, hasta mañana!" },
        { speaker: "Tu", text: "Sì, ci vediamo domani. Buona serata!", translationEs: "Sí, nos vemos mañana. ¡Buenas tardes/noches!" }
      ]),
      mc("d28e5", "¿Qué significa 'In bocca al lupo'?", ["Buena suerte", "En la boca del lobo", "Tengo hambre", "Hace frío"], "Buena suerte", "Es una expresión idiomática para desear suerte.", "Lupo")
    ];
    vocab = [{ italian: "In bocca al lupo", spanish: "Buena suerte", pronunciation: "in boc-ca al lu-po" }];
    cultural = "A 'In bocca al lupo' sempre se responde 'Crepi il lupo!' (¡Que muera el lobo!).";
  }

  daysData.push({
    id: i,
    title: title,
    titleEs: titleEs,
    theme: theme,
    icon: icon,
    description: desc,
    descriptionEs: descEs,
    mapUnlock: mapUnlock,
    exercises: exercises,
    vocabulary: vocab,
    culturalNote: cultural,
    culturalNoteTitle: "💡 ¿Sabías que...?"
  });
}

window.CiaoData = {
  days: daysData,
  locations: locationsData,
  dailyWords: wordsData,
  dailyTips: tipsData,
  mahmoodSongs: mahmoodSongsData,
  recipes: recipesData
};
