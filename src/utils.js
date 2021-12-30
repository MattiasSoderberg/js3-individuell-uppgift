export const BASE_URL = "https://frebi.willandskill.eu"

const checkIfNumber = (char) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    for (let num of numbers) {
        if (isNaN(Number(char))) {
            return false
        } else if (num === Number(char)) {
            return true
        }
    }
}

export const validateVAT = (vatNr) => {
    const vatNrUpperCase = vatNr.toUpperCase()

    
        for (let i = 0; i < vatNr.length; i++) {
            if (i === 0) {
                if (vatNrUpperCase[i] !== "S") {
                    console.log(vatNr[i], "Måste börja på SE")
                    return false
                }
            } else if (i === 1) {
                if (vatNrUpperCase[i] !== "E") {
                    console.log(vatNr[i], "Måste börja på SE")
                    return false
                }
            } else if (i >= 2 && i <= 11) {
                if (!checkIfNumber(vatNrUpperCase[i])) {
                    console.log("Måste vara 10 siffror efter SE")
                    return false
                }
            }
        }
    
        if (vatNr.length > 12) {
            console.log("För långt")
            return false
        } else if (vatNr.length < 12) {
            console.log("För kort")
            return false
        }

    return true
}