import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {


    const currency = '$'

    const calculateAge = (dob) =>{
        const today = new Date();
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear();

        return age

    }



    function formatDate(dateStr) {
        const months = [
            "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        const [day, month, year] = dateStr.split("_"); // Split by underscore
        return `${parseInt(day)} ${months[parseInt(month)]} ${year}`;
    }


    const value = {
        calculateAge,
        formatDate ,
        currency,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children} 
        </AppContext.Provider>
    );
}

export default AppContextProvider;





