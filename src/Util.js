import numeral from "numeral";
export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => (a.cases > b.cases ? -1:1));
    return sortedData;
};

export const convertStatToDecimal = (stat) => stat ? `+${numeral(stat).format("0.0a")}`:""
