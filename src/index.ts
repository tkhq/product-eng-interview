// Goal: Create an Ethereum wallet for the created sub-organization and sign a transaction! 

// Resources:
// Turnkey API Reference: https://docs.turnkey.com/api-reference/overview
// Turnkey Organization Overview: https://docs.turnkey.com/concepts/overview#organizations 
// Turnkey SDK Documentation: https://docs.turnkey.com/sdks/javascript-server

// Information:
// A Turnkey organization is a collection of users and their authentication methods,
// wallets, and policies that govern what actions users can take.
// Turnkey organizations are uniquely identified by their organization ID.

// A Turnkey *parent* organization can be used to represent an application, for example a trading application.
// A Turnkey *sub* organization can be used to represent an applications end users.

// Each user must have a authentication method which they can use to make requests to the Turnkey API.
// For this example we will be using API keys, a public/private key pair, to authenticate requests.

// A standard flow for a parent organization, or application, when a user signs up for their app
// is to create a sub-organization for that each user.

// For this example a Turnkey parent organization has already been created and an API key
// to make requests to the Turnkey API has been provided in the .env file.

// The next snippet shows how to create an API client for the parent organization using our SDK
// and then displays making a simple request.

// import the Turnkey SDK and dotenv to load environment variables
import 'dotenv/config';
import { Turnkey } from '@turnkey/sdk-server';
// import the generateP256KeyPair from the Turnkey crypto library to generate a 
// public/private key pair for the end user (will be used in a later snippet).
import { generateP256KeyPair } from '@turnkey/crypto';

// Construct a Turnkey client with the parent organization ID
// A Turnkey client is used to make requests to the Turnkey API on behalf of an organization
// Each client accepts an API key and the organization ID so that Turnkey knows which organization to make requests on behalf of.
const parentOrganizationClient = new Turnkey({
    apiPublicKey: process.env.TURNKEY_API_PUBLIC_KEY || '',
    apiPrivateKey: process.env.TURNKEY_API_PRIVATE_KEY || '',
    apiBaseUrl: process.env.TURNKEY_API_BASE_URL || 'https://api.turnkey.com',
    defaultOrganizationId: process.env.TURNKEY_PARENT_ORG_ID || '',
});

// Make a simple Who Am I request to verify the client is working and get some basic information about the organization

const whoAmIResponse = await parentOrganizationClient.apiClient().getWhoami();
console.log('WhoAmI Response:');
console.log(whoAmIResponse);
console.log();

// Try running npm run build && npm run start!

// The next snippet shows how to create a sub-organization for an end user.
// Here is the CreateSubOrganization API reference: https://docs.turnkey.com/api-reference/activities/create-sub-organization

// uncomment everything below me! (cmd/ctrl + /)
// // generate a new API key pair for the end user
// const endUserAPIKeyPair = generateP256KeyPair();

// // create the create sub-organization request
// const createSubOrganizationResponse = await parentOrganizationClient.apiClient().createSubOrganization({
//     // the name of the sub organization
//     subOrganizationName: 'End user sub-organization',
//     // the Turnkey users within the sub organization, this may be confusing that there can be multiple users,
//     // but just ignore this for now, and remember the idea that sub-organizations represent end users
//     rootUsers: [
//         {
//             // the end users username
//             userName: 'Interview end user',
//             // the end users API key
//             apiKeys: [
//                 {
//                     apiKeyName: 'Interview end user API key',
//                     publicKey: endUserAPIKeyPair.publicKey,
//                     curveType: 'API_KEY_CURVE_P256',
//                 }
//             ],
//             // ignore these!
//             authenticators: [],
//             oauthProviders: [],
//         },
//     ],
//     // ignore this for now, not needed for the interview but more information can be found here: https://docs.turnkey.com/concepts/organizations#root-quorum
//     rootQuorumThreshold: 1,
// });

// console.log('Created sub-organization ID:');
// console.log(createSubOrganizationResponse.subOrganizationId);
// console.log();

// // Try running npm run dev!
// // This will now fast reload the code and will re-run every time you save the file.

// // Your goal now is to create an Ethereum wallet for the created sub-organization and sign a transaction!
// // Be mindful of how the parent organization client was created and how the sub organization client should be created.
// // You should use the imported '@turnkey/sdk-server' library to create the requests for creating a wallet and signing a transaction.

// // Here is the CreateWallet reference: https://docs.turnkey.com/api-reference/activities/create-wallet
// // You can use the following path for creating an account within a wallet: m/44'/60'/0'/0/0

// // Here is the SignTransaction (SignRawPayload) reference: https://docs.turnkey.com/api-reference/activities/sign-raw-payload
// // Typically when signing a cryptocurrency transaction you will serialize + hash the payload then sign the resulting hash, our API takes care of that, you just need to specify the parameters!
// // For encoding you can use: "PAYLOAD_ENCODING_TEXT_UTF8"
// // For hashFunction you can use: "HASH_FUNCTION_SHA256"
