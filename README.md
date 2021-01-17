# Ethereum Tickets
Sale tickets to your events with Ethereum!
You can see the website demo on [netlify.app](https://hungry-sammet-4eed59.netlify.app/) and smart contracts on [Github](https://github.com/yurycooliq/ethereum-tickets).

## About
Event organizer can create an event and user can buy tickets on it with ether.

Event organizer (owner) create an event:
- clicks on create event button which open the modal with form
- fills required fields about the event (event name, description, poster image url, event symbol, total available tickets, ticket price in ether, start date & duration)
- submits the form
- metamask modal will popup and prompt the owner to confirm the transaction and pay the required gas fees
- after the owner confirms the metamask dialog, Event is created and ready to sell tickets.

User buy tickets:
- click buy button on the event card
- metamask modal will popup and prompt a user to confirm the transaction and pay the required gas fees and ticket value
- user can check tickets amount on the event card


## Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
