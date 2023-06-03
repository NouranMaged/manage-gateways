# Gateways Server Part

## Stack

- Backend: NodeJS + Express + MongoDB REST API

Gateways API: (GET,PUT,ADD,DELETE)

- a unique serial number (string),
- human-readable name (string),
- IPv4 address ,

Devices API: (GET,PUT,ADD,DELETE)

- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

## How to?

### Development environment

1. Clone this repo: `git clone https://github.com/NouranMaged/manage-gateways`
2. Move to the cloned directory: `cd manage-gateways/server`
3. Run `npm run start`
4. The server should be ready on http://localhost:3000
