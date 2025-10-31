// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title DID Registry - simple decentralized identity registry
contract DIDRegistry {
    struct Identity {
        address owner;       // owner wallet
        string ipfsHash;     // CID pointing to the identity document stored on IPFS
        bool verified;       // whether a trusted verifier signed off
        address verifier;    // who verified (if any)
        uint256 timestamp;
    }

    mapping(string => Identity) public identities; // mapping DID -> Identity

    event IdentityRegistered(string indexed did, address indexed owner, string ipfsHash, uint256 timestamp);
    event IdentityVerified(string indexed did, address indexed verifier, uint256 timestamp);

    modifier onlyOwner(string memory did) {
        require(identities[did].owner == msg.sender, "not owner");
        _;
    }

    function registerIdentity(string calldata did, string calldata ipfsHash) external {
        // allow initial register or allow update only by owner
        Identity storage id = identities[did];
        require(id.owner == address(0) || id.owner == msg.sender, "already owned by another");
        id.owner = msg.sender;
        id.ipfsHash = ipfsHash;
        id.verified = false;
        id.verifier = address(0);
        id.timestamp = block.timestamp;
        emit IdentityRegistered(did, msg.sender, ipfsHash, block.timestamp);
    }

    function verifyIdentity(string calldata did) external {
        Identity storage id = identities[did];
        require(id.owner != address(0), "not registered");
        // In a simple prototype, anyone can call verify, but in real app, restrict to trusted verifier role
        id.verified = true;
        id.verifier = msg.sender;
        id.timestamp = block.timestamp;
        emit IdentityVerified(did, msg.sender, block.timestamp);
    }

    function getIdentity(string calldata did) external view returns (address owner, string memory ipfsHash, bool verified, address verifier, uint256 timestamp) {
        Identity storage id = identities[did];
        return (id.owner, id.ipfsHash, id.verified, id.verifier, id.timestamp);
    }
}
