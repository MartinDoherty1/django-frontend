export const validateField = (name: string, field: string) =>
{
    if(name.length === 0 || name.length < 3)
    {
        throw new Error(`${field} Can't Be Empty And Must Be Longer Than 5 Characters`);
    }

    return true;
}

export const validateType = (type: string) =>
{
    switch(type){
        case "BB":
        {
            return true;
        }
        case "BW":
        {
            return true;
        }
        case "DB":
        {
            return true;
        }
        case "CAB":
        {
            return true;
        }
        default: {
            throw new Error("Type must be one of the four types provided in the selection box");
        }

    }
}