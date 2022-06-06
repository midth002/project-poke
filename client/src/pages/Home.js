import React from 'react';
import ReactDOM from 'react-dom';
import panda from "../assets/panbowl.png"
import bowl from "../assets/bowlbowl.png"
import cat from "../assets/cat-eating.gif"
import style from "../../src/index.css"


const Home = () => {
return (
<div style={{style}
}>
<div class="card bg-danger text-center">
  <div class="card-body-home m-3 p-5 bg-light">
  
  <h1 class="card-title text-white text-center bg-danger">WELCOME TO THE PROJECT POKÉ APPLICATION!</h1>
            <br></br>
            <div class="text">
            <h3 class="card-text text-danger text-center">Have an appetite?</h3>
            <br></br>
            <div class= "img">
              <img class="imgBowl img-fluid rounded float-left" src={bowl} /><p class="text-light">__________</p><img class="imgBowl img-fluid rounded float-left" src={cat} /><p class="text-light">__________</p><img class="imgBowl img-fluid rounded float-left" src={panda} /> 
            </div>
            <br></br>
            <br></br>
            <p class="text-danger text-center">❖ Now with our website you can order a Poké Bowl meal at your fingertips! 🖥 📲
            <br></br> 
            <br></br>❖ Choose from precrafted selections, sides, and a variety of beverages to complete your order. 🥢 🍲
            <br></br>
            <br></br>❖ Easy checkout for an easy meal at your convenience 💳 
            <br></br>
            <br></br>⬇️ Click below to start ordering now ⬇️</p>
            </div>
            <a class="btn btn-danger btn-lg mx-auto m-4" href="https://tranquil-castle-29813.herokuapp.com/login" role="button">Start My Order</a>  <a class="btn btn-danger btn-lg mx-auto m-4" href="https://tranquil-castle-29813.herokuapp.com/menu" role="button">View the Menu</a>
            
            <br></br>
            <br></br>
            <h6 class="card-title text-white text-center bg-danger">CREATED FOR PROJECT 3 JUNE 2022- BROUGHT TO YOU BY ANDREW, LIBBY, OZZIE, AND JADE</h6>
  </div>
</div>
</div>
)
}

export default Home