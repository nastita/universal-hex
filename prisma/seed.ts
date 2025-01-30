import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const assets = [
    {
      name: 'Universal ADA',
      symbol: 'uADA',
      contractAddress: '0xa3A34A0D9A08CCDDB6Ed422Ac0A28a06731335aA',
      description:
        "Universal ADA is a wrapped version of Cardano's native cryptocurrency, enabling ADA to be used on EVM chains.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://cardano.org',
        },
      },
    },
    {
      name: 'Universal ALGO',
      symbol: 'uALGO',
      contractAddress: '0x3a51f2a377EA8B55FAf3c671138A00503B031Af3',
      description:
        "Universal ALGO represents Algorand's native token on EVM chains, bringing Algorand's fast and secure blockchain capabilities cross-chain.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/4380/large/download.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://algorand.foundation',
        },
      },
    },
    {
      name: 'Universal BCH',
      symbol: 'uBCH',
      contractAddress: '0x7bE0Cc2cADCD4A8f9901B4a66244DcDd9Bd02e0F',
      description:
        "Universal BCH is a wrapped version of Bitcoin Cash, enabling BCH's peer-to-peer electronic cash system features on EVM chains.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://bitcoincash.org',
        },
      },
    },
    {
      name: 'Universal BTC',
      symbol: 'uBTC',
      contractAddress: '0xF1143f3A8D76f1Ca740d29D5671d365F66C44eD1',
      description:
        "Universal BTC brings Bitcoin's value and security to EVM chains, enabling BTC holders to participate in DeFi ecosystems.",
      iconUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://bitcoin.org',
        },
      },
    },
    {
      name: 'Universal DOGE',
      symbol: 'uDOGE',
      contractAddress: '0x12E96C2BFEA6E835CF8Dd38a5834fa61Cf723736',
      description:
        "Universal DOGE represents Dogecoin on EVM chains, bringing the popular meme cryptocurrency's community and utility cross-chain.",
      iconUrl: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://dogecoin.com',
        },
      },
    },
    {
      name: 'Universal DOT',
      symbol: 'uDOT',
      contractAddress: '0x0F813f4785b2360009F9aC9BF6121a85f109efc6',
      description:
        "Universal DOT brings Polkadot's native token to EVM chains, enabling cross-chain interoperability with the Polkadot ecosystem.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://polkadot.network',
        },
      },
    },
    {
      name: 'Universal LTC',
      symbol: 'uLTC',
      contractAddress: '0x3EB097375fc2FC361e4a472f5E7067238c547c52',
      description:
        "Universal LTC represents Litecoin on EVM chains, bringing LTC's fast and low-cost transaction capabilities cross-chain.",
      iconUrl: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://litecoin.org',
        },
      },
    },
    {
      name: 'Universal NEAR',
      symbol: 'uNEAR',
      contractAddress: '0x5ed25E305E08F58AFD7995EaC72563E6BE65A617',
      description:
        "Universal NEAR brings NEAR Protocol's native token to EVM chains, enabling cross-chain access to NEAR's scalable dApp ecosystem.",
      iconUrl: 'https://assets.coingecko.com/coins/images/10365/large/near.jpg',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://near.org',
        },
      },
    },
    {
      name: 'Universal SOL',
      symbol: 'uSOL',
      contractAddress: '0x9B8Df6E244526ab5F6e6400d331DB28C8fdDdb55',
      description:
        "Universal SOL represents Solana's native token on EVM chains, bringing SOL's high-performance capabilities cross-chain.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://solana.com',
        },
      },
    },
    {
      name: 'Universal XRP',
      symbol: 'uXRP',
      contractAddress: '0x2615a94df961278DcbC41Fb0a54fEc5f10a693aE',
      description:
        "Universal XRP brings Ripple's native token to EVM chains, enabling XRP's fast and efficient cross-border payment capabilities.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://ripple.com',
        },
      },
    },
    {
      name: 'Universal ETH',
      symbol: 'uETH',
      contractAddress: '0x1cff25B095cf6595afAbe35Dd7e5348666e57C11',
      description:
        "Universal ETH represents Ethereum's native currency on other EVM chains, enabling ETH's utility across multiple networks.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://ethereum.org',
        },
      },
    },
    {
      name: 'Universal AVAX',
      symbol: 'uAVAX',
      contractAddress: '0xd6a34b430C05ac78c24985f8abEE2616BC1788Cb',
      description:
        "Universal AVAX brings Avalanche's native token to EVM chains, enabling AVAX's fast finality and low-cost transactions cross-chain.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://avax.network',
        },
      },
    },
    {
      name: 'Universal SHIB',
      symbol: 'uSHIB',
      contractAddress: '0x239b9C1F24F3423062B0d364796e07Ee905E9FcE',
      description:
        "Universal SHIB represents SHIBA INU token on EVM chains, bringing the popular meme token's community and utility cross-chain.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://shibatoken.com',
        },
      },
    },
    {
      name: 'Universal LINK',
      symbol: 'uLINK',
      contractAddress: '0xd403D1624DAEF243FbcBd4A80d8A6F36afFe32b2',
      description:
        "Universal LINK represents Chainlink's oracle network token on EVM chains, enabling cross-chain access to LINK utility.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://chain.link',
        },
      },
    },
    {
      name: 'Universal MATIC',
      symbol: 'uMATIC',
      contractAddress: '0xE868C3d83EC287c01Bcb533A33d197d9BFa79DAD',
      description:
        "Universal MATIC brings Polygon's native token to EVM chains, extending MATIC's utility beyond the Polygon network.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://polygon.technology',
        },
      },
    },
    {
      name: 'Universal UNI',
      symbol: 'uUNI',
      contractAddress: '0xfb3CB973B2a9e2E09746393C59e7FB0d5189d290',
      description:
        "Universal UNI represents Uniswap's governance token on EVM chains, enabling cross-chain participation in Uniswap governance.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://uniswap.org',
        },
      },
    },
    {
      name: 'Universal APT',
      symbol: 'uAPT',
      contractAddress: '0x9c0e042d65a2e1fF31aC83f404E5Cb79F452c337',
      description:
        "Universal APT brings Aptos' native token to EVM chains, enabling APT holders to participate in EVM-based DeFi.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://aptoslabs.com',
        },
      },
    },
    {
      name: 'Universal STX',
      symbol: 'uSTX',
      contractAddress: '0x4b92eA5A2602Fba275150db4201A6047056F6913',
      description:
        "Universal STX represents Stacks' native token on EVM chains, bringing Bitcoin smart contract capabilities cross-chain.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/2069/large/Stacks_logo_full.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://stacks.co',
        },
      },
    },
    {
      name: 'Universal MKR',
      symbol: 'uMKR',
      contractAddress: '0x30F16E3273AB6e4584B79B76fD944E577e49a5c8',
      description:
        "Universal MKR brings Maker's governance token to EVM chains, enabling cross-chain participation in MakerDAO governance.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://makerdao.com',
        },
      },
    },
    {
      name: 'Universal RNDR',
      symbol: 'uRNDR',
      contractAddress: '0xa260BA5fd9FF3FaE55Ac4930165A9C33519dE694',
      description:
        "Universal RNDR represents Render Network's token on EVM chains, bringing distributed GPU rendering capabilities cross-chain.",
      iconUrl: 'https://assets.coingecko.com/coins/images/11636/large/rndr.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://rendernetwork.com',
        },
      },
    },
    {
      name: 'Universal SUI',
      symbol: 'uSUI',
      contractAddress: '0xb0505e5a99abd03d94a1169e638B78EDfEd26ea4',
      description:
        "Universal SUI brings Sui Network's native token to EVM chains, enabling cross-chain access to Sui's high-throughput capabilities.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/26375/large/sui_asset.jpeg',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://sui.io',
        },
      },
    },
    {
      name: 'Universal SEI',
      symbol: 'uSEI',
      contractAddress: '0x71a67215a2025F501f386A49858A9ceD2FC0249d',
      description:
        "Universal SEI brings Sei Network's native token to EVM chains, enabling cross-chain access to Sei's high-performance trading capabilities.",
      iconUrl:
        'https://assets.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png',
      links: {
        create: {
          name: 'Official Website',
          url: 'https://sei.io',
        },
      },
    },
  ];

  // Get all available chains
  const chains = await prisma.chain.findMany();

  // Create assets and connect them to all chains
  for (const asset of assets) {
    await prisma.asset.create({
      data: {
        ...asset,
        chains: {
          create: chains.map((chain) => ({
            chain: {
              connect: {
                id: chain.id,
              },
            },
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
