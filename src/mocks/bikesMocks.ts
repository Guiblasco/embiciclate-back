import { type BikeStructure } from "../bike/types";

export const bikesMocks: Array<Omit<BikeStructure, "_id">> = [
  {
    brand: "Trek",
    model: "Madone sl 6",
    material: "Carbon",
    wheelsize: 28,
    alternativeText: "una bici de carretera negra y amarilla",
    imageUrl:
      "https://media.trekbikes.com/image/upload/f_auto,fl_progressive:semi,q_auto,w_1920,h_1440,c_pad/MadoneSL6Disc_20_28714_A_Portrait",
    specs:
      "La Madone SL 6 Disc ofrece un rendimiento aerodinámico avanzado y las sensaciones de nuestra bicicleta de competición definitiva, aunque a un precio más asequible. Incorpora ruedas aerodinámicas, una rótula IsoSpeed que absorbe las irregularidades de la carretera, potentes frenos de disco hidráulico, y una estética que invita a rodar a toda velocidad.",
    mode: "Carretera",
  },
  {
    brand: "Cannondale",
    model: "Scalpel",
    material: "Carbon",
    wheelsize: 29,
    alternativeText: "una bici de doble suspensión de color negra y roja",
    imageUrl:
      "https://embed.widencdn.net/img/dorelrl/8ulv9inaab/1700px@1x/C24_C24254U_Scalpel_Crb_1_RRD_PD.webp?color=eff2f4&q=99",
    specs:
      "Diseñada para ganar carreras y senderos abrasadores, la Scalpel 1 es una de las bicicletas de montaña más rápidas, livianas y capaces del planeta. El cuadro está fabricado con nuestra avanzada y superligera construcción de carbono Serie 1. El potente grupo electrónico inalámbrico XO AXS de SRAM se encarga de los cambios. Rueda sobre veloces ruedas de carbono DT-Swiss XCR 1501 Spline y cuenta con la horquilla Fox Float Factory 34 SC de primera línea, el amortiguador Float Factory SL y la tija de sillín Factory Transfer SL.",
    mode: "XC",
  },
];
