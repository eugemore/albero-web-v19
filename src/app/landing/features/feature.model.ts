export interface Feature {
  /** Nombre de icono Material (Material Icons / Symbols) */
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: 'groups',
    title: 'Quiénes somos',
    description:
      'Nacimos para simplificar el laberinto de la ciudadanía italiana por descendencia. ' +
      'Albero ordena lo que hoy vive disperso en carpetas, mails y grupos de familia.',
  },
  {
    icon: 'account_tree',
    title: 'Armá tu árbol genealógico',
    description:
      'Cargá a cada persona, desde el antepasado italiano que emigró hasta vos. ' +
      'Albero traza la línea de sangre que tenés que demostrar.',
  },
  {
    icon: 'upload_file',
    title: 'Cargá todos tus documentos',
    description:
      'Actas de nacimiento, matrimonio y defunción, apostillas y traducciones: ' +
      'subí cada documento y asignalo a la persona que corresponde.',
  },
  {
    icon: 'fact_check',
    title: 'Gestioná tu carpeta',
    description:
      'Mirá de un vistazo qué está completo y qué falta por persona, y armá la ' +
      'carpeta final lista para el consulado o el comune.',
  },
];
