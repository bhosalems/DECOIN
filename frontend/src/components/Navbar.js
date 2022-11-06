// import React from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   Button,
//   NavLink,
//   NavItem,
//   UncontrolledButtonDropdown,
//   DropdownToggle,
//   DropdownItem,
//   DropdownMenu,
//   Alert,
// } from "reactstrap";
// import { Container } from "react-bootstrap";
// import { useState, useContext } from "react";
// // import web3service from "../../services/web3service";
// // import P2P from "../../services/P2PAPI.service";
// import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../context/AuthContext";
// // import { User } from "../../context/context";
// import { Link } from "react-router-dom";
// import { IoIosArrowDown } from "react-icons/io";
// import { useLocation } from "react-router-dom";
// import "../../css/navbar.css";
// import { toast } from "react-toastify";
// const AppNavbar = () => {
//   const { user, setUser } = useContext(User);
//   const [navbar, setNavbar] = useState(false);
//   const { isLogged, setIsLogged } = useContext(User);
//   const { modalShow, setModalShow } = useContext(User);

//   const locate = useLocation();
//   let navigate = useNavigate();

//   const changeBackground = () => {
//     if (window.scrollY >= 100) {
//       setNavbar(true);
//     } else {
//       setNavbar(false);
//     }
//   };

//   let handleRegister = () => {
//     if (window.ethereum) {
//       navigate("/register", { replace: true });
//     } else {
//       setModalShow(true);
//     }
//   };

//   const gotop2p = () => {
//     window.scrollTo({
//       top: 800,
//       behavior: "smooth",
//     });
//   };

//   const ourtech = () => {
//     window.scrollTo({
//       top: 2100,
//       behavior: "smooth",
//     });
//   };

//   const aboutus = () => {
//     window.scrollTo({
//       top: 4320,
//       behavior: "smooth",
//     });
//   };

//   const marketplace = () => {
//     navigate("/marketplace", { replace: true });
//   };

//   const SignIn = async () => {
//     if (window.ethereum) {
//       var myHeaders = new Headers();
//       const accounts = await web3service.getAccount();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("publicAddress", accounts);

//       var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       try {
//         let register_status = P2P.signIn(requestOptions)
//           .then((response) => {
//             if (response == "error") {
//               toast.error("User Not Registered");
//               throw new Error("User Not Found");
//             } else if (response.ok) {
//               return response.json();
//             }
//           })
//           .then((res) => {
//             const dat = {
//               id: res.data.id,
//               firstname: res.data.firstname,
//               lastname: res.data.lastname,
//               email: res.data.email,
//             };

//             if (res.code == 200) {
//               localStorage.setItem("user", JSON.stringify(dat));
//               localStorage.setItem("isLogged", "true");
//               localStorage.setItem("publicAddress", accounts);
//               setUser(dat);
//               setIsLogged(true);
//               navigate("/marketplace", { replace: true });
//             } else {
//               alert("We didnt find any records. Kindly Register");
//             }
//           })
//           .catch((error) => {
//             console.log("Error", error);
//           });
//       } catch (error) {}
//     } else {
//       setModalShow(true);
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });
//     setUser(null);
//     setIsLogged(false);
//   };

//   const consuming = () => navigate("/addconsuming", { replace: true });

//   const producing = () => navigate("/addproducing", { replace: true });
//   const billing = () => navigate("/billing", { replace: true });
//   const simulation = () => navigate("/simulation", { replace: true });

//   window.addEventListener("scroll", changeBackground);
//   return (
//     <Navbar
//       className={navbar ? "appnavbar active" : "appnavbar"}
//       bg="dark"
//       variant="dark"
//       fixed="top"
//     >
//       <NavbarBrand
//         className="brand"
//         tag={Link}
//         to={"/"}
//         style={{
//           color: "#000000",
//           fontSize: "40px",
//           fontFamily: "fantasy",
//           marginRight: "4rem",
//         }}
//       >
//         {navbar ? (
//           <img
//             className="logo-blue"
//             src="/images/p2p.png"
//             width={150}
//             height={50}
//             alt="not found"
//           />
//         ) : (
//           <img
//             className="logo-white"
//             src="/images/logo-p2p-white.png"
//             width={150}
//             height={50}
//             alt="not found"
//           />
//         )}
//       </NavbarBrand>

//       {locate.pathname == "/" && (
//         <>
//           {" "}
//           <NavItem style={{ listStyleType: "none", color: "white" }}>
//             <NavLink
//               style={{ listStyleType: "none", color: "white", gap: "1rem" }}
//               href="#p2pconnect"
//               onClick={gotop2p}
//             >
//               P2PCONNECT
//             </NavLink>
//           </NavItem>
//           <NavItem
//             style={{ listStyleType: "none", color: "white", gap: "1rem" }}
//           >
//             <NavLink
//               style={{ listStyleType: "none", color: "white", gap: "1rem" }}
//               href="#ourtech"
//               onClick={ourtech}
//             >
//               Our Technology
//             </NavLink>
//           </NavItem>
//           <NavItem style={{ listStyleType: "none", color: "white" }}>
//             <NavLink
//               style={{ listStyleType: "none", color: "white" }}
//               href="#about us"
//               onClick={aboutus}
//             >
//               About Us
//             </NavLink>
//           </NavItem>
//           {isLogged &&
//           (locate.pathname == "/" ||
//             locate.pathname == "/addconsuming" ||
//             locate.pathname == "/addproducing" ||
//             locate.pathname == "/simulation") ? (
//             <NavItem
//               style={{ listStyleType: "none", color: "white", gap: "1rem" }}
//             >
//               <NavLink
//                 style={{ listStyleType: "none", color: "white" }}
//                 href="/marketplace"
//               >
//                 {" "}
//                 Marketplace
//               </NavLink>
//             </NavItem>
//           ) : (
//             <></>
//           )}
//         </>
//       )}

//       <div className="float-left mr-3">
//         {isLogged ? (
//           <UncontrolledButtonDropdown
//             style={{
//               listStyleType: "none",
//               display: "block",
//               marginRight: "8rem",
//             }}
//             nav
//             inNavbar
//           >
//             <DropdownToggle
//               nav
//               caret
//               style={{ color: "white", fontSize: "20px" }}
//             >
//               {user.firstname}
//             </DropdownToggle>
//             <DropdownMenu right>
//               <DropdownItem>
//                 <NavLink style={{ listStyleType: "none" }} onClick={simulation}>
//                   Simulation
//                 </NavLink>
//               </DropdownItem>

//               <DropdownItem>
//                 <NavLink style={{ listStyleType: "none" }} onClick={consuming}>
//                   Add Consuming Station
//                 </NavLink>
//               </DropdownItem>

//               <DropdownItem>
//                 <NavLink style={{ listStyleType: "none" }} onClick={producing}>
//                   Add producing Station
//                 </NavLink>
//               </DropdownItem>
//               <DropdownItem>
//                 <NavLink
//                   style={{ listStyleType: "none" }}
//                   onClick={marketplace}
//                 >
//                   Marketplace
//                 </NavLink>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//                 <NavLink style={{ listStyleType: "none" }} onClick={logout}>
//                   Logout
//                 </NavLink>
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledButtonDropdown>
//         ) : (
//           <>
//             <Button className="btnit" onClick={SignIn}>
//               Sign in
//             </Button>
//             <Button className="btnit" onClick={handleRegister}>
//               Register
//             </Button>
//           </>
//         )}
//       </div>
//     </Navbar>
//   );
// };

// export default AppNavbar;

import React from 'react'

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
