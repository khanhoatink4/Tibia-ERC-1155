App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: async () => {
        if (App.ethereum) {
            App.web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
            } catch (error) {
                console.log("User denied account access...")
            }
        }
        else if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function () {
        $.getJSON('TibiaGameItems.json', function (data) {
            var TibiaTokenArtifact = data;
            //console.log(data)
            App.contracts.TibiaToken = TruffleContract(TibiaTokenArtifact);
            App.contracts.TibiaToken.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function () {

        //Mint
        $("#mintButton1").click({
            param1: "tibia-crystalline-sword",
            param2: 1,
            param3: "TCS"
        }, App.mint);
        $("#mintButton2").click({
            param1: "tibia-giant-sword",
            param2: 2,
            param3: "TGS"
        }, App.mint);
        $("#mintButton3").click({
            param1: "tibia-haunted-blade",
            param2: 3,
            param3: "THS"
        }, App.mint);
        $("#mintButton4").click({
            param1: "tibia-magic-sword",
            param2: 4,
            param3: "TMS"
        }, App.mint);
        $("#mintButton5").click({
            param1: "tibia-mercenary-sword",
            param2: 5,
            param3: "TYS"
        }, App.mint);
        $("#mintButton6").click({
            param1: "tibia-pharaoh-sword",
            param2: 6,
            param3: "TPS"
        }, App.mint);
        $("#mintButton7").click({
            param1: "tibia-the-avenger",
            param2: 7,
            param3: "TAS"
        }, App.mint);
        $("#mintButton8").click({
            param1: "tibia-shiny-blade",
            param2: 8,
            param3: "TSS"
        }, App.mint);
        $("#mintButton9").click({
            param1: "tibia-zaoan-sword",
            param2: 9,
            param3: "TZS"
        }, App.mint);

        //Balance
        $("#balanceButton1").click({
            param1: 1,
        }, App.getBalance);
        $("#balanceButton2").click({
            param1: 2,
        }, App.getBalance);
        $("#balanceButton3").click({
            param1: 4,
        }, App.getBalance);
        $("#balanceButton4").click({
            param1: 4,
        }, App.getBalance);
        $("#balanceButton5").click({
            param1: 5,
        }, App.getBalance);
        $("#balanceButton6").click({
            param1: 6,
        }, App.getBalance);
        $("#balanceButton7").click({
            param1: 7,
        }, App.getBalance);
        $("#balanceButton8").click({
            param1: 8,
        }, App.getBalance);
        $("#balanceButton9").click({
            param1: 9,
        }, App.getBalance);

        //Transfer
        $("#transferButton1").click({
            param1: 1
        }, App.transfer);


        $("#acBalance2").click({
            param1: 2,
        }, App.getBalanceAccount);

    },

    mint: function (event) {
        event.preventDefault();
        let TibiaTokenInstance;

        let name = event.data.param1
        let id = event.data.param2
        let idSelector = "#totalSupply" + id
        let totalSupply = $(idSelector).val()
        $(idSelector).prop('disabled', true);
        let uri = ""
        let decimals = 0;
        let symbol = event.data.param3

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            App.contracts.TibiaToken.deployed().then(function (instance) {
                TibiaTokenInstance = instance;
                return TibiaTokenInstance.mint(name, totalSupply, uri, decimals, symbol, id);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    getBalance: function (event) {
        event.preventDefault();
        let id = event.data.param1;
        let TibiaTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            App.contracts.TibiaToken.deployed().then(function (instance) {
                TibiaTokenInstance = instance;
                return TibiaTokenInstance.balanceOf.call(id, accounts[0]);
            }).then(function (result) {
                alert("Balance (id=" + id + ") is : " + result);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    transfer: function (event) {
        event.preventDefault();
        let id = event.data.param1;
        let accountNumber = $("#acTransfer1").val()
        let amount = $("#acAmount1").val()
        let idSelector = "#acAddress" + accountNumber
        let addressTo = $(idSelector).val()

        let TibiaTokenInstance
        App.contracts.TibiaToken.deployed().then(function (instance) {
            TibiaTokenInstance = instance;
            return TibiaTokenInstance.transfer(addressTo, id, amount);
        }).then(function (result) {
            alert('testTransfer: ' + JSON.stringify(result));
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getBalanceAccount: function (event) {
        event.preventDefault();
        let accountNumber = event.data.param1;
        let accSelector = "#acAddress" + accountNumber
        let address = $(accSelector).val()

        let idSelector = "#idBalance" + accountNumber
        let id = $(idSelector).val()

        let TibiaTokenInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            App.contracts.TibiaToken.deployed().then(function (instance) {
                TibiaTokenInstance = instance;
                return TibiaTokenInstance.balanceOf.call(id, address);
            }).then(function (result) {
                alert("Balance (id=" + id + ") is : " + result);
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});