export const formatDateFetch = (d) => {
    const date = new Date(d)
    const formatedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    return formatedDate;
}