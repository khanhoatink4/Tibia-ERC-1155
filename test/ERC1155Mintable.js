/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const ERC1155Mintable = artifacts.require('ERC1155Mintable.sol');

<<<<<<< HEAD
=======
let owner
>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
let user1;
let user2;
let user3;
let mainContract;

contract('ERC1155Mintable', (accounts) => {
    before(async () => {
<<<<<<< HEAD
=======
        owner = accounts[0];
>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
        user1 = accounts[1];
        user2 = accounts[2];
        user3 = accounts[3];
        mainContract = await ERC1155Mintable.new();
    });

<<<<<<< HEAD
    it('Mint initial items', async () => {
        let tx = await mainContract.mint('Hammer', 5, 'https://metadata.enjincoin.io/hammer.json', 0, 'HAM', {from: user1});
        let hammerId = await mainContract.nonce.call();
        tx = await mainContract.mint('Sword', 200, 'https://metadata.enjincoin.io/sword.json', 0, 'SRD', {from: user1});
        let swordId = await mainContract.nonce.call();
=======
        it('Mint initial items', async () => {
        let tx = await mainContract.mint('Hammer', 5, 'https://metadata.enjincoin.io/hammer.json', 0, 'HAM', {from: user1});
        let hammerId = await mainContract.nonce.call();

        tx = await mainContract.mint('Sword', 200, 'https://metadata.enjincoin.io/sword.json', 0, 'SRD', {from: user1});
        let swordId = await mainContract.nonce.call();
        
>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
        tx = await mainContract.mint('Mace', 1000000, 'https://metadata.enjincoin.io/mace.json', 0, 'MACE', {from: user1});
        let maceId = await mainContract.nonce.call();

        assert.strictEqual(hammerId.toNumber(), 1);
        assert.strictEqual(swordId.toNumber(), 2);
        assert.strictEqual(maceId.toNumber(), 3);
    });

<<<<<<< HEAD
    it('batchTransfer', async () => {
        let tx = await mainContract.batchTransfer(user2, [1,2], [1,1], {from: user1});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 1);
        assert.strictEqual(swordBalance, 1);
        assert.strictEqual(maceBalance, 0);
    });

    it('batchApprove', async () => {
        let tx = await mainContract.batchApprove(user2, [1,2], [0,0], [1,1], {from: user1});
        let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
        let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
        let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
        assert.strictEqual(hammerApproval, 1);
        assert.strictEqual(swordApproval, 1);
        assert.strictEqual(maceApproval, 0);
    });

    it('approve', async () => {
        let tx = await mainContract.approve(user2, 2, 1, 2, {from: user1});
        let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
        let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
        let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
        assert.strictEqual(hammerApproval, 1);
        assert.strictEqual(swordApproval, 2);
        assert.strictEqual(maceApproval, 0);
    });

    it('batchTransferFrom', async () => {
        let tx = await mainContract.batchTransferFrom(user1, user2, [1,2], [1,1], {from: user2});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 2);
        assert.strictEqual(swordBalance, 2);
        assert.strictEqual(maceBalance, 0);
    });

    it('transferFrom', async () => {
        let tx = await mainContract.transferFrom(user1, user2, 2, 1, {from: user2});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 2);
        assert.strictEqual(swordBalance, 3);
        assert.strictEqual(maceBalance, 0);
    });

    it('multicastTransfer', async () => {
        let tx = await mainContract.multicastTransfer([user2, user3], [2,3], [3,3], {from: user1});
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user3)).toNumber();
        assert.strictEqual(swordBalance, 6);
        assert.strictEqual(maceBalance, 3);
    });
=======

    // enjin tests
    //
    // it('Mint initial items', async () => {
    //     let tx = await mainContract.mint('Hammer', 5, 'https://metadata.enjincoin.io/hammer.json', 0, 'HAM', {from: user1});
    //     let hammerId = await mainContract.nonce.call();
    //     tx = await mainContract.mint('Sword', 200, 'https://metadata.enjincoin.io/sword.json', 0, 'SRD', {from: user1});
    //     let swordId = await mainContract.nonce.call();
    //     tx = await mainContract.mint('Mace', 1000000, 'https://metadata.enjincoin.io/mace.json', 0, 'MACE', {from: user1});
    //     let maceId = await mainContract.nonce.call();

    //     assert.strictEqual(hammerId.toNumber(), 1);
    //     assert.strictEqual(swordId.toNumber(), 2);
    //     assert.strictEqual(maceId.toNumber(), 3);
    // });

    // it('batchTransfer', async () => {
    //     let tx = await mainContract.batchTransfer(user2, [1,2], [1,1], {from: user1});
    //     let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
    //     let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
    //     let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
    //     assert.strictEqual(hammerBalance, 1);
    //     assert.strictEqual(swordBalance, 1);
    //     assert.strictEqual(maceBalance, 0);
    // });

    // it('batchApprove', async () => {
    //     let tx = await mainContract.batchApprove(user2, [1,2], [0,0], [1,1], {from: user1});
    //     let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
    //     let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
    //     let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
    //     assert.strictEqual(hammerApproval, 1);
    //     assert.strictEqual(swordApproval, 1);
    //     assert.strictEqual(maceApproval, 0);
    // });

    // it('approve', async () => {
    //     let tx = await mainContract.approve(user2, 2, 1, 2, {from: user1});
    //     let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
    //     let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
    //     let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
    //     assert.strictEqual(hammerApproval, 1);
    //     assert.strictEqual(swordApproval, 2);
    //     assert.strictEqual(maceApproval, 0);
    // });

    // it('batchTransferFrom', async () => {
    //     let tx = await mainContract.batchTransferFrom(user1, user2, [1,2], [1,1], {from: user2});
    //     let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
    //     let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
    //     let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
    //     assert.strictEqual(hammerBalance, 2);
    //     assert.strictEqual(swordBalance, 2);
    //     assert.strictEqual(maceBalance, 0);
    // });

    // it('transferFrom', async () => {
    //     let tx = await mainContract.transferFrom(user1, user2, 2, 1, {from: user2});
    //     let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
    //     let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
    //     let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
    //     assert.strictEqual(hammerBalance, 2);
    //     assert.strictEqual(swordBalance, 3);
    //     assert.strictEqual(maceBalance, 0);
    // });

    // it('multicastTransfer', async () => {
    //     let tx = await mainContract.multicastTransfer([user2, user3], [2,3], [3,3], {from: user1});
    //     let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
    //     let maceBalance = (await mainContract.balanceOf.call(3, user3)).toNumber();
    //     assert.strictEqual(swordBalance, 6);
    //     assert.strictEqual(maceBalance, 3);
    // });
>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
    
});