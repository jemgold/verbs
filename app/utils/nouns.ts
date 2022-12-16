import {
  IToken__factory,
  IGovernor__factory,
  // ITreasury__factory,
  IAuction__factory,
  // IPropertyIPFSMetadataRenderer__factory,
} from "@zoralabs/nouns-protocol/dist/typechain";

export const interfaces = {
  Token: IToken__factory.createInterface(),
  Governor: IGovernor__factory.createInterface(),
  // Treasury: ITreasury__factory.createInterface(),
  Auction: IAuction__factory.createInterface(),
  // Metadata: IPropertyIPFSMetadataRenderer__factory.createInterface(),
};

export type Contract = keyof typeof interfaces;
