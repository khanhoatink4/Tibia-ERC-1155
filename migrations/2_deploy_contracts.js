const TibiaGameItems = artifacts.require("TibiaGameItems.sol");

module.exports = function (deployer) {
    deployer.deploy(TibiaGameItems);
};