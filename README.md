# Verbs

**prototype!**

[Mint Idea](https://create.zora.co/collections/0xdee7061b1c265e3a4a147426b5b98c75a66c149f) to fund development

## What

Verbs is a visual, flow-based imagination environment for the Nouns ecosystem. It features a set of widgets for interacting with on-chain entities, including:

**DAO** - get quick access to both [Nouns-protocol](https://github.com/ourzora/nouns-protocol) DAO and its associated contracts (Governor, Token, Auction, Treasury & Metadata)

**Contract** - hoist _any_ EVM contract into the system

**Event** - listen for events on contracts and turn them into reactive data streams. These can work both on Nouns-like contracts, or any other contracts
e.g. `Governor::ProposalCreated`, `Auction::AuctionSettled`, `IERC721Drop::Sale`

**Action** - take action on a contract function: either triggered manually in the UI by the user, or as a result of event flows
e.g. `ZoraNFTCreatorV1::createDrop()`, `IGovernor::propose()`

**Hook** - fire arbitrary WebSocket & REST requests as the result of contract actions or event flows

**ParameterSpace** - a combinatorial design tool for crafting parameter sets of `IToken` implementations

**Markdown** - a themeable [MDX](https://mdxjs.com/) editor enhanced with React components for attaching to Proposals, or _using elsewhere_

## Example Usecases

### Proposals++:

- setup complex Proposal calldata logic flows (e.g.: create a Zora Edition, with payouts going to a new [Split](https://www.0xsplits.xyz/) between a DAO and a charity, and a)
- write your proposal with the Markdown widget and mint it using the [AssemblyPress](https://github.com/public-assembly/AssemblyPress) contract
- send the whole flow to `IGovernor::propose()`

### Bots++

- Listen for events on DAOs and trigger actions based on them (e.g. post to Telegram & Lens, or send a text message with Twilio)

## Installation

```sh
pnpm install
```

### Start Dev Server

```sh
pnpm dev
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Useful links

- App is powered by [Remix](https://remix.run/docs) and currently hosted on [Vercel](https://vercel.com/)
- [React Flow](https://reactflow.dev/) is the UI library
- [Nouns Protocol](https://github.com/ourzora/nouns-protocol) on GitHub
