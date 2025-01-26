-- CreateTable
CREATE TABLE "chains" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets_chains" (
    "assetId" INTEGER NOT NULL,
    "chainId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assets_chains_pkey" PRIMARY KEY ("assetId","chainId")
);

-- CreateIndex
CREATE UNIQUE INDEX "chains_name_key" ON "chains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "assets_name_key" ON "assets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "assets_symbol_key" ON "assets"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "assets_contractAddress_key" ON "assets"("contractAddress");

-- AddForeignKey
ALTER TABLE "assets_chains" ADD CONSTRAINT "assets_chains_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets_chains" ADD CONSTRAINT "assets_chains_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "chains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Initial Data
INSERT INTO "chains" ("name", "updatedAt") VALUES
('Base', CURRENT_TIMESTAMP),
('Arbitrum', CURRENT_TIMESTAMP),
('Polygon', CURRENT_TIMESTAMP);

-- Insert Assets
WITH inserted_assets AS (
  INSERT INTO "assets" ("name", "symbol", "contractAddress", "updatedAt")
  VALUES
    ('Universal ADA', 'uADA', '0xa3A34A0D9A08CCDDB6Ed422Ac0A28a06731335aA', CURRENT_TIMESTAMP),
    ('Universal ALGO', 'uALGO', '0x3a51f2a377EA8B55FAf3c671138A00503B031Af3', CURRENT_TIMESTAMP),
    ('Universal BCH', 'uBCH', '0x7bE0Cc2cADCD4A8f9901B4a66244DcDd9Bd02e0F', CURRENT_TIMESTAMP),
    ('Universal BTC', 'uBTC', '0xF1143f3A8D76f1Ca740d29D5671d365F66C44eD1', CURRENT_TIMESTAMP),
    ('Universal DOGE', 'uDOGE', '0x12E96C2BFEA6E835CF8Dd38a5834fa61Cf723736', CURRENT_TIMESTAMP),
    ('Universal DOT', 'uDOT', '0x0F813f4785b2360009F9aC9BF6121a85f109efc6', CURRENT_TIMESTAMP),
    ('Universal LTC', 'uLTC', '0x3EB097375fc2FC361e4a472f5E7067238c547c52', CURRENT_TIMESTAMP),
    ('Universal NEAR', 'uNEAR', '0x5ed25E305E08F58AFD7995EaC72563E6BE65A617', CURRENT_TIMESTAMP),
    ('Universal SOL', 'uSOL', '0x9B8Df6E244526ab5F6e6400d331DB28C8fdDdb55', CURRENT_TIMESTAMP),
    ('Universal XRP', 'uXRP', '0x2615a94df961278DcbC41Fb0a54fEc5f10a693aE', CURRENT_TIMESTAMP),
    ('Universal ETH', 'uETH', '0x1cff25B095cf6595afAbe35Dd7e5348666e57C11', CURRENT_TIMESTAMP),
    ('Universal AVAX', 'uAVAX', '0xd6a34b430C05ac78c24985f8abEE2616BC1788Cb', CURRENT_TIMESTAMP),
    ('Universal SHIB', 'uSHIB', '0x239b9C1F24F3423062B0d364796e07Ee905E9FcE', CURRENT_TIMESTAMP),
    ('Universal LINK', 'uLINK', '0xd403D1624DAEF243FbcBd4A80d8A6F36afFe32b2', CURRENT_TIMESTAMP),
    ('Universal MATIC', 'uMATIC', '0xE868C3d83EC287c01Bcb533A33d197d9BFa79DAD', CURRENT_TIMESTAMP),
    ('Universal UNI', 'uUNI', '0xfb3CB973B2a9e2E09746393C59e7FB0d5189d290', CURRENT_TIMESTAMP),
    ('Universal APT', 'uAPT', '0x9c0e042d65a2e1fF31aC83f404E5Cb79F452c337', CURRENT_TIMESTAMP),
    ('Universal STX', 'uSTX', '0x4b92eA5A2602Fba275150db4201A6047056F6913', CURRENT_TIMESTAMP),
    ('Universal MKR', 'uMKR', '0x30F16E3273AB6e4584B79B76fD944E577e49a5c8', CURRENT_TIMESTAMP),
    ('Universal RNDR', 'uRNDR', '0xa260BA5fd9FF3FaE55Ac4930165A9C33519dE694', CURRENT_TIMESTAMP),
    ('Universal SUI', 'uSUI', '0xb0505e5a99abd03d94a1169e638B78EDfEd26ea4', CURRENT_TIMESTAMP),
    ('Universal SEI', 'uSEI', '0x71a67215a2025F501f386A49858A9ceD2FC0249d', CURRENT_TIMESTAMP)
  RETURNING id
)
-- Link assets to all chains
INSERT INTO "assets_chains" ("assetId", "chainId", "updatedAt")
SELECT a.id, c.id, CURRENT_TIMESTAMP
FROM inserted_assets a
CROSS JOIN "chains" c;
