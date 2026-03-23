import type { Product } from '../types/product';

interface SourceJersey {
  id: number;
  team: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  featured?: boolean;
}

interface SourceShoe {
  id: number;
  name: string;
  brand: string;
  price: number;
  images: [string, string];
  sizes: number[];
  exclusive?: boolean;
}

export const TEAMS = [
  'Los Angeles Lakers',
  'Chicago Bulls',
  'Golden State Warriors',
  'Boston Celtics',
  'Brooklyn Nets',
  'Miami Heat',
  'Milwaukee Bucks',
  'Phoenix Suns',
  'Dallas Mavericks',
  'Philadelphia 76ers',
];

const SOURCE_PRODUCTS: {
  jerseys: SourceJersey[];
  shoes: SourceShoe[];
} = {
  jerseys: [
    {
      id: 1,
      team: 'Los Angeles Lakers',
      name: 'Lakers LeBron James Jersey',
      price: 89999,
      image:
        'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=1000',
      sizes: ['S', 'M', 'L', 'XL'],
      featured: true,
    },
    {
      id: 2,
      team: 'Chicago Bulls',
      name: 'Bulls Classic Jordan Jersey',
      price: 85999,
      image:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=900',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 3,
      team: 'Golden State Warriors',
      name: 'Warriors Curry Jersey',
      price: 89999,
      image:
        'https://fanatics.frgimages.com/golden-state-warriors/mens-mitchell-and-ness-stephen-curry-white-golden-state-warriors-hardwood-classics-swingman-jersey_ss5_p-4380802+pv-1+u-evqegd079kzdfsma4jpp+v-qp9lxrmacc3au94svmgq.jpg?_hv=2&w=1018',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 4,
      team: 'Boston Celtics',
      name: 'Celtics Tatum Jersey',
      price: 87999,
      image:
        'https://fanatics.frgimages.com/boston-celtics/mens-mitchell-and-ness-larry-bird-kelly-green-boston-celtics-hardwood-classics-swingman-jersey_pi2751000_altimages_ff_2751337alt1_full.jpg?_hv=2&w=1018',
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 5,
      team: 'Brooklyn Nets',
      name: 'Nets City Edition Jersey',
      price: 82999,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=900',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 6,
      team: 'Miami Heat',
      name: 'Heat Vice Jersey',
      price: 88999,
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 7,
      team: 'Milwaukee Bucks',
      name: 'Bucks Giannis Jersey',
      price: 89999,
      image:
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=900',
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 8,
      team: 'Phoenix Suns',
      name: 'Suns Booker Jersey',
      price: 87999,
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=900',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 9,
      team: 'Dallas Mavericks',
      name: 'Mavericks Doncic Jersey',
      price: 89999,
      image:
        'https://fanatics.frgimages.com/dallas-mavericks/mens-mitchell-and-ness-dirk-nowitzki-navy-dallas-mavericks-2011/12-hardwood-classics-swingman-jersey_pi4437000_altimages_ff_4437740-d44e712852a67b0788c5alt1_full.jpg?_hv=2&w=1018',
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 10,
      team: 'Philadelphia 76ers',
      name: '76ers Embiid Jersey',
      price: 87999,
      image:
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900',
      sizes: ['S', 'M', 'L'],
    },
  ],
  shoes: [
    {
      id: 101,
      name: 'Nike LeBron 21',
      brand: 'Nike',
      price: 249999,
      images: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      ],
      sizes: [40, 41, 42, 43, 44],
      exclusive: true,
    },
    {
      id: 102,
      name: 'Air Jordan 38',
      brand: 'Jordan',
      price: 259999,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800',
      ],
      sizes: [39, 40, 41, 42, 43],
      exclusive: true,
    },
    {
      id: 103,
      name: 'Adidas Harden Vol. 8',
      brand: 'Adidas',
      price: 229999,
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      ],
      sizes: [40, 41, 42, 43],
      exclusive: true,
    },
    {
      id: 104,
      name: 'Nike KD 16',
      brand: 'Nike',
      price: 239999,
      images: [
        'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800',
      ],
      sizes: [39, 40, 41, 42],
      exclusive: true,
    },
    {
      id: 105,
      name: 'Puma MB.03 LaMelo Ball',
      brand: 'Puma',
      price: 219999,
      images: [
        'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800',
      ],
      sizes: [40, 41, 42, 43],
      exclusive: true,
    },
  ],
};

function formatPrice(price: number) {
  return `$${Math.round(price / 1000)}`;
}

function teamNickname(team: string) {
  return team.replace('Los Angeles ', '').replace('Golden State ', '').replace('Philadelphia ', '');
}

const jerseyProducts: Product[] = SOURCE_PRODUCTS.jerseys.map((jersey, index) => ({
  id: `jersey-${jersey.id}`,
  name: jersey.name,
  price: formatPrice(jersey.price),
  colors:
    jersey.team === 'Los Angeles Lakers'
      ? 'Gold / Purple'
      : jersey.team === 'Chicago Bulls'
        ? 'Red / Black'
        : jersey.team === 'Golden State Warriors'
          ? 'White / Royal'
          : jersey.team === 'Boston Celtics'
            ? 'Kelly Green / White'
            : jersey.team === 'Brooklyn Nets'
              ? 'Black / White'
              : jersey.team === 'Miami Heat'
                ? 'Vice Black / Pink'
                : jersey.team === 'Milwaukee Bucks'
                  ? 'Green / Cream'
                  : jersey.team === 'Phoenix Suns'
                    ? 'Sunset / Purple'
                    : jersey.team === 'Dallas Mavericks'
                      ? 'Navy / White'
                      : 'Blue / Red',
  image: jersey.image,
  secondaryImage: SOURCE_PRODUCTS.jerseys[(index + 1) % SOURCE_PRODUCTS.jerseys.length].image,
  category: 'Camisetas',
  team: jersey.team,
  description:
    jersey.team === 'Los Angeles Lakers'
      ? 'A bold Lakers swingman cut with rich gold tones, breathable mesh and a game-night finish inspired by LeBron-era energy.'
      : jersey.team === 'Chicago Bulls'
        ? 'A classic Bulls-inspired jersey with strong contrast, clean striping and a silhouette built to feel iconic on and off court.'
        : jersey.team === 'Golden State Warriors'
          ? 'A Warriors hardwood look with crisp white balance, lightweight fabric and a sharper Curry-era feel.'
          : jersey.team === 'Boston Celtics'
            ? 'A Celtics swingman edition with heritage green tones, clean trim and a lighter game-ready structure.'
            : jersey.team === 'Brooklyn Nets'
              ? 'A darker city-edition style with minimal detailing, modern balance and a cleaner Brooklyn mood.'
              : jersey.team === 'Miami Heat'
                ? 'A Heat Vice-inspired jersey with a louder color story, breathable construction and a more fashion-forward finish.'
                : jersey.team === 'Milwaukee Bucks'
                  ? 'A Bucks jersey with strong green identity, soft athletic drape and a premium hardwood-classics feel.'
                  : jersey.team === 'Phoenix Suns'
                    ? 'A Suns-inspired piece with sunset energy, lighter mesh and a strong visual pop for everyday wear.'
                    : jersey.team === 'Dallas Mavericks'
                      ? 'A Mavericks hardwood classic with deep navy tones, retro attitude and a cleaner throwback structure.'
                      : 'A 76ers-inspired swingman jersey with bright contrast, breathable mesh and a sharper game-day profile.',
  sizes: jersey.sizes,
  collection: `NBA Select - ${teamNickname(jersey.team)}`,
  material: 'Performance jersey mesh',
  featured: jersey.featured ?? false,
}));

const shoeProducts: Product[] = SOURCE_PRODUCTS.shoes.map((shoe) => ({
  id: `shoe-${shoe.id}`,
  name: shoe.name,
  price: formatPrice(shoe.price),
  colors: `${shoe.brand} performance release`,
  image: shoe.images[0],
  secondaryImage: shoe.images[1],
  category: 'Zapatillas',
  brand: shoe.brand,
  description:
    shoe.name === 'Nike LeBron 21'
      ? 'A powerful signature model with responsive cushioning, strong court feel and a build aimed at explosive downhill play.'
      : shoe.name === 'Air Jordan 38'
        ? 'A premium Jordan setup with elevated support, confident traction and a more sculpted silhouette.'
        : shoe.name === 'Adidas Harden Vol. 8'
          ? 'A low-profile Harden release built for rhythm changes, stable landings and stronger lateral control.'
          : shoe.name === 'Nike KD 16'
            ? 'A lighter KD option with smoother transitions, balanced softness and clean scoring-shoe energy.'
            : 'A LaMelo signature built with louder styling, quick rebound feel and a shape that stands out immediately.',
  sizes: shoe.sizes.map(String),
  collection: `${shoe.brand} Signature Series`,
  material: 'Performance upper + responsive cushioning',
  exclusive: shoe.exclusive ?? false,
}));

export const PRODUCTS: Product[] = [...jerseyProducts, ...shoeProducts];

export const BEST_SELLERS = PRODUCTS.filter((product) => product.featured || product.exclusive).slice(0, 4);
