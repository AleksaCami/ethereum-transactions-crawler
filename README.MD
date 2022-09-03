## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Preview starts a local web server that serves the built solution from ./dist for previewing
```
npm run preview
```

### Ethereum transactions crawler task

Application that will allow a user to view transaction
data from the Ethereum blockchain associated with a specific wallet address W
that the user inputs, starting with block B.
The application gets information on:
    
    wallets (addresses) and 

    amounts of ETH associated with transactions made to and from the given wallet W

    and show them in a simple human-readable way (ideally, through a web page). 

The application collects and displays ALL transaction data starting from the given block.

### Example: 

If a user requests to view transactions associated with the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f from block 9000000 to the current block, your application should be able to crawl and visualize all transaction data (addresses that have sent and received tokens from the address 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f , and how much ETH was used for a given transaction) in that period of time.
