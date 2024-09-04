import {ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS} from "@solana/actions"
import {PublicKey, SystemProgram, Transaction} from "@solana/web3.js"

export async function GET(request: Request) {
  const responseBody : ActionGetResponse = {
    icon: "https://i.pinimg.com/474x/e9/5a/d9/e95ad97b2ac84f5657402bb9002bc10a.jpg",
    description: "testing blink",
    title: "Atan punya blink",
    // label: "tekan ni",
    links: {
      actions: [
        {
          label: "Vote Yes",
          href: "http://localhost:3000/api/action"
        },
        {
          label: "Vote Yes",
          href: "http://localhost:3000/api/action"
        },
        {
          label: "Custom",
          href: "http://localhost:3000/api/action",
          parameters: [
            {
              name: "custom",
              label: "Custom",
            }
          ]
        }
      ]
    },
    error: {
      message: "tak siap lagi"
    }
  }
  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS})

  return response;
}

export async function POST(request: Request){

  const requestBody: ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const tx = new Transaction();
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = SystemProgram.programId.toBase58();
  const serialTX = tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64");

  const response : ActionPostResponse = {
    transaction: serialTX,
    message: "hello " + userPubkey
  }

  return Response.json(response, {headers: ACTIONS_CORS_HEADERS})
} 

export async function OPTIONS(request: Request) {
  return new Response(null, {headers: ACTIONS_CORS_HEADERS })
}