# Settla

Allows users to schedule payment requests for a given invoice.

## Install

```bash
pnpm i
```

## Run

```bash
# development
pnpm start

# watch mode
pnpm start:dev

# production mode
pnpm start:prod
```

The Swagger UI should be available at http://localhost:3000/api

## Test

```bash
# unit tests
pnpm test

# e2e tests
pnpm test:e2e

# test coverage
pnpm test:cov
```

## Data Storage Structure

The data folder has the following structure:

```
data/
```

## Example request

To extract data from an invoice. 

### Request parameters

- URL: **`http://83.228.197.248:3000/ask`**
- model: **`mistral`**
- context: **`invoice`**
- message: **`<INVOICE_RAW_TEXT_HERE>`**

### Curl 

```bash 
curl -X 'POST' \
  'http://83.228.197.248:3000/ask' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'message=Devis #25051510 15 mai 2025 Tarif Description Prix Quantité TVA * Total Forfait 1 demi-journée 400 EUR 2 0 800 EUR TOTAL : 800 EUR * TVA non-applicable (article 293B du Code Général des Impôts) MONTPELLIER - FRANCE' \
  -F 'model=mistral' \
  -F 'sessionId=' \
  -F 'walletAddress=' \
  -F 'context=invoice' \
  -F 'data=' \
  -F 'file='
```

### Response body 

```json 
{
  "output": "```json\n{\n    \"invoice_number\": \"25051510\",\n    \"issuance_date\": \"2025-05-15\",\n    \"total_amount\": 800\n}\n```",
  "model": "mistral-large-2411",
  "network": "arbitrum-sepolia",
  "txHash": "0x52863cb20872a82c6b5930551e8aa4d294e10990f4b0589b0365ab48ea2a7114",
  "explorerLink": "https://sepolia.arbiscan.io/tx/0x52863cb20872a82c6b5930551e8aa4d294e10990f4b0589b0365ab48ea2a7114",
  "sessionId": "941bf70c-c703-4b90-89f9-6fb335b38551",
  "usage": {
    "input_tokens": 412,
    "output_tokens": 27
  }
}
```

## Start method

### Request body (curl)

PDF file max size is set to 10MB.

The reference ID can be left empty. 

```bash
curl -X 'POST' \
  'http://localhost:3000/start' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Facture 12345.pdf;type=application/pdf' \
  -F 'referenceId='
```

### Response

```json 
{
  "path": "/Users/ju/settla/data/invoices/INV-2025-001-2025-05-06T12-24-50-747Z-f9a29999-7a8f-4020-a63a-5a9eddf53525.pdf",
  "filename": "Facture 12345.pdf",
  "size": 227529,
  "timestamp": "2025-05-06T12:24:50.749Z",
  "referenceId": "INV-2025-001"
}
```

## Support

Feel free to reach out to [Julien](https://github.com/julienbrg) through:

- Element: [@julienbrg:matrix.org](https://matrix.to/#/@julienbrg:matrix.org)
- Farcaster: [julien-](https://warpcast.com/julien-)
- Telegram: [@julienbrg](https://t.me/julienbrg)
- Twitter: [@julienbrg](https://twitter.com/julienbrg)
- Discord: [julienbrg](https://discordapp.com/users/julienbrg)
- LinkedIn: [julienberanger](https://www.linkedin.com/in/julienberanger/)

<img src="https://bafkreid5xwxz4bed67bxb2wjmwsec4uhlcjviwy7pkzwoyu5oesjd3sp64.ipfs.w3s.link" alt="built-with-ethereum-w3hc" width="100"/>