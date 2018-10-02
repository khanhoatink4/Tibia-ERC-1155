const ERC1155Mintable = artifacts.require("ERC1155Mintable.sol");

module.exports = function (deployer) {
    deployer.deploy(ERC1155Mintable);
};