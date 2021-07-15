#BAP CHALLENGE PRODUCT

In order to use this package, first of all, you need to install
```bash
npm i tx-inspection-bap
```

Create instance from tx-inspection-bap , for example : 
```javascript
const tx = require('tx-inspection-bap')
```

First, you need to have instance of Transaction service class,using *https://rinkeby.infura.io/* for web3 provider:
```javascript
let inspect = new tx.TransactionService(provider)
```

###You can also check status of an transaction with :
```javascript
let status = await inspect.checkStatusTransaction(txHash)
```

This is an example result
```
{
  transaction_hash: '0x398599db0d610f7550cc76fdfbe8b01015a913e7ce3c0b62a9b4d7725aec0c0a',
  block_number: 4412771,
  status: 1 
}
```

>status : 0 is pending, 1 is success, 2 is fail

>block_number : null is pending or it will be a number of block

>transaction_hash : what you put in

---

###You can also check status of create new contract challenge with :

```javascript
let status = await inspect.checkStatusCreated(txHash) //for challenge by ETH 
let status = await inspect.checkStatusCreatedWithToken(txHash) // for challenge by Token

```

This is an example result
```
{
  transaction_hash: '0x398599db0d610f7550cc76fdfbe8b01015a913e7ce3c0b62a9b4d7725aec0c0a',
  block_number: 4412771,
  status: 1,
  address: '0xe44424579FFd20a198C0f7E852AD9663AB6Da11D' 
}
```

>status : 0 is pending, 1 is success, 2 is fail

>blockNumber : null is pending or it will be a number of block

>transaction_hash : what you put in

>address : null if transaction is pending or failed, or it will be an address of challenge contract


---

###You can check status of close contract challenge with :

```javascript
let status = await inspect.checkStatusCloseChallenge(txHash)
```

This is an example result
```
{ transaction_hash: '0xd3d6b9b5545defed3f914a2d88564fb548b0b137b586b4f63db51debc2945d0b',
  contractAddress: '0xbf6417b682c87a64574e37cd56b35bd7b0e26c62',
  status: 1,
  challengeStatus: 1 }
```

>status : 0 is pending, 1 is success, 2 is fail

>contractAddress : challenge address

>transaction_hash : what you put in

>challengeStatus : 0 is challenge fail, 1 is success


---

###You can generate new signature from a message :

```javascript
let status = await inspect.generateSignature(message, privateKey)
```

>message : any string which was signed from begin, "1", "2" and so on



---

###You can recover address which signed the message :

```javascript
let status = await inspect.recoverAddress(message, signature)
```

>message : any string which was signed from begin

>signature : type string, example : 0x0471a82879fff01d8ad90ac66ae8ee85657e726feb80b1d0ef3bc83bc297f15b6498174ec7fd7eec52e46aa17cebc85fab079b42a7274a09cfdd4781de410b5e1c
# tx-inspection-bap
