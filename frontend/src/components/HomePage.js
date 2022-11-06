import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Container ,Card, Col, Button} from 'react-bootstrap';
// import img1 from './logo192.png';
import "../App.css";

// import '../css/home.css' 
const HomePage = () => {
  return (
    
    <>
    
    <div>
    <br/>
    <div className="jumbotron">
    <h1 className="display-4">Decentralized Coin Incentivised News Platform</h1>
    <p className="lead">Powered by Blockchain and AI.</p>
    <hr className="my-4"/>
    <p>Everything you read, is everything you need! Read, Write and Review news articles on your #1 secure and trusted local news app.</p>
    </div>
    <br/>
  </div>
  <div class="bg_image"></div>
  <h1>How we do it?</h1>
  <br/>
  <div class="row row-cols-1 row-cols-md-2">
  <div class="col mb-4">
    <div class="card">
    {/* <img loading="lazy" class="card-img-top" src="r_img.png" alt="Image cap"/> */}
      <div class="card-body">
        <h5 class="card-title">BLOCKCHAIN</h5>
        <p class="card-text">In DECOIN we use blockchain technology to create a secure peer to peer reviewd news platform which uses an ERC20 token "decoin" for transactions within the application. The decentralization of data ensures trust intermidiation and total anonimity of user and their articles.</p>
      </div>
    </div>
  </div>
  <div class="col mb-4">
    <div class="card">
      {/* <img loading="lazy" class="card-img-top" src="r_img.png" alt="Image cap"/> */}
      <div class="card-body">
        <h5 class="card-title">AI</h5>
        <p class="card-text">Along with peer to peer article review we also help our publishers by automated fact checking, social media relevancy check and intenet analysis to aid the quality of articles.</p>
      </div>
    </div>
  </div>
  <a className="btn btn-primary btn-md" style={{width:'200px'}} href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" role="button">Learn more</a>
  </div>
  <br/>
  <p>Contact us: <u>+1 716-555-6666</u> or <u>abc123@buffalo.edu</u> </p>
  <br/>
</>
  );
}

export default HomePage