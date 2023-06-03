# Managing Gateways

## Description

This sample project is managing gateways - master devices that control multiple peripheral devices.

Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

Each gateway has:

- a unique serial number (string),
- human-readable name (string),
- IPv4 address (to be validated)

Each peripheral device has:

- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

## Stack

- Frontend: React.js + MaterialUI
- Backend: NodeJS + Express + MongoDB REST API

## How to?

1. Clone this repo: `git clone https://github.com/NouranMaged/manage-gateways`
2. Move to the cloned directory: `cd manage-gateways`

### Production environment

1. Rename the file `.env.template` to `.env` and adjust the variables values properly
2. Run `docker-compose up`
3. The frontend app should be ready on http://localhost:5000 and server works on http://localhost:3000

### FrontEnd Part Development environment

1. Clone this repo: `git clone https://github.com/NouranMaged/manage-gateways`
2. Move to the cloned directory: `cd manage-gateways/client`
3. Run `npm install`
4. Run `npm run start`
5. The server should be ready on http://localhost:urlocalport
