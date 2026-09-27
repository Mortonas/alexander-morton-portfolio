// Reviewed presentation excerpts from a saved single-world test. No private source files are loaded by the site.
export const reginaShowcase = {
  id: 'regina',
  title: 'Regina',
  summary: 'The archived master places Regina in the Spinward Marches and describes it as bustling, strategic, and precarious. Its world-level sections provide the setting for smaller linked notes.',
  layers: [
    { heading: 'Orbital arrival', text: 'An incoming ship hears warnings about solar activity and customs patrols before reaching Regina Starport.' },
    { heading: 'Power and politics', text: 'The System Authority holds formal power, while the Merchants Guild influences trade.' },
    { heading: 'Current state', text: 'Patrols face raids, and a rumor points to possible Vargr infiltration at the starport.' },
  ],
  image: {
    src: '/images/traveller-notes/regina-master-note.webp',
    alt: 'Rendered saved Regina master-ledger excerpt showing linked people, places, politics, and current rumors',
    linkLabel: 'View the master-ledger screenshot',
  },
  disclaimer: 'Reviewed, abridged excerpts from a saved AI-assisted single-world test. Edited for readability and continuity; not verified Traveller canon, a live campaign, an untouched model response, or evidence of a completed regional batch.',
  notes: [
    {
      id: 'captain-eva-rostova',
      title: 'Captain Eva Rostova',
      kind: 'Character',
      masterExcerpt: 'Captain Eva Rostova heads patrols for the Regina System Authority and clashes with Joric Kael over contraband.',
      excerpt: [
        'Motive: maintain order and protect Regina from outside threats.',
        'Immediate need: find the source of unauthorized cargo transfers in the Regina Belt.',
        'Game-master hook: a false tip leads her patrols to detain the players, who must clear their names or escape.',
      ],
      annotation: 'Turns a name in the world note into a character with a goal, leverage, and a situation players can respond to.',
      image: {
        src: '/images/traveller-notes/captain-eva-rostova-note.webp',
        alt: 'Rendered archival character note showing Captain Eva Rostova’s motive, immediate need, connections, and plot hooks',
        linkLabel: 'View archival character-note screenshot',
      },
    },
    {
      id: 'regina-starport',
      title: 'Regina Starport',
      kind: 'Location',
      masterExcerpt: 'Regina Starport is the world note’s main hub for trade and passenger travel.',
      excerpt: [
        'Setting: a multi-level orbital hub handling trade and passenger traffic.',
        'Key figure: Captain Eva Rostova watches for undeclared cargo and weapons.',
        'Scene opportunity: maintenance tunnels offer unmonitored access to restricted cargo bays.',
      ],
      annotation: 'Expands a named place into a scene with a person to meet and a route to investigate.',
      image: {
        src: '/images/traveller-notes/regina-starport-note.webp',
        alt: 'Reviewed render of the saved Regina Starport note showing local encounters, points of interest, and opportunities',
        linkLabel: 'View archival location-note screenshot',
      },
    },
    {
      id: 'regina-system-authority',
      title: 'Regina System Authority',
      kind: 'Faction',
      masterExcerpt: 'The Regina System Authority is the official power named in the world note.',
      excerpt: [
        'Role: patrols the system, enforces customs, and provides security at Regina Starport.',
        'Weakness: stretched resources and bribery among lower ranks complicate its work.',
        'Game-master hook: a failed sensor in the Regina Belt creates an investigation for the players.',
      ],
      annotation: 'Keeps the world’s political pressure connected to concrete assets, weaknesses, and possible jobs.',
      image: {
        src: '/images/traveller-notes/regina-system-authority-note.webp',
        alt: 'Rendered saved Regina System Authority note showing operations, weaknesses, and plot hooks',
        linkLabel: 'View archival faction-note screenshot',
      },
    },
    {
      id: 'vargr-infiltration',
      title: 'Vargr Infiltration',
      kind: 'Story lead',
      masterExcerpt: 'A rumor in the world note suggests Vargr agents have entered Regina Starport posing as traders.',
      excerpt: [
        'Draft premise: Vargr agents use false identities, bribery, and sabotage to enter the Regina system.',
        'Game-master hook: a cargo inspection at Regina Starport finds hidden data-spikes that point to a possible operation.',
        'Connections: the lead involves both the starport and the Regina System Authority.',
      ],
      annotation: 'Turns a background rumor into an investigation the game master can adapt for a session.',
      image: {
        src: '/images/traveller-notes/vargr-infiltration-note.webp',
        alt: 'Rendered saved Vargr Infiltration note showing its premise and possible investigation hooks',
        linkLabel: 'View archival story-lead screenshot',
      },
    },
  ],
};
