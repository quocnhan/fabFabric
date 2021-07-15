const tx = require('./index')

const sv = new tx.TransactionService("https://rinkeby.infura.io/v3/6f24c75769274fc0a02b14e2ae42362a")
// const sv = new tx.TransactionService("https://ropsten.infura.io/v3/6f24c75769274fc0a02b14e2ae42362a")

// let sigObj = { 1
//     v: 27,
//     r: '0xab98e3f2e95e95595b53c83335f39c682893c37e6632ee239e6f7cad81093c2f',
//     s: '0x513a483dbd9681dbe2145e0f0b9dcd3678964be270ad76acb7855d991c2165a4'
// }
// let sigObj = { 2
//     v_decimal: 27,
//     r: '0xb3ee876716ed3ca99ef3b5400326963f3f107daf8b7022804afb393ff080a8c0',
//     s: '0x529dddf203d7af7f911eb88c44c5c456d0f8648c9353cbc0231f5aedfc71a014'
// }

// let k = { 3
//     v_decimal: 28,
//     r: '0xd44b59e3252fb64a3da8adcab5f2a3fa46e720d3d19e5e72ffc5cd812661ee2f',
//     s: '0x6d21803077e6ae81b35b7822a1e0b14c11f1fc60c70498352ceca3c469a069b9'
// }
// let sigStr = "0xab98e3f2e95e95595b53c83335f39c682893c37e6632ee239e6f7cad81093c2f513a483dbd9681dbe2145e0f0b9dcd3678964be270ad76acb7855d991c2165a41b"

let txH = "0xd0300758de32fb814791050b40f4f79ad885c090456fc27c2bc3e948e840d6b2"
async function abc() {
    let st = await sv.checkStatusCloseChallenge(txH)
    // let st = await sv.getTx(txH)

    // let si = await sv.generateSignature("1", "53FF205DFFF9943772633681485BA7563D2027EC31D222953F4C949B4846042C")
    //0xab98e3f2e95e95595b53c83335f39c682893c37e6632ee239e6f7cad81093c2f513a483dbd9681dbe2145e0f0b9dcd3678964be270ad76acb7855d991c2165a41b
    // let z;

    console.log("oh ", st);

    

}

abc()

