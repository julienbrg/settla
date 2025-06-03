# Settla

Allows users to schedule payment requests for a given invoice.

API live at **http://83.228.197.248:3000/api**

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

- PDF file upload

### Curl 

```bash 
curl -X 'POST' \
  'http://83.228.197.248:3000/extract' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Facture #88888.pdf;type=application/pdf'
```

### Response body 

```json 
{
  "is_invoice": true,
  "invoice_number": "25032612",
  "total_amount": 700,
  "target_company_name": "Epitech Digital",
  "issue_date": "2025-03-26",
  "due_date": "2025-04-15",
  "payment_delay": 20,
  "already_paid": 0,
  "contact_name": "Michael JACKSON",
  "contact_email": "michael@epitech.digital",
  "contact_phone": "",
  "contact_company_registration_number": "887640480 00018",
  "llm_model_used": "claude-3-7-sonnet-20250219",
  "sessionId": "8e8491b6-a2ec-4935-9293-5f04a0f3f08c"
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