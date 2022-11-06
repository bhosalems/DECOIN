// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;
import "./Dcoin.sol";

///@title Dnews
/// @author Ashish
contract Dnews
{
//    using SafeMath for uint;

    address payable public owner;  //address of the chairperson
    uint public commission;   //percent of commsion payed to the chairperson
    uint public minimumDeposit; //minimum deposit required for each register
    uint public reviewCommission; //commision payed to the reviewer

    Dcoin public newsCoin;
    uint256 public tokenPrice;
    uint256 public tokensSold;
 
   //enums to be used in events
    // enum ServiceStatus{Requested, Active, Rejected, Cancelled, Inactive}
    enum UserStatus{Registered, Failed}
    enum PublishStatus{Published, Revoked}
    enum Vote{For, Against}

    struct User{
        uint balance;
        bool exists;
        uint articleCount;

    }

   struct Article{ 
       bool exist;
   }
   
   mapping(address => User) public  users;   //mapping from user address to user 
   mapping(string =>  Article) public articles; // mapping from articleid to article



    event PublishEvent(address user, PublishStatus status);
    event UserEvent(address user, UserStatus status);
    event VoteEvent(address user,Vote vote);



///modifiers
 modifier onlyUser(){
        require(users[msg.sender].exists == true, "Operation is allowed only by registered users");
        _;
    }


/// @dev Constructor to initialize the chairperson, commission, and minimum deposit 
   constructor (Dcoin  _tokenContract, uint256 _tokenPrice)  {
        owner = payable(msg.sender);
        commission = 2;
        reviewCommission=10;
        minimumDeposit = 10 ** 2;

        newsCoin = _tokenContract;
        tokenPrice=_tokenPrice;
    }


/// @notice Allows users to self-register to the newsapp
    function register() public payable{
        // require(msg.value >= minimumDeposit, "User must deposit funds greater than minimum deposit");
        

        newsCoin.transferFrom(owner, msg.sender, msg.value);
        
        users[msg.sender] = User(users[msg.sender].balance + msg.value, 
                                    true, 
                                       0 
                                       );

            emit UserEvent(msg.sender,UserStatus.Registered);
    }


/// @notice Allows users to  publish article on chain
  function publish(string memory articleHash) public  payable onlyUser{
        
        require( articles[articleHash].exist!=true,"This article already exist");
        
        articles[articleHash].exist=true; //put the article in the mapping
        users[msg.sender].articleCount++; //increase the article count of the user

        emit PublishEvent(msg.sender,PublishStatus.Published);
  
  }

/// @notice Allows users to vote for an article
  function vote() public  payable onlyUser{
    
     newsCoin.transferFrom(owner, msg.sender,reviewCommission );
 
     emit VoteEvent(msg.sender,Vote.For);
     

}

/// @notice Allows users to vote for an article
  function read() public  payable onlyUser{

    newsCoin.approve(msg.sender,1000);
     newsCoin.transferFrom(msg.sender, owner,10);

     emit VoteEvent(msg.sender,Vote.For);
     

}



}