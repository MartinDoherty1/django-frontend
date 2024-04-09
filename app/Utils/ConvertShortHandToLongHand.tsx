const convertType = (type: string) =>
{
    switch(type) {
        case "BB":
            return "Barbell";
        case "CAB":
            return "Cable";
        case "BW":
            return "Body Weight";
        case "DB":
            return "Dumbbell";
    }
}

export default convertType;