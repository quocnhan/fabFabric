const Web3 = require('web3');
const utils = require('ethereumjs-util');
const ethers = require('ethers');

const getSignData = (wallet, dataToSign) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await wallet.signMessage(dataToSign)
            resolve(data.toString());
        } catch (err) {
            reject(err);
        }
    })
}

class TransactionService {

    constructor(provider) {
        this.provider = provider;
        this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    }

    async getTxReceipt(hashString) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getTransactionReceipt(hashString, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    async getTx(hashString) {
        return new Promise((resolve, reject) => {
            this.web3.eth.getTransaction(hashString, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    async checkStatusCreated(txHash) {
        let object, result;
        try {
            object = await this.getTxReceipt(txHash);
            if (object) {
                if (object.status) {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 1,
                        address: object.contractAddress
                    };
                }
                else {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 2,
                        address: null
                    };
                }
            }
            else {
                result = {
                    transaction_hash: txHash,
                    block_number: null,
                    status: 0,
                    address: null
                };
            }
            return result;
        }
        catch (err) { return err; }
    }

    async checkStatusCreatedWithToken(txHash) {
        let object, result;
        try {
            object = await this.getTxReceipt(txHash);
            if (object) {
                if (object.status) {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 1,
                        address: object.logs[0].address
                    };
                }
                else {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 2,
                        address: null
                    };
                }
            }
            else {
                result = {
                    transaction_hash: txHash,
                    block_number: null,
                    status: 0,
                    address: null
                };
            }
            return result;
        }
        catch (err) { return err; }
    }

    async checkStatusTransaction(txHash) {
        let txStatus, object, result;
        try {
            txStatus = await this.getTx(txHash);
            if (!txStatus) {
                return result = {
                    transaction_hash: txHash,
                    block_number: null,
                    status: 2
                };
            }
            object = await this.getTxReceipt(txHash);
            if (object) {
                if (object.status) {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 1
                    };
                }
                else {
                    result = {
                        transaction_hash: txHash,
                        block_number: object.blockNumber,
                        status: 2
                    };
                }
            }
            else {
                result = {
                    transaction_hash: txHash,
                    block_number: null,
                    status: 0
                };
            }
            return result;
        }
        catch (err) { return err; }
    }

    async checkStatusCloseChallenge(txHash) {
        let txStatus, object, result;
        try {
            txStatus = await this.getTx(txHash);
            if (!txStatus) {
                return result = {
                    transaction_hash: txHash,
                    block_number: null,
                    status: 2
                };
            }
            object = await this.getTxReceipt(txHash);
            if (object) {
                if (object.status) {
                    //filter event with topics close challenge in contract : CloseChallenge(bool)
                    let eventStatus = object.logs.filter(obj => obj.topics[0] === "0xe3e60fbb15d08e7fd26c6b9c1b23f426e6ea1440e9cef171604a15cf86b8357c")
                    result = {
                        transaction_hash: txHash,
                        contractAddress: object.to,
                        status: 1,
                        challengeStatus: this.web3.utils.hexToNumber(eventStatus[0].topics[1])
                    };
                }
                else {
                    result = {
                        transaction_hash: txHash,
                        contractAddress: object.to,
                        status: 2
                    };
                }
            }
            else {
                result = {
                    transaction_hash: txHash,
                    contractAddress: null,
                    status: 0
                };
            }
            return result;
        }
        catch (err) { return err; }
    }

    async generateSignature(dataToSign, privateKey) {
        try {
            var wallet = new ethers.Wallet(privateKey);
            let signature = await getSignData(wallet, dataToSign);
            signature = signature.substr(2);
            const r = '0x' + signature.slice(0, 64);
            const s = '0x' + signature.slice(64, 128);
            const v_hex = '0x' + signature.slice(128, 130);
            const v = this.web3.utils.hexToNumber(v_hex);
            return { v, r, s }
        }
        catch (err) { return err; }
    }

    recoverAddress(msg, signature) {
        try {
            return this.web3.eth.accounts.recover(msg, signature);
        }
        catch (err) { return err; }
    }
}

module.exports = { TransactionService }