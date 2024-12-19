// import { Link, useNavigate, useLocation,Navigate } from "react-router-dom";
// import { LogoInput, HeaderContainer } from "../../Style/header.style";
// import { ButtonElement } from "../../Style/style";
// import logo from '../../assets/unique marine.png';
// import Cookies from "js-cookie";

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();  // Get the current location

//   const logout = () => {
//     Cookies.remove('jwt_token');
//     console.log(Cookies.get('jwt_token'));
//     navigate('/login', { replace: true });
    
//   };

//   return (
//     <HeaderContainer>
//       <Link to={'/'}>
//         <LogoInput src={logo} />
//       </Link>

//       {location.pathname.startsWith('/admin') && (
//         <ButtonElement backgruoundcolor="#DD0023" style={{fontFamily:"Poppins", fontSize:'16px', padding:'5px 10px 5px 10px', height:'30px', fontWeight:'bold'}} onClick={logout}>LOG OUT</ButtonElement>
//       )}
//     </HeaderContainer>
//   );
// };

// export default Header;

import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogoInput, HeaderContainer } from "../../Style/header.style";
import { ButtonElement } from "../../Style/style";
import logo from '../../assets/unique marine.png';
import Cookies from "js-cookie";

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); 

//   const logout = () => {
//     // Remove token and navigate only once
//     Cookies.remove(process.env.JWT_COOKIE_NMAE);
//     navigate('/login', { replace: true });
//   };

//   return (
//     <HeaderContainer>
//       <Link to="/">
//         <LogoInput src={logo} />
//       </Link>

//       {location.pathname.startsWith('/admin') && (
//         <ButtonElement
//           backgruoundcolor="#DD0023"
//           style={{
//             fontFamily: "Poppins",
//             fontSize: "16px",
//             padding: "5px 10px",
//             height: "30px",
//             fontWeight: "bold",
//           }}
//           onClick={logout}
//         >
//           LOG OUT
//         </ButtonElement>
//       )}
//     </HeaderContainer>
//   );
// };

// export default Header;
