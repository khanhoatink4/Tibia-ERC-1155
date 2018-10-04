/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const TibiaGameItems = artifacts.require('TibiaGameItems.sol');

let owner
let user1;
let user2;
let user3;
let mainContract;

contract('TibiaGameItems', (accounts) => {
    before(async () => {
        owner = accounts[0];
        user1 = accounts[1];
        user2 = accounts[2];
        user3 = accounts[3];
        mainContract = await TibiaGameItems.new();
    });

    // it('Mint initial items', async () => {
    //     let id = 1 // since starts with 0 and only increment
    //     let name = 'tibia-crystalline-sword'

    //     let tx = await mainContract.mint(name, 100000, '', 4, 'TCS', {
    //         from: user1
    //     })
    //     let hammerId = await mainContract.nonce.call()
    //     assert.strictEqual(hammerId.toNumber(), id)

    //     let mintedName = await mainContract.name(hammerId.toNumber())
    //     assert.strictEqual(name, mintedName)
    // });


    // enjin tests
    //
    it('Mint initial items', async () => {
        let tx = await mainContract.mint('Hammer', 5, 'https://metadata.enjincoin.io/hammer.json', 0, 'HAM', {from: user1});
        let hammerId = await mainContract.nonce.call();
        tx = await mainContract.mint('Sword', 200, 'https://metadata.enjincoin.io/sword.json', 0, 'SRD', {from: user1});
        let swordId = await mainContract.nonce.call();
        tx = await mainContract.mint('Mace', 1000000, 'https://metadata.enjincoin.io/mace.json', 0, 'MACE', {from: user1});
        let maceId = await mainContract.nonce.call();

        assert.strictEqual(hammerId.toNumber(), 1);
        assert.strictEqual(swordId.toNumber(), 2);
        assert.strictEqual(maceId.toNumber(), 3);
    });

    it('transfer', async () => {
        let tx = await mainContract.transfer(user2, 1, 1, {from: user1});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 1);
        assert.strictEqual(swordBalance, 0);
        assert.strictEqual(maceBalance, 0);
    });

    it('approve', async () => {
        // let hammerBalanceUser1 = (await mainContract.balanceOf.call(1, user1)).toNumber();
        // let swordBalanceUser1 = (await mainContract.balanceOf.call(2, user1)).toNumber();
        // let maceBalanceUser1 = (await mainContract.balanceOf.call(3, user1)).toNumber();
        // console.log("hammerBalanceUser1 : " + hammerBalanceUser1);
        // console.log("swordBalanceUser1 : " + swordBalanceUser1);
        // console.log("maceBalanceUser1 : " + maceBalanceUser1);

        // let hammerBalanceUser2 = (await mainContract.balanceOf.call(1, user2)).toNumber();
        // let swordBalanceUser2 = (await mainContract.balanceOf.call(2, user2)).toNumber();
        // let maceBalanceUser2 = (await mainContract.balanceOf.call(3, user2)).toNumber();
        // console.log("hammerBalanceUser2 : " + hammerBalanceUser2);
        // console.log("swordBalanceUser2 : " + swordBalanceUser2);
        // console.log("maceBalanceUser2 : " + maceBalanceUser2);
        
        let tx = await mainContract.approve(user2, 1, 0, 1, {from: user1});
        let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
        let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
        let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
        assert.strictEqual(hammerApproval, 1);
        assert.strictEqual(swordApproval, 0);
        assert.strictEqual(maceApproval, 0);
    });

    it('transferFrom', async () => {
        let tx = await mainContract.transferFrom(user1, user2, 1, 1, {from: user1});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 2);
        assert.strictEqual(swordBalance, 0);
        assert.strictEqual(maceBalance, 0);
    });

    function printBalances(accounts) {
        console.log('    ', '== Truffle Account Balances ==');
        accounts.forEach(function (ac, i) {
            console.log('    ', i, web3.fromWei(web3.eth.getBalance(ac), 'ether').toNumber());
        });
    }

});