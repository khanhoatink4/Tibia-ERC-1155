App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('ERC1155Mintable.json', function (data) {
            var TibiaTokenArtifact = data;
            console.log(data)
            App.contracts.TibiaToken = TruffleContract(TibiaTokenArtifact);
            App.contracts.TibiaToken.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function () {
<<<<<<< HEAD
        $(document).on('click', '#testButton', App.testFunction);
=======
        $(document).on('click', '#mintButton1', App.mint);
        $(document).on('click', '#mintButton2', App.mint);
        $(document).on('click', '#mintButton3', App.mint);
        $(document).on('click', '#mintButton4', App.mint);
        $(document).on('click', '#mintButton5', App.mint);
        $(document).on('click', '#mintButton6', App.mint);
        $(document).on('click', '#mintButton7', App.mint);
        $(document).on('click', '#mintButton8', App.mint);
        $(document).on('click', '#mintButton9', App.mint);
>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
    },

    testFunction: function (event) {
        event.preventDefault();
        let TibiaTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            App.contracts.TibiaToken.deployed().then(function (instance) {
                TibiaTokenInstance = instance;
                return TibiaTokenInstance.helloThere();
            }).then(function (result) {
                alert('Test: ' + result);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

<<<<<<< HEAD
=======
    mint: function (event) {
        event.preventDefault();
        let TibiaTokenInstance;

        let name = "Maiko";
        let totalSupply = 1000000; 
        let uri = "http://test.com/test.json"; 
        let decimals = 0; 
        let symbol = "SWD";

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            App.contracts.TibiaToken.deployed().then(function (instance) {
                TibiaTokenInstance = instance;
                return TibiaTokenInstance.mint(name, totalSupply, uri, decimals, symbol);
            }).then(function (result) {
                alert('Test: ' + result);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

>>>>>>> 29d9cc0817e8faa404fd568e9b6e12984d82948b
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});