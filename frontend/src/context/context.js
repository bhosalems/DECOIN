
import { createContext,useState,useRef } from "react";
export const User = createContext();


const Context = ({ children}) => {
    
    const emptyuser = JSON.parse(localStorage.getItem("user")) || {
        id:'',
        firstname: '',
        lastname: '',
        email:''
    };

          
    const [isLogged,setIsLogged]=useState(localStorage.getItem("isLogged")|| false);
    
    const [user, setUser] = useState(emptyuser);
    const [modalShow, setModalShow] = useState(false);

    return <User.Provider value={{user,setUser,isLogged,
                                  
    
                            modalShow, setModalShow,
                          }}> {children}</User.Provider>;
};

export default Context;

