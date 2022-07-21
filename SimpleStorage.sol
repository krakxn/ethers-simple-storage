// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; /// Version should be 0.8.0 and above

contract SimpleStorage {
    uint256 favoriteNumber;
    
    /// Creates People object
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people; /// Array of People objects
    
    /// Dictionary nameToFavoriteNumber with string as key
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
    
    function retrieve() public view returns (uint256) { /// Returns uint256 type
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name)); /// Pushes People objects in array people
        nameToFavoriteNumber[_name] = _favoriteNumber; /// _name key in the dictionary now points to _favoriteNumber
    }
}
